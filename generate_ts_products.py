import json
import os
import re
import zipfile
import xml.etree.ElementTree as ET

SOURCE_DIR = 'Products Info'

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

def find_best_image(doc_path, vendor):
    parent_dir = os.path.dirname(doc_path)
    grandparent_dir = os.path.dirname(parent_dir)
    
    candidate_images = []
    for search_dir in [parent_dir, grandparent_dir]:
        for root, dirs, files in os.walk(search_dir):
            for f in files:
                if (f.endswith('.png') or f.endswith('.jpg') or f.endswith('.webp')) and not f.startswith('~$') and 'Logo' not in f and 'logo' not in f:
                    candidate_images.append(os.path.join(root, f))
    
    if not candidate_images:
        return "/assets/products/placeholder_bed.jpg"

    for img_path in candidate_images:
        img_name = os.path.basename(img_path).lower()
        if 'queen' in img_name or 'clean' in img_name or 'set' in img_name or 'double' in img_name:
            dest_filename = f"{vendor.lower().replace(' ', '_')}_{os.path.basename(img_path).replace(' ', '_')}"
            return f"/assets/products/{dest_filename}"

    first_img = candidate_images[0]
    dest_filename = f"{vendor.lower().replace(' ', '_')}_{os.path.basename(first_img).replace(' ', '_')}"
    return f"/assets/products/{dest_filename}"

def parse_docx_for_ts(path):
    paras = get_docx_paragraphs(path)
    full_text = '\n'.join(paras)

    # 1. Model
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

    vendor = clean_str(vendor)

    # 3. Range
    range_name = "Orthopedic Collection"
    r_match = re.search(r'Range\s*:\s*([^\n]+)', full_text, re.IGNORECASE)
    if r_match:
        range_name = clean_str(r_match.group(1))

    # 4. Features
    features = []
    feat_match = re.search(r'Features\s*:\s*(.*)', full_text, re.DOTALL | re.IGNORECASE)
    if feat_match:
        feat_text = feat_match.group(1).strip()
        for line in feat_text.split('\n'):
            l_clean = clean_str(line)
            if l_clean and not l_clean.startswith('http'):
                features.append(l_clean)

    if not features:
        features = ["Chiro-Approved Orthopedic Support", "Heavy-Duty Base Construction", "Zero Motion Transfer"]

    # Category
    prod_type = "Orthopedic"
    if "Hospitality" in path or "Hospitality" in model or "Hospitality" in range_name:
        prod_type = "Hospitality"
    elif "Pocket" in model or "Pocket" in range_name:
        prod_type = "Pocket Spring"
    elif "Bonnel" in range_name or "Heritage" in range_name:
        prod_type = "Bonnell Spring"
    elif "Foam" in model or "High Density" in range_name:
        prod_type = "High Density Foam"
    elif "Adjustable" in model or "Slow Motion" in model:
        prod_type = "Adjustable Motion"
    elif "Headboard" in model or "Headboards" in path:
        prod_type = "Headboards"
    elif "Bunk" in model or "Bunk Beds" in path:
        prod_type = "Bunk Beds"
    elif "Base" in path or "Bases" in path:
        prod_type = "Bed Bases"
    elif "Couch" in model or "Couches" in path or "Chesterfield" in model or "California" in model:
        prod_type = "Couches & Seating"

    # Prices Matrix parsing
    size_keys = ['single', 'threeQuarter', 'double', 'queen', 'king']
    size_map = {'single': 'Single', 'threeQuarter': 'Three Quarter', 'double': 'Double', 'queen': 'Queen', 'king': 'King'}
    
    set_prices = {}
    mattress_prices = {}
    xl_set_prices = {}
    xl_mattress_prices = {}

    sections = re.split(r'(Prices\s*[–\-:]\s*[^:\n]+:)', full_text, flags=re.IGNORECASE)

    for idx in range(1, len(sections), 2):
        sec_header = sections[idx].strip().lower()
        sec_content = sections[idx+1].strip() if idx+1 < len(sections) else ""
        
        is_xl = "extra length" in sec_header
        is_mattress_only = "mattress only" in sec_header

        for line in sec_content.split('\n'):
            for k in size_keys:
                sz_label = size_map[k]
                if sz_label.lower() in line.lower():
                    price_m = re.search(r'R\s*([\d\s]+)', line)
                    if price_m:
                        p_val = int(price_m.group(1).replace(' ', '').strip())
                        if is_xl and is_mattress_only:
                            xl_mattress_prices[k] = p_val
                        elif is_xl:
                            xl_set_prices[k] = p_val
                        elif is_mattress_only:
                            mattress_prices[k] = p_val
                        else:
                            set_prices[k] = p_val

    if not set_prices:
        price_m = re.search(r'R\s*([\d\s]+)', full_text)
        default_price = int(price_m.group(1).replace(' ', '').strip()) if price_m and price_m.group(1).replace(' ', '').strip().isdigit() else 3999
        set_prices = {"queen": default_price, "double": int(default_price*0.9), "single": int(default_price*0.7), "king": int(default_price*1.2)}

    available_sizes = [k for k in size_keys if k in set_prices or k in mattress_prices]
    if not available_sizes:
        available_sizes = ['queen', 'king', 'double', 'single', 'threeQuarter']

    # Logos
    logo_map = {
        'Cloud Nine': '/assets/logos/cloud_nine_logo.png',
        'Rest Assured': '/assets/logos/rest_assured_logo.png',
        'Mattress World': '/assets/logos/mattress_world_logo.png'
    }
    brand_logo = logo_map.get(vendor, '/assets/logos/mattress_world_logo.png')
    img_path = find_best_image(path, vendor)

    id_clean = f"{vendor}-{model}".lower().replace(' ', '_').replace('-', '_').replace('/', '_')
    id_clean = re.sub(r'[^a-z0-9_]', '', id_clean)

    prices_obj = {
        "set": set_prices
    }
    if mattress_prices:
        prices_obj["mattressOnly"] = mattress_prices
    if xl_set_prices:
        prices_obj["extraLengthSet"] = xl_set_prices
    if xl_mattress_prices:
        prices_obj["extraLengthMattressOnly"] = xl_mattress_prices

    return {
        "id": id_clean,
        "name": model,
        "brand": vendor,
        "range": range_name,
        "category": prod_type,
        "feel": "Medium Firm" if "Firm" not in model else "Firm",
        "firmnessRating": 8 if "Firm" in model or "Hospitality" in model else 7,
        "weightLimitKg": 130 if "130" in model or "Hospitality" in model else (150 if "150" in model else 120),
        "guaranteeYears": 2,
        "warrantyYears": 10,
        "isTurnable": True,
        "technology": f"{prod_type} Support Technology",
        "description": f"Official {model} by {vendor}. Engineered for premium posture alignment and long-lasting durability.",
        "features": features,
        "image": img_path,
        "brandLogo": brand_logo,
        "prices": prices_obj,
        "availableSizes": available_sizes,
        "supportsExtraLength": len(xl_set_prices) > 0 or len(xl_mattress_prices) > 0,
        "supportsMattressOnly": len(mattress_prices) > 0 or len(xl_mattress_prices) > 0
    }

parsed_products = []
for root, dirs, files in os.walk(SOURCE_DIR):
    for f in files:
        if f.endswith('.docx') and not f.startswith('~$'):
            p_data = parse_docx_for_ts(os.path.join(root, f))
            if p_data:
                parsed_products.append(p_data)

ts_content = f"import {{ Product }} from '../types';\n\nexport const PRODUCTS: Product[] = {json.dumps(parsed_products, indent=2)};\n"

ts_content = ts_content.replace('"set":', 'set:').replace('"mattressOnly":', 'mattressOnly:').replace('"extraLengthSet":', 'extraLengthSet:').replace('"extraLengthMattressOnly":', 'extraLengthMattressOnly:')

with open("src/data/products.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Successfully compiled src/data/products.ts with all {len(parsed_products)} products!")
