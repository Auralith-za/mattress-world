import os
import re
import csv
import zipfile
import xml.etree.ElementTree as ET

SOURCE_DIR = 'Products Info'
OUTPUT_CSV = 'shopify_products_import.csv'
OUTPUT_IMG_DIR = 'public/assets/products'

os.makedirs(OUTPUT_IMG_DIR, exist_ok=True)

def get_docx_paragraphs(path):
    try:
        with zipfile.ZipFile(path) as z:
            xml_content = z.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            paras = []
            for p in tree.iter():
                if p.tag.endswith('p'):
                    texts = [t.text for t in p.iter() if t.tag.endswith('t') and t.text]
                    if texts:
                        paras.append(' '.join(texts).strip())
            return paras
    except Exception as e:
        return []

def clean_str(s):
    s = re.sub(r'\s+', ' ', s).strip()
    s = re.sub(r'^[^\w]+', '', s).strip()
    return s

def find_best_image_for_doc(doc_path, vendor):
    parent_dir = os.path.dirname(doc_path)
    grandparent_dir = os.path.dirname(parent_dir)
    
    candidate_images = []
    
    for search_dir in [parent_dir, grandparent_dir]:
        for root, dirs, files in os.walk(search_dir):
            for f in files:
                if (f.endswith('.png') or f.endswith('.jpg') or f.endswith('.webp')) and not f.startswith('~$') and 'Logo' not in f and 'logo' not in f:
                    candidate_images.append(os.path.join(root, f))
    
    if not candidate_images:
        return ""

    doc_base = os.path.basename(doc_path).replace('.docx', '').replace('_', ' ').lower()
    
    for img_path in candidate_images:
        img_name = os.path.basename(img_path).lower()
        if 'queen' in img_name or 'clean' in img_name or 'set' in img_name or 'double' in img_name:
            dest_filename = f"{vendor.lower().replace(' ', '_')}_{os.path.basename(img_path).replace(' ', '_')}"
            dest_full = os.path.join(OUTPUT_IMG_DIR, dest_filename)
            try:
                shutil.copy(img_path, dest_full)
            except:
                pass
            return f"https://wondrous-baklava-e13b07.netlify.app/assets/products/{dest_filename}"

    first_img = candidate_images[0]
    dest_filename = f"{vendor.lower().replace(' ', '_')}_{os.path.basename(first_img).replace(' ', '_')}"
    dest_full = os.path.join(OUTPUT_IMG_DIR, dest_filename)
    try:
        shutil.copy(first_img, dest_full)
    except:
        pass
    return f"https://wondrous-baklava-e13b07.netlify.app/assets/products/{dest_filename}"

def parse_docx(path):
    paras = get_docx_paragraphs(path)
    full_text = '\n'.join(paras)

    # 1. Model / Title
    model = ""
    m_match = re.search(r'Model\s*:\s*([^\n]+)', full_text, re.IGNORECASE)
    if m_match:
        model = clean_str(m_match.group(1))
    else:
        base = os.path.basename(path).replace('.docx', '').replace('_', ' ')
        model = clean_str(base)

    model = model.replace('C hiroflex', 'Chiroflex').replace('Prestige-Tear Drop', 'Prestige Teardrop')
    if 'Slow Motion' in model and 'Bed Set' in model:
        model = 'Slow Motion Adjustable Bed Set'

    # 2. Supplier / Vendor
    vendor = "Mattress World"
    v_match = re.search(r'Supplier(?:/Manufacturer)?\s*:\s*([^\n]+)', full_text, re.IGNORECASE)
    if v_match:
        vendor = clean_str(v_match.group(1))
    elif "Cloud Nine" in path or "Cloud_Nine" in path:
        vendor = "Cloud Nine"
    elif "Rest Assured" in path or "Rest_Assured" in path:
        vendor = "Rest Assured"
    elif "Bases" in path or "Furniture" in path:
        vendor = "Mattress World"

    vendor = clean_str(vendor)

    # 3. Range / Collection
    range_name = "Orthopedic Collection"
    r_match = re.search(r'Range\s*:\s*([^\n]+)', full_text, re.IGNORECASE)
    if r_match:
        range_name = clean_str(r_match.group(1))

    # 4. Guideline Links
    links = re.findall(r'https?://[^\s]+', full_text)

    # 5. Extract Prices with Strict Deduplication by (size, length, config)
    size_map = {
        'Single': 'Single (91cm)',
        'Three Quarter': 'Three Quarter (107cm)',
        'Double': 'Double (137cm)',
        'Queen': 'Queen (152cm)',
        'King': 'King (183cm)'
    }

    seen_variants = set()
    variants = []

    sections = re.split(r'(Prices\s*[–\-:]\s*[^:\n]+:)', full_text, flags=re.IGNORECASE)

    for idx in range(1, len(sections), 2):
        sec_header = sections[idx].strip()
        sec_content = sections[idx+1].strip() if idx+1 < len(sections) else ""
        
        is_xl = "extra length" in sec_header.lower()
        is_mattress_only = "mattress only" in sec_header.lower()
        
        length_val = "Extra Length (200cm)" if is_xl else "Standard (188cm)"
        config_val = "Mattress Only" if is_mattress_only else "Bed Set"

        for line in sec_content.split('\n'):
            for sz_key, sz_label in size_map.items():
                if sz_key.lower() in line.lower():
                    price_m = re.search(r'R\s*([\d\s]+)', line)
                    if price_m:
                        p_val = price_m.group(1).replace(' ', '').strip()
                        if p_val.isdigit():
                            var_key = (sz_label, length_val, config_val)
                            if var_key not in seen_variants:
                                seen_variants.add(var_key)
                                variants.append({
                                    'size': sz_label,
                                    'length': length_val,
                                    'config': config_val,
                                    'price': p_val
                                })

    if not variants:
        price_m = re.search(r'R\s*([\d\s]+)', full_text)
        single_price = price_m.group(1).replace(' ', '').strip() if price_m and price_m.group(1).replace(' ', '').strip().isdigit() else "2999"
        variants.append({
            'size': 'Standard',
            'length': 'Standard (188cm)',
            'config': 'Standard',
            'price': single_price
        })

    # 6. HTML Description
    features_list = []
    feat_match = re.search(r'Features\s*:\s*(.*)', full_text, re.DOTALL | re.IGNORECASE)
    if feat_match:
        feat_text = feat_match.group(1).strip()
        for line in feat_text.split('\n'):
            l_clean = clean_str(line)
            if l_clean and not l_clean.startswith('http'):
                features_list.append(l_clean)

    body_html = f"<h3>{model}</h3>\n"
    body_html += f"<p><strong>Manufacturer:</strong> {vendor}<br/>\n"
    body_html += f"<strong>Range:</strong> {range_name}</p>\n"

    if features_list:
        body_html += "<h4>Features & Specs:</h4>\n<ul>\n"
        for f_item in features_list[:8]:
            body_html += f"  <li>{f_item}</li>\n"
        body_html += "</ul>\n"

    if links:
        body_html += "<h4>Official Product Links & Guidelines:</h4>\n<ul>\n"
        for link in links:
            body_html += f'  <li><a href="{link}" target="_blank" rel="noopener noreferrer">{link}</a></li>\n'
        body_html += "</ul>\n"

    prod_type = "Beds & Mattresses"
    if "Headboard" in model or "Headboards" in path:
        prod_type = "Headboards"
    elif "Bunk" in model or "Bunk Beds" in path:
        prod_type = "Bunk Beds"
    elif "Base" in path or "Bases" in path:
        prod_type = "Bed Bases"
    elif "Couch" in model or "Couches" in path or "Chesterfield" in model or "California" in model:
        prod_type = "Couches & Seating"

    img_url = find_best_image_for_doc(path, vendor)

    return {
        'model': model,
        'vendor': vendor,
        'type': prod_type,
        'range': range_name,
        'body_html': body_html,
        'image': img_url,
        'variants': variants
    }

parsed_data = []
seen_models = set()
import shutil

for root, dirs, files in os.walk(SOURCE_DIR):
    for f in files:
        if f.endswith('.docx') and not f.startswith('~$'):
            doc_path = os.path.join(root, f)
            p_info = parse_docx(doc_path)
            if p_info and p_info['model']:
                parsed_data.append(p_info)

# Write to CSV
headers = [
    "Handle", "Title", "Body (HTML)", "Vendor", "Product Category", "Type", "Tags",
    "Published", "Option1 Name", "Option1 Value", "Option2 Name", "Option2 Value",
    "Option3 Name", "Option3 Value", "Variant SKU", "Variant Grams", "Variant Inventory Tracker",
    "Variant Inventory Qty", "Variant Inventory Policy", "Variant Fulfillment Service",
    "Variant Price", "Variant Compare At Price", "Variant Requires Shipping", "Variant Taxable",
    "Variant Barcode", "Image Src", "Image Position", "Image Alt Text", "Gift Card",
    "SEO Title", "SEO Description", "Status"
]

rows = []
for item in parsed_data:
    model_name = item['model']
    vendor = item['vendor']
    handle = f"{vendor}-{model_name}".lower().replace(' ', '-').replace('_', '-').replace('/', '-').replace('(', '').replace(')', '')
    handle = re.sub(r'[^a-z0-9\-]', '', handle)
    
    is_first = True
    sku_idx = 1
    for v in item['variants']:
        img_src_value = item['image'] if (is_first and item['image']) else ""

        rows.append({
            "Handle": handle,
            "Title": model_name if is_first else "",
            "Body (HTML)": item['body_html'] if is_first else "",
            "Vendor": vendor if is_first else "",
            "Product Category": "Furniture > Beds & Accessories > Mattresses",
            "Type": item['type'] if is_first else "",
            "Tags": f"{vendor}, {item['range']}",
            "Published": "TRUE",
            "Option1 Name": "Size",
            "Option1 Value": v['size'],
            "Option2 Name": "Length",
            "Option2 Value": v['length'],
            "Option3 Name": "Configuration",
            "Option3 Value": v['config'],
            "Variant SKU": f"{handle}-{sku_idx}".lower(),
            "Variant Grams": "50000",
            "Variant Inventory Tracker": "",
            "Variant Inventory Qty": "100",
            "Variant Inventory Policy": "continue",
            "Variant Fulfillment Service": "manual",
            "Variant Price": v['price'],
            "Variant Compare At Price": "",
            "Variant Requires Shipping": "TRUE",
            "Variant Taxable": "TRUE",
            "Variant Barcode": "",
            "Image Src": img_src_value,
            "Image Position": "1" if (is_first and img_src_value) else "",
            "Image Alt Text": model_name if (is_first and img_src_value) else "",
            "Gift Card": "FALSE",
            "SEO Title": model_name,
            "SEO Description": f"{model_name} by {vendor}. Official {item['range']} collection.",
            "Status": "active"
        })
        is_first = False
        sku_idx += 1

with open(OUTPUT_CSV, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    writer.writeheader()
    writer.writerows(rows)

print(f"Generated clean CSV '{OUTPUT_CSV}' with 0 duplicate variants across {len(parsed_data)} products!")
