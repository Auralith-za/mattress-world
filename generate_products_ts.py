import json

products = [
  # 1. Cloud Nine Slow Motion
  {
    "id": "cloud-nine-slow-motion",
    "name": "Cloud Nine Slow Motion Adjustable Bed Set",
    "brand": "Cloud Nine",
    "range": "Slow Motion",
    "category": "Adjustable Motion",
    "feel": "Luxury Plush",
    "firmnessRating": 6,
    "weightLimitKg": 150,
    "guaranteeYears": 2,
    "warrantyYears": 25,
    "isTurnable": False,
    "technology": "Motorized Motion Base & Multi-Layered Visco-Elastic Memory Foam",
    "description": "The ultimate in luxury sleep technology. Features motorized posture adjustment, multi-layered high-density memory foam, and zero-partner disturbance.",
    "features": [
      "Motorized posture & elevation control",
      "Multi-layered Visco-Elastic Memory Foam",
      "Zero motion transfer",
      "Allergy free & non-toxic fabrics",
      "150kg Weight Capacity Per Side"
    ],
    "image": "/assets/products/Cloud_Nine_SloMotion_King_Set.png",
    "brandLogo": "/assets/logos/cloud_nine_logo.png",
    "availableSizes": ["king"],
    "supportsExtraLength": True,
    "supportsMattressOnly": False,
    "externalLink": "https://cloudnine.co.za/slomotion/",
    "prices": {
      "set": { "king": 100000 },
      "extraLengthSet": { "king": 100000 }
    }
  },

  # 2. Strandmattress Ergomax
  {
    "id": "strandmattress-ergomax",
    "name": "Strandmattress Ergomax Bed Set",
    "brand": "Cloud Nine",
    "range": "Strandmattress",
    "category": "High Density Foam",
    "feel": "Medium Firm",
    "firmnessRating": 7,
    "weightLimitKg": 90,
    "guaranteeYears": 1,
    "warrantyYears": 8,
    "isTurnable": True,
    "technology": "High Density Smart Foam Core",
    "description": "Ergonomically engineered for posture alignment and essential comfort. Ideal for kids, young adults, and spare bedrooms.",
    "features": [
      "High Density Smart Foam Support Core",
      "Deep Quilted Knitted Fabric",
      "Turnable Dual-Side Mattress Design",
      "90kg Weight Capacity Per Person",
      "Allergy-Free & Hygienic"
    ],
    "image": "/assets/products/Strandmattress_Ergomax_Bed_Set.png",
    "secondaryImage": "/assets/products/Strandmattress_Ergomax_Mattress.png",
    "brandLogo": "/assets/logos/strandmattress_logo.png",
    "availableSizes": ["single", "threeQuarter", "double", "queen"],
    "supportsExtraLength": False,
    "supportsMattressOnly": True,
    "externalLink": "https://www.bedsonline.co.za/product/strandmattress-ergomax-medium-firm-queen/",
    "prices": {
      "set": { "single": 3059, "threeQuarter": 3479, "double": 4099, "queen": 4459 },
      "mattressOnly": { "single": 1809, "threeQuarter": 2059, "double": 2559, "queen": 2829 }
    }
  },

  # 3. Cloud Nine Chiroflex
  {
    "id": "cloud-nine-chiroflex",
    "name": "Cloud Nine Chiroflex Ultra Premium Bed Set",
    "brand": "Cloud Nine",
    "range": "Ultra Premium",
    "category": "Orthopedic",
    "feel": "Firm",
    "firmnessRating": 9,
    "weightLimitKg": 145,
    "guaranteeYears": 2,
    "warrantyYears": 25,
    "isTurnable": False,
    "technology": "Heavy Duty Poly-Posture High Density Foam & Chiropractic Spine Support",
    "description": "Ultra Premium Chiropractic spec mattress. Designed with heavy duty poly-posture foam core to deliver zero sag and back pain relief.",
    "features": [
      "Approved by Chiropractic Association",
      "Poly-Posture High Density Support Core",
      "Zero Motion Transfer Technology",
      "145kg Weight Limit Per Person",
      "No-Turn Convenient Design"
    ],
    "image": "/assets/products/Cloud_Nine_Chiroflex_Bed_Set.png",
    "brandLogo": "/assets/logos/cloud_nine_logo.png",
    "availableSizes": ["single", "threeQuarter", "double", "queen", "king"],
    "supportsExtraLength": True,
    "supportsMattressOnly": True,
    "externalLink": "https://cloudnine.co.za/ultra-premium/chiroflex/",
    "prices": {
      "set": { "single": 11519, "threeQuarter": 13269, "double": 16379, "queen": 17989, "king": 22329 },
      "mattressOnly": { "single": 9869, "threeQuarter": 11439, "double": 14359, "queen": 15909, "king": 19019 },
      "extraLengthSet": { "single": 12439, "threeQuarter": 14329, "double": 17689, "queen": 19249, "king": 24119 },
      "extraLengthMattressOnly": { "single": 10659, "threeQuarter": 12359, "double": 15509, "queen": 17189, "king": 20539 }
    }
  },

  # 4. Cloud Nine Grande
  {
    "id": "cloud-nine-grande",
    "name": "Cloud Nine Grande Ultra Premium Bed Set",
    "brand": "Cloud Nine",
    "range": "Ultra Premium",
    "category": "High Density Foam",
    "feel": "Medium Firm",
    "firmnessRating": 8,
    "weightLimitKg": 150,
    "guaranteeYears": 2,
    "warrantyYears": 25,
    "isTurnable": False,
    "technology": "Heavy Duty Core with Cooling Blue Gel Memory Foam",
    "description": "Top tier Ultra Premium mattress crafted with cooling Blue-Gel memory foam and ultra high density support layers for supreme heavy-duty comfort.",
    "features": [
      "Cooling Blue-Gel Memory Foam Comfort Layer",
      "Ultra High Density Rebond Core",
      "Zero Motion Transfer",
      "150kg Weight Capacity Per Person",
      "25 Year Service Warranty"
    ],
    "image": "/assets/products/Cloud_Nine_Grande_Bed_Set.png",
    "brandLogo": "/assets/logos/cloud_nine_logo.png",
    "availableSizes": ["single", "threeQuarter", "double", "queen", "king"],
    "supportsExtraLength": True,
    "supportsMattressOnly": True,
    "externalLink": "https://cloudnine.co.za/ultra-premium/grande/",
    "prices": {
      "set": { "single": 12589, "threeQuarter": 14279, "double": 17179, "queen": 18659, "king": 22689 },
      "mattressOnly": { "single": 10939, "threeQuarter": 12449, "double": 15149, "queen": 16579, "king": 19379 },
      "extraLengthSet": { "single": 13599, "threeQuarter": 15429, "double": 18559, "queen": 20159, "king": 24509 },
      "extraLengthMattressOnly": { "single": 11819, "threeQuarter": 13449, "double": 16359, "queen": 17909, "king": 20929 }
    }
  },

  # 5. Cloud Nine Camden
  {
    "id": "cloud-nine-camden",
    "name": "Cloud Nine Camden Premium Bed Set",
    "brand": "Cloud Nine",
    "range": "Premium",
    "category": "High Density Foam",
    "feel": "Medium Firm",
    "firmnessRating": 7,
    "weightLimitKg": 115,
    "guaranteeYears": 2,
    "warrantyYears": 20,
    "isTurnable": False,
    "technology": "Multi-Layered Polyurethane Foam & Micro-Quilted Knit Cover",
    "description": "Premium luxury sleeping set designed for couples and everyday posture support with zero partner disturbance.",
    "features": [
      "Multi-layered Polyurethane foam construction",
      "Micro-quilted moisture wicking knitted cover",
      "Zero motion transfer",
      "115kg Weight Capacity Per Person",
      "20 Year Warranty"
    ],
    "image": "/assets/products/Cloud_Nine_Camden_Bed_Set.png",
    "brandLogo": "/assets/logos/cloud_nine_logo.png",
    "availableSizes": ["single", "threeQuarter", "double", "queen", "king"],
    "supportsExtraLength": True,
    "supportsMattressOnly": True,
    "externalLink": "https://cloudnine.co.za/beds/premium/camden/",
    "prices": {
      "set": { "single": 8879, "threeQuarter": 10179, "double": 12429, "queen": 13609, "king": 16969 },
      "mattressOnly": { "single": 7219, "threeQuarter": 8339, "double": 10399, "queen": 11519, "king": 13659 },
      "extraLengthSet": { "single": 9589, "threeQuarter": 10999, "double": 13429, "queen": 14699, "king": 18329 },
      "extraLengthMattressOnly": { "single": 7799, "threeQuarter": 9009, "double": 11229, "queen": 12439, "king": 14749 }
    }
  },

  # 6. Cloud Nine Classic
  {
    "id": "cloud-nine-classic",
    "name": "Cloud Nine Classic Premium Bed Set",
    "brand": "Cloud Nine",
    "range": "Premium",
    "category": "High Density Foam",
    "feel": "Medium",
    "firmnessRating": 6,
    "weightLimitKg": 105,
    "guaranteeYears": 2,
    "warrantyYears": 15,
    "isTurnable": False,
    "technology": "Posture Support Rebond Foam Core & Micro-Quilted Fabric",
    "description": "Cloud Nine classic signature mattress offering plush comfort and spinal alignment for daily luxury sleeping.",
    "features": [
      "High Density Rebond Foam Core",
      "Plush Micro-Quilted Finish",
      "Zero Partner Motion Disturbance",
      "105kg Weight Rating Per Person",
      "15 Year Warranty"
    ],
    "image": "/assets/products/Cloud_Nine_Classic_Bed_Set.png",
    "brandLogo": "/assets/logos/cloud_nine_logo.png",
    "availableSizes": ["single", "threeQuarter", "double", "queen", "king"],
    "supportsExtraLength": True,
    "supportsMattressOnly": True,
    "externalLink": "https://cloudnine.co.za/beds/premium/classic/",
    "prices": {
      "set": { "single": 7539, "threeQuarter": 8639, "double": 10529, "queen": 11459, "king": 14519 },
      "mattressOnly": { "single": 5889, "threeQuarter": 6809, "double": 8509, "queen": 9379, "king": 11209 },
      "extraLengthSet": { "single": 8149, "threeQuarter": 9329, "double": 11379, "queen": 12379, "king": 15679 },
      "extraLengthMattressOnly": { "single": 6359, "threeQuarter": 7359, "double": 9189, "queen": 10129, "king": 12109 }
    }
  },

  # 7. Cloud Nine Epic Comfort
  {
    "id": "cloud-nine-epic-comfort",
    "name": "Cloud Nine Epic Comfort Bed Set",
    "brand": "Cloud Nine",
    "range": "Premium",
    "category": "High Density Foam",
    "feel": "Medium Firm",
    "firmnessRating": 7,
    "weightLimitKg": 110,
    "guaranteeYears": 2,
    "warrantyYears": 20,
    "isTurnable": False,
    "technology": "Heavy Duty High Density Rebond Core",
    "description": "Engineered for epic durability and spine support. Outstanding value in Cloud Nine's premium range.",
    "features": [
      "Heavy duty high density foam construction",
      "Spinal posture support core",
      "Non-allergenic Jacquard fabric",
      "110kg Weight Capacity Per Side",
      "2 Year Guarantee & 20 Year Warranty"
    ],
    "image": "/assets/products/Cloud_Nine_Epic_Comfort_Bed_Set.png",
    "brandLogo": "/assets/logos/cloud_nine_logo.png",
    "availableSizes": ["single", "threeQuarter", "double", "queen", "king"],
    "supportsExtraLength": True,
    "supportsMattressOnly": True,
    "externalLink": "https://cloudnine.co.za/beds/premium/epic-comfort/",
    "prices": {
      "set": { "single": 7819, "threeQuarter": 8919, "double": 10909, "queen": 11839, "king": 14919 },
      "mattressOnly": { "single": 6159, "threeQuarter": 7089, "double": 8879, "queen": 9759, "king": 11609 },
      "extraLengthSet": { "single": 8449, "threeQuarter": 9639, "double": 11779, "queen": 12789, "king": 16119 },
      "extraLengthMattressOnly": { "single": 6649, "threeQuarter": 7659, "double": 9589, "queen": 10539, "king": 12539 }
    }
  },

  # 8. Cloud Nine Lodestar
  {
    "id": "cloud-nine-lodestar",
    "name": "Cloud Nine Lodestar Bed Set",
    "brand": "Cloud Nine",
    "range": "Premium",
    "category": "High Density Foam",
    "feel": "Firm",
    "firmnessRating": 8,
    "weightLimitKg": 120,
    "guaranteeYears": 2,
    "warrantyYears": 20,
    "isTurnable": False,
    "technology": "High Density Poly-Posture Rebond Foam",
    "description": "Star-performer in posture correction and extra body weight support. Features firm, resilient sleep support.",
    "features": [
      "Poly-Posture High Density Core",
      "Zero Motion Transfer",
      "Firm comfortable sleeping surface",
      "120kg Weight Limit Per Person",
      "20 Year Warranty"
    ],
    "image": "/assets/products/Cloud_Nine_Lodestar_Bed_Set.png",
    "brandLogo": "/assets/logos/cloud_nine_logo.png",
    "availableSizes": ["single", "threeQuarter", "double", "queen", "king"],
    "supportsExtraLength": True,
    "supportsMattressOnly": True,
    "externalLink": "https://cloudnine.co.za/beds/premium/lodestar/",
    "prices": {
      "set": { "single": 8159, "threeQuarter": 9339, "double": 11359, "queen": 12389, "king": 15539 },
      "mattressOnly": { "single": 6499, "threeQuarter": 7509, "double": 9339, "queen": 10309, "king": 12229 },
      "extraLengthSet": { "single": 8819, "threeQuarter": 10089, "double": 12269, "queen": 13379, "king": 16789 },
      "extraLengthMattressOnly": { "single": 7019, "threeQuarter": 8109, "double": 10089, "queen": 11139, "king": 13209 }
    }
  },

  # 9. Mattress World Ortho Support Foam
  {
    "id": "mw-ortho-support-foam",
    "name": "Ortho Support Foam Bed Set",
    "brand": "Mattress World",
    "range": "Ortho Sleep Range",
    "category": "Orthopedic",
    "feel": "Medium Firm",
    "firmnessRating": 8,
    "weightLimitKg": 120,
    "guaranteeYears": 1,
    "warrantyYears": 15,
    "isTurnable": True,
    "technology": "Heavy Duty Orthopedic High Density Foam Core",
    "description": "House Brand Orthopedic specialty mattress engineered for back support, posture correction, and extended shape retention.",
    "features": [
      "Orthopedic Back Support Core",
      "Heavy Duty High Density Foam Layer",
      "Turnable Dual-Side Design",
      "120kg Weight Limit Per Person",
      "15 Year Warranty"
    ],
    "image": "/assets/products/Ortho_Support_Foam_Bed_Set.jpg",
    "brandLogo": "/assets/logos/ortho_sleep_logo.png",
    "availableSizes": ["single", "threeQuarter", "double", "queen", "king"],
    "supportsExtraLength": True,
    "supportsMattressOnly": True,
    "prices": {
      "set": { "single": 4499, "threeQuarter": 4999, "double": 6499, "queen": 6499, "king": 8499 },
      "mattressOnly": { "single": 3999, "threeQuarter": 4499, "double": 5999, "queen": 5999, "king": 7499 },
      "extraLengthSet": { "single": 5399, "threeQuarter": 5999, "double": 7799, "queen": 7799, "king": 10199 },
      "extraLengthMattressOnly": { "single": 4799, "threeQuarter": 5399, "double": 7199, "queen": 7199, "king": 8999 }
    }
  },

  # 10. Mattress World Ortho Top
  {
    "id": "mw-ortho-top",
    "name": "Ortho Top Pillow Top Bed Set",
    "brand": "Mattress World",
    "range": "Ortho Sleep Range",
    "category": "Orthopedic",
    "feel": "Medium Firm",
    "firmnessRating": 7,
    "weightLimitKg": 120,
    "guaranteeYears": 1,
    "warrantyYears": 15,
    "isTurnable": False,
    "technology": "Orthopedic Support Core with Integrated Pillow-Top Comfort Layer",
    "description": "Luxurious pillow-top finish coupled with orthopedic support foam. Offers pressure relief without compromising spinal alignment.",
    "features": [
      "Integrated Plush Pillow-Top Layer",
      "Orthopedic Heavy Duty Foam Base",
      "No-Turn Convenient Design",
      "120kg Weight Limit Per Person",
      "15 Year Warranty"
    ],
    "image": "/assets/products/Ortho_Top_bed_set.png",
    "brandLogo": "/assets/logos/ortho_sleep_logo.png",
    "availableSizes": ["single", "threeQuarter", "double", "queen", "king"],
    "supportsExtraLength": True,
    "supportsMattressOnly": True,
    "prices": {
      "set": { "single": 4799, "threeQuarter": 5299, "double": 6999, "queen": 6999, "king": 8999 },
      "mattressOnly": { "single": 4299, "threeQuarter": 4799, "double": 6499, "queen": 6499, "king": 7999 },
      "extraLengthSet": { "single": 5759, "threeQuarter": 6359, "double": 8399, "queen": 8399, "king": 10799 },
      "extraLengthMattressOnly": { "single": 5159, "threeQuarter": 5759, "double": 7799, "queen": 7799, "king": 9599 }
    }
  },

  # 11. Mattress World Prestige Teardrop
  {
    "id": "mw-prestige-teardrop",
    "name": "Prestige Teardrop Orthopedic Bed Set",
    "brand": "Mattress World",
    "range": "Ortho Sleep Range",
    "category": "Orthopedic",
    "feel": "Firm",
    "firmnessRating": 9,
    "weightLimitKg": 130,
    "guaranteeYears": 2,
    "warrantyYears": 15,
    "isTurnable": True,
    "technology": "Heavy Duty Teardrop Quilted Orthopedic High Density Core",
    "description": "Prestige grade teardrop quilting with extra dense orthopedic foam core for maximum back support and long life.",
    "features": [
      "Signature Teardrop Deep Quilted Cover",
      "130kg Heavy Duty Per Person Capacity",
      "Turnable Dual-Side Mattress",
      "2 Year Guarantee & 15 Year Warranty",
      "Firm Spine Correction Feel"
    ],
    "image": "/assets/products/Prestige_Teardrop_Bed_Set.jpg",
    "brandLogo": "/assets/logos/ortho_sleep_logo.png",
    "availableSizes": ["single", "threeQuarter", "double", "queen", "king"],
    "supportsExtraLength": True,
    "supportsMattressOnly": True,
    "prices": {
      "set": { "single": 5499, "threeQuarter": 5999, "double": 7999, "queen": 7999, "king": 9999 },
      "mattressOnly": { "single": 4999, "threeQuarter": 5499, "double": 7499, "queen": 7499, "king": 8999 },
      "extraLengthSet": { "single": 6599, "threeQuarter": 7199, "double": 9599, "queen": 9599, "king": 11999 },
      "extraLengthMattressOnly": { "single": 5999, "threeQuarter": 6599, "double": 8999, "queen": 8999, "king": 10799 }
    }
  },

  # 12. Hospitality Foam
  {
    "id": "mw-hospitality-foam",
    "name": "Hospitality Foam Bed Set",
    "brand": "Mattress World",
    "range": "Hospitality Range",
    "category": "Hospitality",
    "feel": "Medium Firm",
    "firmnessRating": 7,
    "weightLimitKg": 120,
    "guaranteeYears": 1,
    "warrantyYears": 15,
    "isTurnable": True,
    "technology": "Hospitality Grade High Density Foam Core",
    "description": "Hospitality Grade dual-side turnable bed set crafted for lodges, hotels, and guest homes requiring reliable long-term durability.",
    "features": [
      "Commercial Hospitality Grade Quality",
      "High Density Foam Core",
      "Turnable Dual-Side Mattress",
      "120kg Weight Limit Per Side",
      "15 Year Warranty"
    ],
    "image": "/assets/products/Hospitality_Foam_Bed_Set.jpg",
    "brandLogo": "/assets/logos/hospitality_logo.png",
    "availableSizes": ["single", "threeQuarter", "double", "queen", "king"],
    "supportsExtraLength": True,
    "supportsMattressOnly": True,
    "prices": {
      "set": { "single": 4499, "threeQuarter": 4999, "double": 6499, "queen": 6499, "king": 8499 },
      "mattressOnly": { "single": 3999, "threeQuarter": 4499, "double": 5999, "queen": 5999, "king": 7499 },
      "extraLengthSet": { "single": 5399, "threeQuarter": 5999, "double": 7799, "queen": 7799, "king": 10199 },
      "extraLengthMattressOnly": { "single": 4799, "threeQuarter": 5399, "double": 7199, "queen": 7199, "king": 8999 }
    }
  },

  # 13. Hospitality Foam Comfort 130
  {
    "id": "mw-hospitality-foam-comfort-130",
    "name": "Hospitality Foam Comfort 130 Bed Set",
    "brand": "Mattress World",
    "range": "Hospitality Range",
    "category": "Hospitality",
    "feel": "Medium Firm",
    "firmnessRating": 7,
    "weightLimitKg": 130,
    "guaranteeYears": 2,
    "warrantyYears": 15,
    "isTurnable": True,
    "technology": "Heavy Duty 130kg High Density Comfort Foam",
    "description": "Commercial strength 130kg rated high density foam mattress built to deliver plush sleeping comfort and heavy guest support.",
    "features": [
      "130kg Per Person Commercial Rating",
      "Heavy Duty High Density Comfort Foam",
      "Turnable Dual-Side Construction",
      "2 Year Guarantee & 15 Year Warranty",
      "Hypo-Allergenic Knit Cover"
    ],
    "image": "/assets/products/Hospitality_Foam_Comfort_130_Bed_Set.png",
    "brandLogo": "/assets/logos/hospitality_logo.png",
    "availableSizes": ["single", "threeQuarter", "double", "queen", "king"],
    "supportsExtraLength": True,
    "supportsMattressOnly": True,
    "prices": {
      "set": { "single": 4999, "threeQuarter": 5499, "double": 7499, "queen": 7499, "king": 9499 },
      "mattressOnly": { "single": 4499, "threeQuarter": 4999, "double": 6999, "queen": 6999, "king": 8499 },
      "extraLengthSet": { "single": 5999, "threeQuarter": 6599, "double": 8999, "queen": 8999, "king": 11399 },
      "extraLengthMattressOnly": { "single": 5399, "threeQuarter": 5999, "double": 8399, "queen": 8399, "king": 10199 }
    }
  },

  # 14. Hospitality Foam Firm 150
  {
    "id": "mw-hospitality-foam-firm-150",
    "name": "Hospitality Foam Firm 150 Bed Set",
    "brand": "Mattress World",
    "range": "Hospitality Range",
    "category": "Hospitality",
    "feel": "Firm",
    "firmnessRating": 9,
    "weightLimitKg": 150,
    "guaranteeYears": 2,
    "warrantyYears": 15,
    "isTurnable": True,
    "technology": "Heavy Duty 150kg Multi-Layered Support Foam Core",
    "description": "Ultra heavy-duty 150kg per person foam bed set. Engineered with multi-layered high density support foam for supreme endurance.",
    "features": [
      "150kg Weight Capacity Per Side",
      "Heavy Duty Support Foam Core",
      "Firm Orthopedic Comfort Foam",
      "Turnable Dual-Side Design",
      "2 Year Guarantee & 15 Year Warranty"
    ],
    "image": "/assets/products/Hospitality_Foam_Firm_150_Bed_Set.png",
    "brandLogo": "/assets/logos/hospitality_logo.png",
    "availableSizes": ["single", "threeQuarter", "double", "queen", "king"],
    "supportsExtraLength": True,
    "supportsMattressOnly": True,
    "prices": {
      "set": { "single": 5499, "threeQuarter": 5999, "double": 8499, "queen": 8499, "king": 10499 },
      "mattressOnly": { "single": 4999, "threeQuarter": 5499, "double": 7999, "queen": 7999, "king": 9499 },
      "extraLengthSet": { "single": 6599, "threeQuarter": 7199, "double": 10199, "queen": 10199, "king": 12599 },
      "extraLengthMattressOnly": { "single": 5999, "threeQuarter": 6599, "double": 9599, "queen": 9599, "king": 11399 }
    }
  },

  # 15. Hospitality Pocket
  {
    "id": "mw-hospitality-pocket",
    "name": "Hospitality Pocket Spring Bed Set",
    "brand": "Mattress World",
    "range": "Hospitality Range",
    "category": "Pocket Spring",
    "feel": "Medium",
    "firmnessRating": 6,
    "weightLimitKg": 120,
    "guaranteeYears": 1,
    "warrantyYears": 15,
    "isTurnable": True,
    "technology": "Heavy Duty Pocket Spring System & High Density Comfort Foam",
    "description": "Individually wrapped pocket spring mattress providing independent body contouring and zero disturbance for guest suites.",
    "features": [
      "Individually Wrapped Pocket Spring Coils",
      "Zero Partner Motion Disturbance",
      "High Density Orthopedic Comfort Foam",
      "Turnable Dual-Side Construction",
      "120kg Weight Limit Per Side"
    ],
    "image": "/assets/products/Hospitality_Pocket_Queen_Bed_set.jpg",
    "brandLogo": "/assets/logos/hospitality_logo.png",
    "availableSizes": ["single", "threeQuarter", "double", "queen", "king"],
    "supportsExtraLength": True,
    "supportsMattressOnly": True,
    "prices": {
      "set": { "single": 4999, "threeQuarter": 5999, "double": 6999, "queen": 6999, "king": 8999 },
      "mattressOnly": { "single": 4499, "threeQuarter": 4999, "double": 6499, "queen": 6499, "king": 7999 },
      "extraLengthSet": { "single": 5999, "threeQuarter": 7199, "double": 8399, "queen": 8399, "king": 10799 },
      "extraLengthMattressOnly": { "single": 5399, "threeQuarter": 5999, "double": 7799, "queen": 7799, "king": 9599 }
    }
  },

  # 16. Hospitality Pocket Comfort 130
  {
    "id": "mw-hospitality-pocket-comfort-130",
    "name": "Hospitality Pocket Comfort 130 Bed Set",
    "brand": "Mattress World",
    "range": "Hospitality Range",
    "category": "Pocket Spring",
    "feel": "Medium Firm",
    "firmnessRating": 7,
    "weightLimitKg": 130,
    "guaranteeYears": 2,
    "warrantyYears": 15,
    "isTurnable": True,
    "technology": "Heavy Duty 130kg Pocket Spring & High Density Comfort Layer",
    "description": "Luxury pocket spring sleep system certified for 130kg per side. Perfect balance of supportive pressure relief and zero disturbance.",
    "features": [
      "Heavy Duty 130kg Independent Pocket Springs",
      "High Density Comfort Foam Encapsulation",
      "Turnable Dual-Side Design",
      "2 Year Guarantee & 15 Year Warranty",
      "Medium Firm Comfort Profile"
    ],
    "image": "/assets/products/Hospitality_Pocket_Comfort_130_Bed_Set.png",
    "brandLogo": "/assets/logos/hospitality_logo.png",
    "availableSizes": ["single", "threeQuarter", "double", "queen", "king"],
    "supportsExtraLength": True,
    "supportsMattressOnly": True,
    "prices": {
      "set": { "single": 5999, "threeQuarter": 6999, "double": 8999, "queen": 8999, "king": 10999 },
      "mattressOnly": { "single": 5499, "threeQuarter": 5999, "double": 8499, "queen": 8499, "king": 9999 },
      "extraLengthSet": { "single": 7199, "threeQuarter": 8399, "double": 10799, "queen": 10799, "king": 13199 },
      "extraLengthMattressOnly": { "single": 6599, "threeQuarter": 7199, "double": 10199, "queen": 10199, "king": 11999 }
    }
  },

  # 17. Hospitality Pocket Firm 150
  {
    "id": "mw-hospitality-pocket-firm-150",
    "name": "Hospitality Pocket Firm 150 Bed Set",
    "brand": "Mattress World",
    "range": "Hospitality Range",
    "category": "Pocket Spring",
    "feel": "Firm",
    "firmnessRating": 9,
    "weightLimitKg": 150,
    "guaranteeYears": 2,
    "warrantyYears": 15,
    "isTurnable": True,
    "technology": "Heavy Duty 150kg Reinforced Pocket Springs & Firm Comfort Foam",
    "description": "The flagship heavy-duty pocket spring bed set. Built to withstand 150kg per person while delivering firm, luxurious orthopedic alignment.",
    "features": [
      "150kg Per Person Heavy Duty Pocket Spring",
      "High Density Firm Orthopedic Comfort Layer",
      "Turnable Dual-Side Construction",
      "2 Year Guarantee & 15 Year Warranty",
      "Firm Back Support Profile"
    ],
    "image": "/assets/products/Hospitality_Pocket_Firm_150_Bed_Set.png",
    "brandLogo": "/assets/logos/hospitality_logo.png",
    "availableSizes": ["single", "threeQuarter", "double", "queen", "king"],
    "supportsExtraLength": True,
    "supportsMattressOnly": True,
    "prices": {
      "set": { "single": 6999, "threeQuarter": 7999, "double": 9999, "queen": 9999, "king": 11999 },
      "mattressOnly": { "single": 6499, "threeQuarter": 7499, "double": 9499, "queen": 9499, "king": 10999 },
      "extraLengthSet": { "single": 8399, "threeQuarter": 9599, "double": 11999, "queen": 11999, "king": 14399 },
      "extraLengthMattressOnly": { "single": 7799, "threeQuarter": 8999, "double": 11399, "queen": 11399, "king": 13199 }
    }
  },

  # 18. Hospitality Spring
  {
    "id": "mw-hospitality-spring",
    "name": "Hospitality Spring Bed Set",
    "brand": "Mattress World",
    "range": "Hospitality Range",
    "category": "Bonnell Spring",
    "feel": "Medium Firm",
    "firmnessRating": 7,
    "weightLimitKg": 120,
    "guaranteeYears": 1,
    "warrantyYears": 15,
    "isTurnable": True,
    "technology": "Heavy Duty Full Body Support Bonnell Spring System",
    "description": "Durable commercial Bonnell Spring bed set crafted for guest rooms, holiday lets, and home bedrooms.",
    "features": [
      "Heavy Duty Full Body Support Spring",
      "High Density Orthopedic Comfort Layer",
      "Turnable Dual-Side Design",
      "120kg Weight Limit Per Person",
      "1 Year Guarantee & 15 Year Warranty"
    ],
    "image": "/assets/products/Hospitality_Spring_Bed_Set.jpg",
    "brandLogo": "/assets/logos/hospitality_logo.png",
    "availableSizes": ["single", "threeQuarter", "double", "queen", "king"],
    "supportsExtraLength": True,
    "supportsMattressOnly": True,
    "prices": {
      "set": { "single": 3999, "threeQuarter": 4499, "double": 5499, "queen": 5499, "king": 7499 },
      "mattressOnly": { "single": 3499, "threeQuarter": 3999, "double": 4999, "queen": 4999, "king": 6499 },
      "extraLengthSet": { "single": 4799, "threeQuarter": 5399, "double": 6599, "queen": 6599, "king": 8999 },
      "extraLengthMattressOnly": { "single": 4199, "threeQuarter": 4799, "double": 5999, "queen": 5999, "king": 7799 }
    }
  }
]

ts_content = f"""import {{ Product }} from '../types';

export const PRODUCTS: Product[] = {json.dumps(products, indent=2)};
"""

with open('src/data/products.ts', 'w') as f:
    f.write(ts_content)

print("Successfully generated src/data/products.ts!")
