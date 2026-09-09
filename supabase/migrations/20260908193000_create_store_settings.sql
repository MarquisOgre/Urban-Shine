-- Create the storefront settings table used by the Visual Store Manager.
-- This migration is intentionally self-contained so a fresh database and an
-- existing database without the table can both apply the storefront settings flow.

CREATE TABLE IF NOT EXISTS public.settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  setting_type text NOT NULL,
  setting_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS settings_setting_type_idx
  ON public.settings(setting_type);

CREATE UNIQUE INDEX IF NOT EXISTS settings_global_type_key
  ON public.settings(setting_type)
  WHERE user_id IS NULL;

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read global storefront settings" ON public.settings;
DROP POLICY IF EXISTS "Authenticated users can manage global storefront settings" ON public.settings;

CREATE POLICY "Public can read global storefront settings"
  ON public.settings
  FOR SELECT
  TO anon, authenticated
  USING (user_id IS NULL AND setting_type = 'storefront');

CREATE POLICY "Authenticated users can manage global storefront settings"
  ON public.settings
  FOR ALL
  TO authenticated
  USING (user_id IS NULL AND setting_type = 'storefront')
  WITH CHECK (user_id IS NULL AND setting_type = 'storefront');

INSERT INTO public.settings (user_id, setting_type, setting_data)
VALUES (
  NULL,
  'storefront',
  jsonb_build_object(
    'storeName', 'UltraShine',
    'businessName', 'UltraShine',
    'phone', '+91 98500 60 6000\n+91 70755 65500',
    'email', 'info@shinesparkle.com\nsupport@shinesparkle.com',
    'address', 'FLAT NO - 202, RK RESIDENCY\nHARITHA ROYAL CITY COLONY\nRAVALKOLE, MEDCHAL - 501401',
    'gstNumber', '',
    'upiId', 'urbanshine@upi',
    'upiPayeeName', 'UltraShine',
    'freeShippingAbove', 999,
    'shippingFee', 60,
    'heroEyebrow', 'A CLEANER • HEALTHIER • HAPPIER HOME',
    'heroTitle', 'CLEAN HOME.',
    'heroTitleAccent', 'FRESH EVERY DAY.',
    'heroDescription', 'High quality cleaning & personal care products made for modern homes — effective, affordable and reliable.'
  )
)
ON CONFLICT DO NOTHING;

CREATE OR REPLACE FUNCTION public.update_settings_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS settings_updated_at ON public.settings;
CREATE TRIGGER settings_updated_at
BEFORE UPDATE ON public.settings
FOR EACH ROW
EXECUTE FUNCTION public.update_settings_updated_at();
