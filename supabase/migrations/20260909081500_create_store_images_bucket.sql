-- Create the public storage bucket used by the Visual Store Manager image uploads.
-- This keeps Hero, Promotional Banner, Footer Logo and other settings images
-- in the same storage location expected by SettingsImageUpload.tsx.

INSERT INTO storage.buckets (id, name, public)
VALUES ('store-images', 'store-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public can view store images" ON storage.objects;
CREATE POLICY "Public can view store images"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'store-images');

DROP POLICY IF EXISTS "Authenticated users can upload store images" ON storage.objects;
CREATE POLICY "Authenticated users can upload store images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'store-images');

DROP POLICY IF EXISTS "Authenticated users can update store images" ON storage.objects;
CREATE POLICY "Authenticated users can update store images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'store-images')
  WITH CHECK (bucket_id = 'store-images');

DROP POLICY IF EXISTS "Authenticated users can delete store images" ON storage.objects;
CREATE POLICY "Authenticated users can delete store images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'store-images');
