import { useEffect, useState } from "react";
import { ArrowLeft, Save, Settings as SettingsIcon, Truck, CreditCard, Store, LayoutGrid, Star, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { DEFAULT_STORE_SETTINGS, useSaveStoreSettings, useStoreSettings, type StoreSettings } from "@/hooks/useStoreSettings";

const Field = ({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string }) => (
  <div className="space-y-2"><Label>{label}</Label><Input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} /></div>
);
const TextArea = ({ label, value, onChange, hint }: { label: string; value: string; onChange: (value: string) => void; hint?: string }) => (
  <div className="space-y-2"><Label>{label}</Label><textarea value={value} onChange={(e) => onChange(e.target.value)} className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />{hint && <p className="text-xs text-slate-500">{hint}</p>}</div>
);

const Settings = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { data, isLoading } = useStoreSettings();
  const saveSettings = useSaveStoreSettings();
  const [form, setForm] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);
  const [featuredText, setFeaturedText] = useState("");
  const [categoriesText, setCategoriesText] = useState("");
  const [benefitsText, setBenefitsText] = useState("");
  const [whyUsText, setWhyUsText] = useState("");

  useEffect(() => {
    if (!data) return;
    setForm(data);
    setFeaturedText(data.featuredSlugs.join(", "));
    setCategoriesText(JSON.stringify(data.categories, null, 2));
    setBenefitsText(JSON.stringify(data.benefits, null, 2));
    setWhyUsText(JSON.stringify(data.whyUs, null, 2));
  }, [data]);

  useEffect(() => { if (!authLoading && !user) navigate("/login", { replace: true }); }, [authLoading, user, navigate]);
  const set = <K extends keyof StoreSettings>(key: K, value: StoreSettings[K]) => setForm((current) => ({ ...current, [key]: value }));

  const parseJson = <T,>(label: string, value: string): T | null => {
    try { return JSON.parse(value) as T; } catch { toast.error(`${label} contains invalid JSON`); return null; }
  };

  const save = async () => {
    if (!form.storeName.trim()) return toast.error("Store name is required");
    if (!form.upiId.trim()) return toast.error("UPI ID is required");
    if (form.freeShippingAbove < 0 || form.shippingFee < 0) return toast.error("Shipping values cannot be negative");
    const categories = parseJson<StoreSettings["categories"]>("Categories", categoriesText);
    const benefits = parseJson<StoreSettings["benefits"]>("Benefits", benefitsText);
    const whyUs = parseJson<StoreSettings["whyUs"]>("Why Us", whyUsText);
    if (!categories || !benefits || !whyUs) return;
    try {
      await saveSettings.mutateAsync({
        ...form,
        storeName: form.storeName.trim(), businessName: form.businessName.trim(), phone: form.phone.trim(), email: form.email.trim(), address: form.address.trim(), gstNumber: form.gstNumber.trim(), upiId: form.upiId.trim(), upiPayeeName: form.upiPayeeName.trim(), heroEyebrow: form.heroEyebrow.trim(), heroTitle: form.heroTitle.trim(), heroTitleAccent: form.heroTitleAccent.trim(), heroDescription: form.heroDescription.trim(),
        freeShippingAbove: Number(form.freeShippingAbove) || 0, shippingFee: Number(form.shippingFee) || 0,
        featuredSlugs: featuredText.split(",").map((s) => s.trim()).filter(Boolean), categories, benefits, whyUs,
      });
      toast.success("Store settings saved successfully");
    } catch (error: any) { toast.error(error?.message ?? "Could not save settings"); }
  };

  if (authLoading || !user || isLoading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">Loading settings…</div>;

  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"><Header /><main className="px-4 py-8 sm:px-6"><div className="mx-auto max-w-6xl">
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4"><div><Button variant="outline" onClick={() => navigate("/")} className="mb-4"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Store</Button><h1 className="flex items-center gap-3 text-3xl font-bold text-slate-800"><SettingsIcon className="h-8 w-8 text-blue-600" /> Store Settings</h1><p className="mt-1 text-slate-600">Control the storefront without editing code.</p></div><Button onClick={save} disabled={saveSettings.isPending} className="gap-2 bg-blue-600 hover:bg-blue-700"><Save className="h-4 w-4" />{saveSettings.isPending ? "Saving…" : "Save Changes"}</Button></div>

    <div className="space-y-6">
      <Card><CardHeader><CardTitle className="flex items-center gap-2"><Store className="h-5 w-5 text-blue-600" /> Business Information</CardTitle></CardHeader><CardContent className="grid gap-5 sm:grid-cols-2"><Field label="Store Name" value={form.storeName} onChange={(v) => set("storeName", v)} /><Field label="Business / Legal Name" value={form.businessName} onChange={(v) => set("businessName", v)} /><Field label="Phone" value={form.phone} onChange={(v) => set("phone", v)} /><Field label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} /><div className="sm:col-span-2"><TextArea label="Business Address" value={form.address} onChange={(v) => set("address", v)} /></div><Field label="GST Number" value={form.gstNumber} onChange={(v) => set("gstNumber", v)} /></CardContent></Card>

      <Card><CardHeader><CardTitle>Homepage / Hero</CardTitle></CardHeader><CardContent className="space-y-5"><Field label="Hero Eyebrow" value={form.heroEyebrow} onChange={(v) => set("heroEyebrow", v)} /><div className="grid gap-5 sm:grid-cols-2"><Field label="Hero Main Title" value={form.heroTitle} onChange={(v) => set("heroTitle", v)} /><Field label="Hero Accent Title" value={form.heroTitleAccent} onChange={(v) => set("heroTitleAccent", v)} /></div><TextArea label="Hero Description" value={form.heroDescription} onChange={(v) => set("heroDescription", v)} /></CardContent></Card>

      <div className="grid gap-6 lg:grid-cols-2"><Card><CardHeader><CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5 text-green-600" /> UPI Payment</CardTitle></CardHeader><CardContent className="space-y-5"><Field label="UPI ID" value={form.upiId} onChange={(v) => set("upiId", v)} placeholder="yourname@upi" /><Field label="UPI Payee Name" value={form.upiPayeeName} onChange={(v) => set("upiPayeeName", v)} /></CardContent></Card><Card><CardHeader><CardTitle className="flex items-center gap-2"><Truck className="h-5 w-5 text-orange-600" /> Shipping</CardTitle></CardHeader><CardContent className="grid gap-5 sm:grid-cols-2"><Field label="Free Shipping Above (₹)" type="number" value={String(form.freeShippingAbove)} onChange={(v) => set("freeShippingAbove", Number(v))} /><Field label="Shipping Fee (₹)" type="number" value={String(form.shippingFee)} onChange={(v) => set("shippingFee", Number(v))} /></CardContent></Card></div>

      <Card><CardHeader><CardTitle className="flex items-center gap-2"><Star className="h-5 w-5 text-amber-500" /> Featured Products</CardTitle></CardHeader><CardContent><Field label="Featured product slugs" value={featuredText} onChange={setFeaturedText} placeholder="floor-cleaner, dish-wash, hand-wash" /><p className="mt-2 text-xs text-slate-500">Use the exact product slugs from Product Prices / Store Products, separated by commas. Order here controls the Best Sellers section.</p></CardContent></Card>

      <Card><CardHeader><CardTitle className="flex items-center gap-2"><LayoutGrid className="h-5 w-5 text-blue-600" /> Categories</CardTitle></CardHeader><CardContent><TextArea label="Category configuration" value={categoriesText} onChange={setCategoriesText} hint={'Each item needs title, subtitle, imageSlug, theme (blue/green/pink/peach/purple), and productSlugs. This keeps category filtering fully database-driven.'} /></CardContent></Card>

      <Card><CardHeader><CardTitle className="flex items-center gap-2"><Truck className="h-5 w-5 text-blue-600" /> Benefits Strip</CardTitle></CardHeader><CardContent><TextArea label="Benefits configuration" value={benefitsText} onChange={setBenefitsText} hint={'Each item needs icon (truck/shield/leaf/cart), title and subtitle.'} /></CardContent></Card>

      <Card><CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-purple-600" /> Why Choose Us</CardTitle></CardHeader><CardContent><TextArea label="Why Us configuration" value={whyUsText} onChange={setWhyUsText} hint={'Each item needs icon (shield/sparkles/check/cart), title, description and theme (green/blue/amber/pink).'}/></CardContent></Card>

      <div className="flex justify-end"><Button onClick={save} disabled={saveSettings.isPending} className="gap-2 bg-blue-600 hover:bg-blue-700"><Save className="h-4 w-4" />{saveSettings.isPending ? "Saving…" : "Save Changes"}</Button></div>
    </div>
  </div></main><Footer /></div>;
};

export default Settings;
