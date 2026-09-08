import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface StoreCategory {
  title: string;
  subtitle: string;
  imageSlug: string;
  theme: "blue" | "green" | "pink" | "peach" | "purple";
  productSlugs: string[];
}

export interface StoreBenefit {
  icon: "truck" | "shield" | "leaf" | "cart";
  title: string;
  subtitle: string;
}

export interface StoreWhyUs {
  icon: "shield" | "sparkles" | "check" | "cart";
  title: string;
  description: string;
  theme: "green" | "blue" | "amber" | "pink";
}

export interface StoreSettings {
  storeName: string;
  businessName: string;
  phone: string;
  email: string;
  address: string;
  gstNumber: string;
  upiId: string;
  upiPayeeName: string;
  freeShippingAbove: number;
  shippingFee: number;
  heroEyebrow: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroDescription: string;
  featuredSlugs: string[];
  categories: StoreCategory[];
  benefits: StoreBenefit[];
  whyUs: StoreWhyUs[];
}

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: "UltraShine",
  businessName: "UltraShine",
  phone: "",
  email: "",
  address: "",
  gstNumber: "",
  upiId: "urbanshine@upi",
  upiPayeeName: "UltraShine",
  freeShippingAbove: 999,
  shippingFee: 60,
  heroEyebrow: "A CLEANER • HEALTHIER • HAPPIER HOME",
  heroTitle: "CLEAN HOME.",
  heroTitleAccent: "FRESH EVERY DAY.",
  heroDescription: "High quality cleaning & personal care products made for modern homes — effective, affordable and reliable.",
  featuredSlugs: ["floor-cleaner", "dish-wash", "copper-cleaning-liquid", "hand-wash"],
  categories: [
    { title: "Household Cleaning", subtitle: "Floor Cleaner · Toilet Cleaner · Phenyl", imageSlug: "floor-cleaner", theme: "blue", productSlugs: ["floor-cleaner", "toilet-cleaner", "phenyl"] },
    { title: "Kitchen Care", subtitle: "Dish Wash · Soap Oil · Kitchen Cleaning", imageSlug: "dish-wash", theme: "green", productSlugs: ["dish-wash", "soap-oil"] },
    { title: "Laundry Care", subtitle: "Liquid Detergent · Detergent Powder", imageSlug: "liquid-detergent", theme: "pink", productSlugs: ["liquid-detergent", "detergent-powder"] },
    { title: "Personal Care", subtitle: "Hand Wash · Vaseline · Balm · Rose Water", imageSlug: "hand-wash", theme: "peach", productSlugs: ["hand-wash", "vaseline", "zandu-balm", "rose-water"] },
    { title: "Specialty Care", subtitle: "Copper Cleaner · Acid Cleaner", imageSlug: "copper-cleaning-liquid", theme: "purple", productSlugs: ["copper-cleaning-liquid", "acid"] },
  ],
  benefits: [
    { icon: "truck", title: "Fast Delivery", subtitle: "Across India" },
    { icon: "shield", title: "Quality Tested", subtitle: "Safe & Reliable" },
    { icon: "leaf", title: "Skin Friendly", subtitle: "Gentle Formulas" },
    { icon: "cart", title: "Guest Checkout", subtitle: "Hassle Free" },
  ],
  whyUs: [
    { icon: "shield", title: "Quality You Can Trust", description: "Every product is tested for safe & effective use.", theme: "green" },
    { icon: "sparkles", title: "Made for Everyday Homes", description: "Practical solutions for modern living.", theme: "blue" },
    { icon: "check", title: "Honest Pricing", description: "Great quality without unnecessary premium.", theme: "amber" },
    { icon: "cart", title: "Easy Ordering", description: "Simple shopping with guest checkout.", theme: "pink" },
  ],
};

const SETTING_TYPE = "storefront";

const mapSettings = (data: any): StoreSettings => {
  const raw = data?.setting_data ?? {};
  return {
    ...DEFAULT_STORE_SETTINGS,
    ...raw,
    freeShippingAbove: Number(raw.freeShippingAbove ?? DEFAULT_STORE_SETTINGS.freeShippingAbove),
    shippingFee: Number(raw.shippingFee ?? DEFAULT_STORE_SETTINGS.shippingFee),
    featuredSlugs: Array.isArray(raw.featuredSlugs) ? raw.featuredSlugs : DEFAULT_STORE_SETTINGS.featuredSlugs,
    categories: Array.isArray(raw.categories) ? raw.categories : DEFAULT_STORE_SETTINGS.categories,
    benefits: Array.isArray(raw.benefits) ? raw.benefits : DEFAULT_STORE_SETTINGS.benefits,
    whyUs: Array.isArray(raw.whyUs) ? raw.whyUs : DEFAULT_STORE_SETTINGS.whyUs,
  };
};

export const useStoreSettings = () =>
  useQuery({
    queryKey: [SETTING_TYPE],
    queryFn: async (): Promise<StoreSettings> => {
      const { data, error } = await supabase
        .from("settings" as any)
        .select("setting_data")
        .eq("setting_type", SETTING_TYPE)
        .is("user_id", null)
        .maybeSingle();
      if (error) throw error;
      return mapSettings(data);
    },
    initialData: DEFAULT_STORE_SETTINGS,
    staleTime: 60_000,
  });

export const useSaveStoreSettings = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (settings: StoreSettings) => {
      const { data: existing, error: readError } = await supabase
        .from("settings" as any)
        .select("id")
        .eq("setting_type", SETTING_TYPE)
        .is("user_id", null)
        .maybeSingle();
      if (readError) throw readError;
      if (existing?.id) {
        const { error } = await supabase.from("settings" as any).update({ setting_data: settings }).eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("settings" as any).insert({ setting_type: SETTING_TYPE, user_id: null, setting_data: settings });
        if (error) throw error;
      }
      return settings;
    },
    onSuccess: (settings) => {
      qc.setQueryData([SETTING_TYPE], settings);
      qc.invalidateQueries({ queryKey: [SETTING_TYPE] });
    },
  });
};

export const buildUpiLink = (settings: StoreSettings, amount: number, note: string) =>
  `upi://pay?pa=${encodeURIComponent(settings.upiId)}&pn=${encodeURIComponent(settings.upiPayeeName)}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(note)}`;
