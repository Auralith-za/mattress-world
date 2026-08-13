import json
import csv
import os

with open("parsed_products.json") as f:
    products = json.load(f)

csv_file = "shopify_products_import.csv"

# Official Shopify Product Import CSV Columns
headers = [
    "Handle", "Title", "Body (HTML)", "Vendor", "Product Category", "Type", "Tags",
    "Published", "Option1 Name", "Option1 Value", "Option2 Name", "Option2 Value",
    "Option3 Name", "Option3 Value", "Variant SKU", "Variant Grams", "Variant Inventory Tracker",
    "Variant Inventory Qty", "Variant Inventory Policy", "Variant Fulfillment Service",
    "Variant Price", "Variant Compare At Price", "Variant Requires Shipping", "Variant Taxable",
    "Variant Barcode", "Image Src", "Image Position", "Image Alt Text", "Gift Card",
    "SEO Title", "SEO Description", "Status"
]

SIZE_MAP = {
    'single': 'Single (91cm)',
    'threeQuarter': 'Three Quarter (107cm)',
    'double': 'Double (137cm)',
    'queen': 'Queen (152cm)',
    'king': 'King (183cm)'
}

rows = []

for prod in products:
    handle = prod['id'].lower().replace(' ', '-').replace('_', '-')
    title = f"{prod['brand']} {prod['name']}"
    vendor = prod['brand']
    prod_type = prod['category']
    body_html = f"""
    <p><strong>{prod['name']}</strong> by <em>{prod['brand']}</em> ({prod['range']}).</p>
    <p>{prod['description']}</p>
    <ul>
      <li><strong>Weight Limit:</strong> {prod['weightLimitKg']}kg per side</li>
      <li><strong>Comfort Feel:</strong> {prod['feel']} ({prod['firmnessRating']}/10)</li>
      <li><strong>Guarantee:</strong> {prod['guaranteeYears']} Year Full Guarantee</li>
      <li><strong>Warranty:</strong> {prod['warrantyYears']} Year Service Warranty</li>
    </ul>
    """
    tags = f"{prod['brand']}, {prod['category']}, {prod['range']}, {prod['feel']}"
    img_src = f"https://wondrous-baklava-e13b07.netlify.app{prod['image']}"

    prices_set = prod['prices'].get('set', {})
    prices_mattress = prod['prices'].get('mattressOnly', {})
    prices_xl_set = prod['prices'].get('extraLengthSet', {})
    prices_xl_mattress = prod['prices'].get('extraLengthMattressOnly', {})

    is_first_variant = True

    for sz in prod['availableSizes']:
        sz_name = SIZE_MAP.get(sz, sz.capitalize())

        # 1. Standard Bed Set
        if sz in prices_set:
            rows.append({
                "Handle": handle,
                "Title": title if is_first_variant else "",
                "Body (HTML)": body_html if is_first_variant else "",
                "Vendor": vendor if is_first_variant else "",
                "Product Category": "Furniture > Beds & Accessories > Mattresses",
                "Type": prod_type if is_first_variant else "",
                "Tags": tags if is_first_variant else "",
                "Published": "TRUE",
                "Option1 Name": "Size",
                "Option1 Value": sz_name,
                "Option2 Name": "Length",
                "Option2 Value": "Standard (188cm)",
                "Option3 Name": "Configuration",
                "Option3 Value": "Bed Set",
                "Variant SKU": f"{handle}-{sz}-std-set",
                "Variant Grams": "50000",
                "Variant Inventory Tracker": "",
                "Variant Inventory Qty": "100",
                "Variant Inventory Policy": "continue",
                "Variant Fulfillment Service": "manual",
                "Variant Price": str(prices_set[sz]),
                "Variant Compare At Price": "",
                "Variant Requires Shipping": "TRUE",
                "Variant Taxable": "TRUE",
                "Variant Barcode": "",
                "Image Src": img_src if is_first_variant else "",
                "Image Position": "1" if is_first_variant else "",
                "Image Alt Text": title if is_first_variant else "",
                "Gift Card": "FALSE",
                "SEO Title": title,
                "SEO Description": prod['description'][:160],
                "Status": "active"
            })
            is_first_variant = False

        # 2. Mattress Only
        if sz in prices_mattress:
            rows.append({
                "Handle": handle,
                "Title": "",
                "Body (HTML)": "",
                "Vendor": "",
                "Product Category": "",
                "Type": "",
                "Tags": "",
                "Published": "TRUE",
                "Option1 Name": "Size",
                "Option1 Value": sz_name,
                "Option2 Name": "Length",
                "Option2 Value": "Standard (188cm)",
                "Option3 Name": "Configuration",
                "Option3 Value": "Mattress Only",
                "Variant SKU": f"{handle}-{sz}-std-[#1B2845]",
                "Variant Grams": "35000",
                "Variant Inventory Tracker": "",
                "Variant Inventory Qty": "100",
                "Variant Inventory Policy": "continue",
                "Variant Fulfillment Service": "manual",
                "Variant Price": str(prices_mattress[sz]),
                "Variant Compare At Price": "",
                "Variant Requires Shipping": "TRUE",
                "Variant Taxable": "TRUE",
                "Variant Barcode": "",
                "Image Src": "",
                "Image Position": "",
                "Image Alt Text": "",
                "Gift Card": "FALSE",
                "SEO Title": "",
                "SEO Description": "",
                "Status": "active"
            })

        # 3. Extra Length Bed Set
        if sz in prices_xl_set:
            rows.append({
                "Handle": handle,
                "Title": "",
                "Body (HTML)": "",
                "Vendor": "",
                "Product Category": "",
                "Type": "",
                "Tags": "",
                "Published": "TRUE",
                "Option1 Name": "Size",
                "Option1 Value": sz_name,
                "Option2 Name": "Length",
                "Option2 Value": "Extra Length (200cm)",
                "Option3 Name": "Configuration",
                "Option3 Value": "Bed Set",
                "Variant SKU": f"{handle}-{sz}-xl-set",
                "Variant Grams": "55000",
                "Variant Inventory Tracker": "",
                "Variant Inventory Qty": "100",
                "Variant Inventory Policy": "continue",
                "Variant Fulfillment Service": "manual",
                "Variant Price": str(prices_xl_set[sz]),
                "Variant Compare At Price": "",
                "Variant Requires Shipping": "TRUE",
                "Variant Taxable": "TRUE",
                "Variant Barcode": "",
                "Image Src": "",
                "Image Position": "",
                "Image Alt Text": "",
                "Gift Card": "FALSE",
                "SEO Title": "",
                "SEO Description": "",
                "Status": "active"
            })

        # 4. Extra Length Mattress Only
        if sz in prices_xl_mattress:
            rows.append({
                "Handle": handle,
                "Title": "",
                "Body (HTML)": "",
                "Vendor": "",
                "Product Category": "",
                "Type": "",
                "Tags": "",
                "Published": "TRUE",
                "Option1 Name": "Size",
                "Option1 Value": sz_name,
                "Option2 Name": "Length",
                "Option2 Value": "Extra Length (200cm)",
                "Option3 Name": "Configuration",
                "Option3 Value": "Mattress Only",
                "Variant SKU": f"{handle}-{sz}-xl-mat",
                "Variant Grams": "40000",
                "Variant Inventory Tracker": "",
                "Variant Inventory Qty": "100",
                "Variant Inventory Policy": "continue",
                "Variant Fulfillment Service": "manual",
                "Variant Price": str(prices_xl_mattress[sz]),
                "Variant Compare At Price": "",
                "Variant Requires Shipping": "TRUE",
                "Variant Taxable": "TRUE",
                "Variant Barcode": "",
                "Image Src": "",
                "Image Position": "",
                "Image Alt Text": "",
                "Gift Card": "FALSE",
                "SEO Title": "",
                "SEO Description": "",
                "Status": "active"
            })

with open(csv_file, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    writer.writeheader()
    writer.writerows(rows)

print(f"Generated {csv_file} with {len(rows)} variant rows across {len(products)} products!")
