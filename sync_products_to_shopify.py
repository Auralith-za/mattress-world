import json
import urllib.request
import urllib.error
import base64
import os
import time

SHOPIFY_DOMAIN = "mqrbzt-h4.myshopify.com"
ADMIN_TOKEN = "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"
API_URL = f"https://{SHOPIFY_DOMAIN}/admin/api/2024-04/graphql.json"

def shopify_admin_query(query, variables=None):
    data = json.dumps({"query": query, "variables": variables or {}}).encode("utf-8")
    req = urllib.request.Request(
        API_URL,
        data=data,
        headers={
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": ADMIN_TOKEN,
        },
    )
    try:
        with urllib.request.urlopen(req) as resp:
            res_json = json.loads(resp.read().decode("utf-8"))
            if "errors" in res_json:
                print("GraphQL Errors:", res_json["errors"])
            return res_json.get("data")
    except urllib.error.HTTPError as e:
        print("HTTP Error:", e.code, e.read().decode("utf-8"))
        return None

# Load parsed products
with open("parsed_products.json") as f:
    products = json.load(f)

print(f"Loaded {len(products)} products to sync to Shopify Admin...")

# Metafield definitions setup
METAFIELD_MUTATION = """
mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
  metafieldDefinitionCreate(definition: $definition) {
    createdDefinition { id name namespace key }
    userErrors { field message }
  }
}
"""

definitions = [
  {"name": "Weight Limit (kg)", "namespace": "custom", "key": "weight_limit_kg", "type": "integer", "ownerType": "PRODUCT"},
  {"name": "Firmness Rating (1-10)", "namespace": "custom", "key": "firmness_rating", "type": "integer", "ownerType": "PRODUCT"},
  {"name": "Comfort Feel", "namespace": "custom", "key": "feel", "type": "single_line_text_field", "ownerType": "PRODUCT"},
  {"name": "Guarantee (Years)", "namespace": "custom", "key": "guarantee_years", "type": "integer", "ownerType": "PRODUCT"},
  {"name": "Warranty (Years)", "namespace": "custom", "key": "warranty_years", "type": "integer", "ownerType": "PRODUCT"},
  {"name": "Is Turnable", "namespace": "custom", "key": "is_turnable", "type": "boolean", "ownerType": "PRODUCT"},
]

for d in definitions:
    res = shopify_admin_query(METAFIELD_MUTATION, {"definition": d})
    time.sleep(0.2)

print("Metafield definitions configured.")

# Product Creation Mutation
PRODUCT_CREATE_MUTATION = """
mutation productCreate($input: ProductInput!) {
  productCreate(input: $input) {
    product {
      id
      title
      handle
    }
    userErrors {
      field
      message
    }
  }
}
"""

SIZE_MAP = {
    'single': 'Single (91cm)',
    'threeQuarter': 'Three Quarter (107cm)',
    'double': 'Double (137cm)',
    'queen': 'Queen (152cm)',
    'king': 'King (183cm)'
}

count = 0
for prod in products:
    title = f"{prod['brand']} {prod['name']}"
    vendor = prod['brand']
    product_type = prod['category']
    description = f"""
    <p><strong>{prod['name']}</strong> by <em>{prod['brand']}</em> ({prod['range']}).</p>
    <p>{prod['description']}</p>
    <ul>
      <li><strong>Weight Limit:</strong> {prod['weightLimitKg']}kg per side</li>
      <li><strong>Comfort Feel:</strong> {prod['feel']} ({prod['firmnessRating']}/10)</li>
      <li><strong>Guarantee:</strong> {prod['guaranteeYears']} Year Full Guarantee</li>
      <li><strong>Warranty:</strong> {prod['warrantyYears']} Year Service Warranty</li>
    </ul>
    """

    # Build variants with size variations
    variants = []
    prices_set = prod['prices'].get('set', {})
    prices_mattress = prod['prices'].get('mattressOnly', {})
    prices_xl_set = prod['prices'].get('extraLengthSet', {})
    prices_xl_mattress = prod['prices'].get('extraLengthMattressOnly', {})

    for sz in prod['availableSizes']:
        sz_name = SIZE_MAP.get(sz, sz.capitalize())
        
        # 1. Standard Bed Set Variant
        if sz in prices_set:
            variants.append({
                "options": [sz_name, "Standard (188cm)", "Bed Set"],
                "price": str(prices_set[sz]),
            })

        # 2. Mattress Only Variant
        if sz in prices_mattress:
            variants.append({
                "options": [sz_name, "Standard (188cm)", "Mattress Only"],
                "price": str(prices_mattress[sz]),
            })

        # 3. Extra Length Bed Set Variant
        if sz in prices_xl_set:
            variants.append({
                "options": [sz_name, "Extra Length (200cm)", "Bed Set"],
                "price": str(prices_xl_set[sz]),
            })

        # 4. Extra Length Mattress Only Variant
        if sz in prices_xl_mattress:
            variants.append({
                "options": [sz_name, "Extra Length (200cm)", "Mattress Only"],
                "price": str(prices_xl_mattress[sz]),
            })

    if not variants:
        variants.append({
            "options": ["Queen (152cm)", "Standard (188cm)", "Bed Set"],
            "price": "5999",
        })

    input_payload = {
        "title": title,
        "vendor": vendor,
        "productType": product_type,
        "descriptionHtml": description,
        "options": ["Size", "Length", "Configuration"],
        "variants": variants,
        "metafields": [
            {"namespace": "custom", "key": "weight_limit_kg", "value": str(prod['weightLimitKg']), "type": "integer"},
            {"namespace": "custom", "key": "firmness_rating", "value": str(prod['firmnessRating']), "type": "integer"},
            {"namespace": "custom", "key": "feel", "value": prod['feel'], "type": "single_line_text_field"},
            {"namespace": "custom", "key": "guarantee_years", "value": str(prod['guaranteeYears']), "type": "integer"},
            {"namespace": "custom", "key": "warranty_years", "value": str(prod['warrantyYears']), "type": "integer"},
            {"namespace": "custom", "key": "is_turnable", "value": "true" if prod['isTurnable'] else "false", "type": "boolean"},
        ]
    }

    res = shopify_admin_query(PRODUCT_CREATE_MUTATION, {"input": input_payload})
    if res and res.get("productCreate", {}).get("product"):
        created_p = res["productCreate"]["product"]
        print(f"[{count+1}/{len(products)}] Created: {created_p['title']} ({created_p['handle']}) with {len(variants)} variants")
        count += 1
    elif res and res.get("productCreate", {}).get("userErrors"):
        print(f"Error creating {title}:", res["productCreate"]["userErrors"])

    time.sleep(0.3)

print(f"\nSuccessfully created {count} products on Shopify Admin!")
