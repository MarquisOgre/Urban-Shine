import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { productImages } from "@/data/productImages";

export interface StoreProduct {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  features: string[];
  usageInstructions: string;
  category: string;
  uom: string;
  price: number;
  mrp: number | null;
  inStock: boolean;
  images: string[];
  imageUrl: string;
}

const mapRow = (r: any): StoreProduct => {
  const images = Array.isArray(r.images) ? r.images.filter((v: unknown): v is string => typeof v === "string" && v.trim().length > 0) : [];
  const imageUrl = images[0] || productImages[r.slug];
  if (imageUrl) productImages[r.slug] = imageUrl;
  return {
    id: r.id,
    name: r.name,
    slug: r.slug,
    tagline: r.tagline,
    description: r.description,
    features: Array.isArray(r.features) ? (r.features as string[]) : [],
    usageInstructions: r.usage_instructions,
    category: r.category,
    uom: r.uom,
    price: Number(r.price),
    mrp: r.mrp === null ? null : Number(r.mrp),
    inStock: r.in_stock,
    images,
    imageUrl: imageUrl || "",
  };
};

export const useStoreProducts = () =>
  useQuery({
    queryKey: ["store_products"],
    queryFn: async (): Promise<StoreProduct[]> => {
      const { data, error } = await supabase
        .from("store_products")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return (data ?? []).map(mapRow);
    },
  });

export const useStoreProduct = (slug?: string) => {
  const { data, isLoading } = useStoreProducts();
  return { product: data?.find((p) => p.slug === slug), isLoading, all: data };
};
