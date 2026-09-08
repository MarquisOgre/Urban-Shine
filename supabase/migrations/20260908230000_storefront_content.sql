-- Phase 2: make homepage categories, benefits, featured products and trust points editable from Store Settings.

UPDATE public.settings
SET setting_data = setting_data || '{
  "featuredSlugs": ["floor-cleaner", "dish-wash", "copper-cleaning-liquid", "hand-wash"],
  "categories": [
    {"title":"Household Cleaning","subtitle":"Floor Cleaner · Toilet Cleaner · Phenyl","imageSlug":"floor-cleaner","theme":"blue","productSlugs":["floor-cleaner","toilet-cleaner","phenyl"]},
    {"title":"Kitchen Care","subtitle":"Dish Wash · Soap Oil · Kitchen Cleaning","imageSlug":"dish-wash","theme":"green","productSlugs":["dish-wash","soap-oil"]},
    {"title":"Laundry Care","subtitle":"Liquid Detergent · Detergent Powder","imageSlug":"liquid-detergent","theme":"pink","productSlugs":["liquid-detergent","detergent-powder"]},
    {"title":"Personal Care","subtitle":"Hand Wash · Vaseline · Balm · Rose Water","imageSlug":"hand-wash","theme":"peach","productSlugs":["hand-wash","vaseline","zandu-balm","rose-water"]},
    {"title":"Specialty Care","subtitle":"Copper Cleaner · Acid Cleaner","imageSlug":"copper-cleaning-liquid","theme":"purple","productSlugs":["copper-cleaning-liquid","acid"]}
  ],
  "benefits": [
    {"icon":"truck","title":"Fast Delivery","subtitle":"Across India"},
    {"icon":"shield","title":"Quality Tested","subtitle":"Safe & Reliable"},
    {"icon":"leaf","title":"Skin Friendly","subtitle":"Gentle Formulas"},
    {"icon":"cart","title":"Guest Checkout","subtitle":"Hassle Free"}
  ],
  "whyUs": [
    {"icon":"shield","title":"Quality You Can Trust","description":"Every product is tested for safe & effective use.","theme":"green"},
    {"icon":"sparkles","title":"Made for Everyday Homes","description":"Practical solutions for modern living.","theme":"blue"},
    {"icon":"check","title":"Honest Pricing","description":"Great quality without unnecessary premium.","theme":"amber"},
    {"icon":"cart","title":"Easy Ordering","description":"Simple shopping with guest checkout.","theme":"pink"}
  ]
}'::jsonb
WHERE setting_type = 'storefront' AND user_id IS NULL;
