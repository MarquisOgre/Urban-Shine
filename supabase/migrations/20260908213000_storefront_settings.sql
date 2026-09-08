-- Storefront settings are public-readable but writable only by authenticated staff.
-- The application currently treats authenticated users as admin/staff users.

CREATE UNIQUE INDEX IF NOT EXISTS settings_global_type_key
  ON public.settings (setting_type)
  WHERE user_id IS NULL;

DROP POLICY IF EXISTS "Public can read storefront settings" ON public.settings;
DROP POLICY IF EXISTS "Authenticated staff can insert storefront settings" ON public.settings;
DROP POLICY IF EXISTS "Authenticated staff can update storefront settings" ON public.settings;
DROP POLICY IF EXISTS "Authenticated staff can delete storefront settings" ON public.settings;

CREATE POLICY "Public can read storefront settings"
  ON public.settings
  FOR SELECT
  USING (setting_type = 'storefront');

CREATE POLICY "Authenticated staff can insert storefront settings"
  ON public.settings
  FOR INSERT
  TO authenticated
  WITH CHECK (setting_type = 'storefront');

CREATE POLICY "Authenticated staff can update storefront settings"
  ON public.settings
  FOR UPDATE
  TO authenticated
  USING (setting_type = 'storefront')
  WITH CHECK (setting_type = 'storefront');

CREATE POLICY "Authenticated staff can delete storefront settings"
  ON public.settings
  FOR DELETE
  TO authenticated
  USING (setting_type = 'storefront');

INSERT INTO public.settings (setting_type, user_id, setting_data)
VALUES (
  'storefront',
  NULL,
  '{
    "storeName": "UltraShine",
    "businessName": "UltraShine",
    "phone": "",
    "email": "",
    "address": "",
    "gstNumber": "",
    "upiId": "urbanshine@upi",
    "upiPayeeName": "UltraShine",
    "freeShippingAbove": 999,
    "shippingFee": 60,
    "heroEyebrow": "A CLEANER • HEALTHIER • HAPPIER HOME",
    "heroTitle": "CLEAN HOME.",
    "heroTitleAccent": "FRESH EVERY DAY.",
    "heroDescription": "High quality cleaning & personal care products made for modern homes — effective, affordable and reliable."
  }'::jsonb
)
ON CONFLICT (setting_type) WHERE user_id IS NULL DO NOTHING;
