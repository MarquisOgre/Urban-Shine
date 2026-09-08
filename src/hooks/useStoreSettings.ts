import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
  heroDescription:
    "High quality cleaning & personal care products made for modern homes — effective, affordable and reliable.",
};

const SETTING_TYPE = "storefront";

const mapSettings = (data: any): StoreSettings => ({
  ...DEFAULT_STORE_SETTINGS,
  ...(data?.setting_data ?? {}),
  freeShippingAbove: Number(data?.setting_data?.freeShippingAbove ?? DEFAULT_STORE_SETTINGS.freeShippingAbove),
  shippingFee: Number(data?.setting_data?.shippingFee ?? DEFAULT_STORE_SETTINGS.shippingFee),
});

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
        const { error } = await supabase
          .from("settings" as any)
          .update({ setting_data: settings })
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("settings" as any)
          .insert({ setting_type: SETTING_TYPE, user_id: null, setting_data: settings });
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
  `upi://pay?pa=${encodeURIComponent(settings.upiId)}&pn=${encodeURIComponent(
    settings.upiPayeeName,
  )}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(note)}`;
