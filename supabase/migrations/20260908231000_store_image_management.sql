-- Phase 3C: managed storefront image storage.
-- Product images are stored in the existing store_products.images JSON column.
-- This migration creates a public image bucket while restricting writes to authenticated users.

INSERT INTO storage.buckets (id, name, public)
VALUES ('store-images', 'store-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public can read store images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload store images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update store images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete store images" ON storage.objects;

CREATE POLICY "Public can read store images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'store-images');

CREATE POLICY "Authenticated users can upload store images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'store-images');

CREATE POLICY "Authenticated users can update store images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'store-images')
  WITH CHECK (bucket_id = 'store-images');

CREATE POLICY "Authenticated users can delete store images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'store-images');
