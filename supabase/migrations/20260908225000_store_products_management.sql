-- Phase 3: make the storefront product catalog fully manageable from the admin UI.
-- store_products already exists in the project; this migration makes its intended access explicit.

ALTER TABLE public.store_products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read store products" ON public.store_products;
DROP POLICY IF EXISTS "Authenticated users can manage store products" ON public.store_products;

CREATE POLICY "Public can read store products"
  ON public.store_products
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage store products"
  ON public.store_products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS store_products_sort_order_idx
  ON public.store_products (sort_order);
