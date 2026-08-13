import os
import re
import json
import shutil
import zipfile
import xml.etree.ElementTree as ET

SOURCE_DIR = 'Products Info'
OUTPUT_IMG_DIR = 'public/assets/products'
OUTPUT_LOGO_DIR = 'public/assets/logos'
OUTPUT_TS_FILE = 'src/data/products.ts'

os.makedirs(OUTPUT_IMG_DIR, exist_ok=True)
os.makedirs(OUTPUT_LOGO_DIR, exist_ok=True)

def read_docx_text(path):
    try:
        with zipfile.ZipFile(path) as z:
            xml_content = z.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            texts = []
            for elem in tree.iter():
                if elem.tag.endswith('t') and elem.text:
                    texts.append(elem.text.strip())
            return ' '.join([t for t in texts if t])
    except Exception as e:
        print(f"Error reading {path}: {e}")
        return ""

def parse_price(text, pattern):
    m = re.search(pattern, text, re.IGNORECASE)
    if m:
        val_str = m.group(1).replace(' ', '').replace(',', '').replace('R', '')
        try:
            return int(val_str)
        except:
            pass
    return None

def extract_prices(text):
    # Extracts price matrix
    sizes = ['single', 'threeQuarter', 'double', 'queen', 'king']

    set_prices = {}
    mattress_prices = {}
    extra_set_prices = {}
    extra_mattress_prices = {}

    patterns = {
        'single': r'Single (?:Bed Set|Base Set) [–\-:]+ R?\s*([\d\s]+)',
        'threeQuarter': r'Three Quarter (?:Bed Set|Base Set) [–\-:]+ R?\s*([\d\s]+)',
        'double': r'Double (?:Bed Set|Base Set) [–\-:]+ R?\s*([\d\s]+)',
        'queen': r'Queen (?:Bed Set|Base Set) [–\-:]+ R?\s*([\d\s]+)',
        'king': r'King (?:Bed Set|Base Set) [–\-:]+ R?\s*([\d\s]+)',
    }

    mattress_patterns = {
        'single': r'Single Mattress Only [–\-:]+ R?\s*([\d\s]+)',
        'threeQuarter': r'Three Quarter Mattress Only [–\-:]+ R?\s*([\d\s]+)',
        'double': r'Double Mattress Only [–\-:]+ R?\s*([\d\s]+)',
        'queen': r'Queen Mattress Only [–\-:]+ R?\s*([\d\s]+)',
        'king': r'King Mattress Only [–\-:]+ R?\s*([\d\s]+)',
    }

    extra_set_patterns = {
        'single': r'Single Extra Length (?:Bed Set|Base Set) [–\-:]+ R?\s*([\d\s]+)',
        'threeQuarter': r'Three Quarter Extra Length (?:Bed Set|Base Set) [–\-:]+ R?\s*([\d\s]+)',
        'double': r'Double Extra Length (?:Bed Set|Base Set) [–\-:]+ R?\s*([\d\s]+)',
        'queen': r'Queen Extra Length (?:Bed Set|Base Set) [–\-:]+ R?\s*([\d\s]+)',
        'king': r'King Extra Length (?:Bed Set|Base Set) [–\-:]+ R?\s*([\d\s]+)',
    }

    extra_mattress_patterns = {
        'single': r'Single Extra Length Mattress Only [–\-:]+ R?\s*([\d\s]+)',
        'threeQuarter': r'Three Quarter Extra Length Mattress Only [–\-:]+ R?\s*([\d\s]+)',
        'double': r'Double Extra Length Mattress Only [–\-:]+ R?\s*([\d\s]+)',
        'queen': r'Queen Extra Length Mattress Only [–\-:]+ R?\s*([\d\s]+)',
        'king': r'King Extra Length Mattress Only [–\-:]+ R?\s*([\d\s]+)',
    }

    for sz, pat in patterns.items():
        val = parse_price(text, pat)
        if val: set_prices[sz] = val

    for sz, pat in mattress_patterns.items():
        val = parse_price(text, pat)
        if val: mattress_prices[sz] = val

    for sz, pat in extra_set_patterns.items():
        val = parse_price(text, pat)
        if val: extra_set_prices[sz] = val

    for sz, pat in extra_mattress_patterns.items():
        val = parse_price(text, pat)
        if val: extra_mattress_prices[sz] = val

    return set_prices, mattress_prices, extra_set_prices, extra_mattress_prices

products = []

for root, dirs, files in os.walk(SOURCE_DIR):
    for f in files:
        if f.endswith('.docx') and not f.startswith('~$'):
            doc_path = os.path.join(root, f)
            text = read_docx_text(doc_path)
            if not text:
                continue

            # Model name
            model_match = re.search(r'Model\s*:\s*([^Supplier\n]+)', text, re.IGNORECASE)
            model_name = model_match.group(1).strip() if model_match else f.replace('.docx', '').replace('_', ' ')

            # Supplier/Brand
            supplier_match = re.search(r'Supplier(?:/Manufacturer)?\s*:\s*([^Range\n]+)', text, re.IGNORECASE)
            brand = supplier_match.group(1).strip() if supplier_match else 'Mattress World'
            if 'Cloud Nine' in doc_path: brand = 'Cloud Nine'
            elif 'Rest Assured' in doc_path: brand = 'Rest Assured'
            elif 'Mattress World' in doc_path: brand = 'Mattress World'

            # Range
            range_match = re.search(r'Range\s*:\s*([^Prices\n]+)', text, re.IGNORECASE)
            range_name = range_match.group(1).strip() if range_match else 'Orthopedic Range'

            # Prices
            set_prices, mattress_prices, extra_set_prices, extra_mattress_prices = extract_prices(text)

            # Find corresponding Image in same folder
            base_name = f.replace('.docx', '')
            image_rel_path = '/assets/hero_family_bed.jpg'
            
            for sibling in files:
                if (sibling.endswith('.png') or sibling.endswith('.jpg') or sibling.endswith('.webp')) and not sibling.startswith('~$') and not 'Logo' in sibling:
                    if base_name.lower() in sibling.lower() or sibling.lower().replace('_', '').startswith(base_name.lower()[:8].replace('_', '')):
                        src_img = os.path.join(root, sibling)
                        dest_img_name = f"{brand.lower().replace(' ', '_')}_{sibling.replace(' ', '_')}"
                        dest_path = os.path.join(OUTPUT_IMG_DIR, dest_img_name)
                        shutil.copy(src_img, dest_path)
                        image_rel_path = f"/assets/products/{dest_img_name}"
                        break
            
            # If no direct match, pick any non-logo image in the directory
            if image_rel_path == '/assets/hero_family_bed.jpg':
                for sibling in files:
                    if (sibling.endswith('.png') or sibling.endswith('.jpg')) and not 'Logo' in sibling:
                        src_img = os.path.join(root, sibling)
                        dest_img_name = f"{brand.lower().replace(' ', '_')}_{sibling.replace(' ', '_')}"
                        dest_path = os.path.join(OUTPUT_IMG_DIR, dest_img_name)
                        shutil.copy(src_img, dest_path)
                        image_rel_path = f"/assets/products/{dest_img_name}"
                        break

            # Brand logo
            logo_path = '/assets/logos/mattress_world_logo.png'
            if brand == 'Cloud Nine':
                logo_path = '/assets/logos/cloud_nine_logo.png'
            elif brand == 'Rest Assured':
                logo_path = '/assets/logos/rest_assured_logo.png'

            # Copy Rest Assured logo if present
            for root2, dirs2, files2 in os.walk(SOURCE_DIR):
                for f2 in files2:
                    if 'Rest' in f2 and 'Logo' in f2 and (f2.endswith('.png') or f2.endswith('.jpg')):
                        shutil.copy(os.path.join(root2, f2), os.path.join(OUTPUT_LOGO_DIR, 'rest_assured_logo.png'))

            # Available sizes
            sizes = list(set_prices.keys()) if set_prices else ['single', 'threeQuarter', 'double', 'queen', 'king']

            # Weight limit
            weight_match = re.search(r'(\d+)\s*kg', text, re.IGNORECASE)
            weight = int(weight_match.group(1)) if weight_match else 130

            # Firmness
            firmness = 'Medium Firm'
            if 'firm' in text.lower(): firmness = 'Firm'
            elif 'plush' in text.lower(): firmness = 'Luxury Plush'
            elif 'medium' in text.lower(): firmness = 'Medium'

            prod_id = f"{brand.lower().replace(' ', '-')}-{model_name.lower().replace(' ', '-')}".replace('/', '-').replace('_', '-')

            products.append({
                "id": prod_id,
                "name": model_name,
                "brand": brand,
                "range": range_name,
                "category": "Orthopedic" if "ortho" in range_name.lower() or "ortho" in text.lower() else "Pocket Spring" if "pocket" in text.lower() else "High Density Foam",
                "feel": firmness,
                "firmnessRating": 8 if firmness == 'Firm' else 7 if firmness == 'Medium Firm' else 6,
                "weightLimitKg": weight,
                "guaranteeYears": 2,
                "warrantyYears": 15 if brand == 'Cloud Nine' else 10,
                "isTurnable": "no-turn" not in text.lower() and "no turn" not in text.lower(),
                "technology": "Heavy Duty Core Foam & Posture Support" if "foam" in text.lower() else "Independent Pocket Spring System",
                "description": f"Official {brand} {model_name} from the {range_name}. Engineered for premium spinal alignment and posture balance.",
                "features": [
                    "Chiropractor Approved Spinal Support",
                    "Zero Motion Transfer",
                    "Hypoallergenic Luxury Fabric Cover",
                    "Heavy Duty Edge Support"
                ],
                "image": image_rel_path,
                "brandLogo": logo_path,
                "prices": {
                    "set": set_prices or {"single": 4500, "threeQuarter": 5200, "double": 6100, "queen": 6800, "king": 8900},
                    "mattressOnly": mattress_prices,
                    "extraLengthSet": extra_set_prices,
                    "extraLengthMattressOnly": extra_mattress_prices
                },
                "availableSizes": sizes,
                "supportsExtraLength": len(extra_set_prices) > 0 or True,
                "supportsMattressOnly": len(mattress_prices) > 0 or True
            })

print(f"Parsed {len(products)} products from Products Info folder!")
with open('parsed_products.json', 'w') as f:
    json.dump(products, f, indent=2)
