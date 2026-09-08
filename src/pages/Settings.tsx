import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Check,
  CreditCard,
  LayoutGrid,
  Plus,
  Save,
  Settings as SettingsIcon,
  Sparkles,
  Star,
  Store,
  Trash2,
  Truck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import {
  DEFAULT_STORE_SETTINGS,
  useSaveStoreSettings,
  useStoreSettings,
  type StoreBenefit,
  type StoreCategory,
  type StoreSettings,
  type StoreWhyUs,
} from "@/hooks/useStoreSettings";
import { useStoreProducts, type StoreProduct } from "@/hooks/useStoreProducts";
import { getProductImage } from "@/data/productImages";

type CategoryDraft = StoreCategory & { id: string };
type BenefitDraft = StoreBenefit & { id: string };
type WhyUsDraft = StoreWhyUs & { id: string };

const Field = ({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string }) => (
  <div className="space-y-2"><Label>{label}</Label><Input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} /></div>
);

const categoryThemes: StoreCategory["theme"][] = ["blue", "green", "pink", "peach", "purple"];
const benefitIcons: StoreBenefit["icon"][] = ["truck", "shield", "leaf", "cart"];
const whyIcons: StoreWhyUs["icon"][] = ["shield", "sparkles", "check", "cart"];
const whyThemes: StoreWhyUs["theme"][] = ["green", "blue", "amber", "pink"];

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const cloneCategories = (items: StoreCategory[]): CategoryDraft[] => items.map((item) => ({ ...item, productSlugs: [...item.productSlugs], id: makeId() }));
const cloneBenefits = (items: StoreBenefit[]): BenefitDraft[] => items.map((item) => ({ ...item, id: makeId() }));
const cloneWhyUs = (items: StoreWhyUs[]): WhyUsDraft[] => items.map((item) => ({ ...item, id: makeId() }));

const Settings = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { data, isLoading } = useStoreSettings();
  const { data: products = [], isLoading: productsLoading } = useStoreProducts();
  const saveSettings = useSaveStoreSettings();
  const [form, setForm] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);
  const [featured, setFeatured] = useState<string[]>(DEFAULT_STORE_SETTINGS.featuredSlugs);
  const [categories, setCategories] = useState<CategoryDraft[]>(cloneCategories(DEFAULT_STORE_SETTINGS.categories));
  const [benefits, setBenefits] = useState<BenefitDraft[]>(cloneBenefits(DEFAULT_STORE_SETTINGS.benefits));
  const [whyUs, setWhyUs] = useState<WhyUsDraft[]>(cloneWhyUs(DEFAULT_STORE_SETTINGS.whyUs));

  useEffect(() => {
    if (!data) return;
    setForm(data);
    setFeatured([...data.featuredSlugs]);
    setCategories(cloneCategories(data.categories));
    setBenefits(cloneBenefits(data.benefits));
    setWhyUs(cloneWhyUs(data.whyUs));
  }, [data]);

  useEffect(() => {
    if (!authLoading && !user) navigate("/login", { replace: true });
  }, [authLoading, user, navigate]);

  const productBySlug = useMemo(() => new Map(products.map((p) => [p.slug, p])), [products]);
  const set = <K extends keyof StoreSettings>(key: K, value: StoreSettings[K]) => setForm((current) => ({ ...current, [key]: value }));

  const toggleFeatured = (slug: string) => {
    setFeatured((current) => current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]);
  };
  const moveFeatured = (index: number, direction: -1 | 1) => {
    setFeatured((current) => {
      const next = [...current];
      const target = index + direction;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const addCategory = () => setCategories((current) => [...current, {
    id: makeId(), title: "New Category", subtitle: "Add a short description", imageSlug: products[0]?.slug ?? "", theme: "blue", productSlugs: [],
  }]);
  const updateCategory = (id: string, patch: Partial<CategoryDraft>) => setCategories((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  const toggleCategoryProduct = (id: string, slug: string) => setCategories((current) => current.map((item) => item.id !== id ? item : {
    ...item,
    productSlugs: item.productSlugs.includes(slug) ? item.productSlugs.filter((s) => s !== slug) : [...item.productSlugs, slug],
  }));
  const removeCategory = (id: string) => setCategories((current) => current.filter((item) => item.id !== id));
  const moveCategory = (index: number, direction: -1 | 1) => setCategories((current) => {
    const next = [...current]; const target = index + direction;
    if (target < 0 || target >= next.length) return current;
    [next[index], next[target]] = [next[target], next[index]]; return next;
  });

  const addBenefit = () => setBenefits((current) => [...current, { id: makeId(), icon: "truck", title: "New Benefit", subtitle: "Add a short subtitle" }]);
  const updateBenefit = (id: string, patch: Partial<BenefitDraft>) => setBenefits((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  const removeBenefit = (id: string) => setBenefits((current) => current.filter((item) => item.id !== id));
  const moveBenefit = (index: number, direction: -1 | 1) => setBenefits((current) => {
    const next = [...current]; const target = index + direction;
    if (target < 0 || target >= next.length) return current;
    [next[index], next[target]] = [next[target], next[index]]; return next;
  });

  const addWhyUs = () => setWhyUs((current) => [...current, { id: makeId(), icon: "check", title: "New Reason", description: "Add a short description", theme: "blue" }]);
  const updateWhyUs = (id: string, patch: Partial<WhyUsDraft>) => setWhyUs((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  const removeWhyUs = (id: string) => setWhyUs((current) => current.filter((item) => item.id !== id));
  const moveWhyUs = (index: number, direction: -1 | 1) => setWhyUs((current) => {
    const next = [...current]; const target = index + direction;
    if (target < 0 || target >= next.length) return current;
    [next[index], next[target]] = [next[target], next[index]]; return next;
  });

  const save = async () => {
    if (!form.storeName.trim()) return toast.error("Store name is required");
    if (!form.upiId.trim()) return toast.error("UPI ID is required");
    if (form.freeShippingAbove < 0 || form.shippingFee < 0) return toast.error("Shipping values cannot be negative");
    if (categories.some((c) => !c.title.trim() || !c.imageSlug)) return toast.error("Every category needs a title and image");
    if (featured.some((slug) => !productBySlug.has(slug))) return toast.error("Featured products contain an unavailable product");

    const cleanCategories: StoreCategory[] = categories.map(({ id: _id, ...item }) => ({ ...item, title: item.title.trim(), subtitle: item.subtitle.trim() }));
    const cleanBenefits: StoreBenefit[] = benefits.map(({ id: _id, ...item }) => ({ ...item, title: item.title.trim(), subtitle: item.subtitle.trim() }));
    const cleanWhyUs: StoreWhyUs[] = whyUs.map(({ id: _id, ...item }) => ({ ...item, title: item.title.trim(), description: item.description.trim() }));

    try {
      await saveSettings.mutateAsync({
        ...form,
        storeName: form.storeName.trim(), businessName: form.businessName.trim(), phone: form.phone.trim(), email: form.email.trim(), address: form.address.trim(), gstNumber: form.gstNumber.trim(), upiId: form.upiId.trim(), upiPayeeName: form.upiPayeeName.trim(), heroEyebrow: form.heroEyebrow.trim(), heroTitle: form.heroTitle.trim(), heroTitleAccent: form.heroTitleAccent.trim(), heroDescription: form.heroDescription.trim(),
        freeShippingAbove: Number(form.freeShippingAbove) || 0, shippingFee: Number(form.shippingFee) || 0,
        featuredSlugs: featured, categories: cleanCategories, benefits: cleanBenefits, whyUs: cleanWhyUs,
      });
      toast.success("Store manager changes saved");
    } catch (error: any) {
      toast.error(error?.message ?? "Could not save store settings");
    }
  };

  if (authLoading || !user || isLoading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">Loading store manager…</div>;

  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"><Header />
    <main className="px-4 py-8 sm:px-6"><div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div><Button variant="outline" onClick={() => navigate("/")} className="mb-4"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Store</Button><h1 className="flex items-center gap-3 text-3xl font-bold text-slate-800"><SettingsIcon className="h-8 w-8 text-blue-600" /> Visual Store Manager</h1><p className="mt-1 text-slate-600">Manage what customers see without editing JSON or frontend code.</p></div>
        <div className="flex gap-2"><Button variant="outline" onClick={() => navigate("/store-products")}>Manage Products</Button><Button onClick={save} disabled={saveSettings.isPending} className="gap-2 bg-blue-600 hover:bg-blue-700"><Save className="h-4 w-4" />{saveSettings.isPending ? "Saving…" : "Save Store"}</Button></div>
      </div>

      <div className="space-y-6">
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><Store className="h-5 w-5 text-blue-600" /> Business Information</CardTitle></CardHeader><CardContent className="grid gap-5 sm:grid-cols-2"><Field label="Store Name" value={form.storeName} onChange={(v) => set("storeName", v)} /><Field label="Business / Legal Name" value={form.businessName} onChange={(v) => set("businessName", v)} /><Field label="Phone" value={form.phone} onChange={(v) => set("phone", v)} /><Field label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} /><div className="sm:col-span-2"><Label>Business Address</Label><Textarea value={form.address} onChange={(e) => set("address", e.target.value)} /></div><Field label="GST Number" value={form.gstNumber} onChange={(v) => set("gstNumber", v)} /></CardContent></Card>

        <Card><CardHeader><CardTitle>Homepage Hero</CardTitle></CardHeader><CardContent className="space-y-5"><Field label="Eyebrow" value={form.heroEyebrow} onChange={(v) => set("heroEyebrow", v)} /><div className="grid gap-5 sm:grid-cols-2"><Field label="Main Title" value={form.heroTitle} onChange={(v) => set("heroTitle", v)} /><Field label="Accent Title" value={form.heroTitleAccent} onChange={(v) => set("heroTitleAccent", v)} /></div><div><Label>Hero Description</Label><Textarea value={form.heroDescription} onChange={(e) => set("heroDescription", e.target.value)} /></div></CardContent></Card>

        <div className="grid gap-6 lg:grid-cols-2"><Card><CardHeader><CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5 text-green-600" /> UPI Payment</CardTitle></CardHeader><CardContent className="space-y-5"><Field label="UPI ID" value={form.upiId} onChange={(v) => set("upiId", v)} placeholder="yourname@upi" /><Field label="UPI Payee Name" value={form.upiPayeeName} onChange={(v) => set("upiPayeeName", v)} /></CardContent></Card><Card><CardHeader><CardTitle className="flex items-center gap-2"><Truck className="h-5 w-5 text-orange-600" /> Shipping</CardTitle></CardHeader><CardContent className="grid gap-5 sm:grid-cols-2"><Field label="Free Shipping Above (₹)" type="number" value={String(form.freeShippingAbove)} onChange={(v) => set("freeShippingAbove", Number(v))} /><Field label="Shipping Fee (₹)" type="number" value={String(form.shippingFee)} onChange={(v) => set("shippingFee", Number(v))} /></CardContent></Card></div>

        <Card><CardHeader><CardTitle className="flex items-center gap-2"><Star className="h-5 w-5 text-amber-500" /> Featured Products</CardTitle><p className="text-sm text-slate-500">Select products and use the arrows to control the Best Sellers order.</p></CardHeader><CardContent>{productsLoading ? <p className="text-sm text-slate-500">Loading products…</p> : products.length === 0 ? <p className="text-sm text-slate-500">Add products first from Manage Products.</p> : <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{products.map((product: StoreProduct) => { const index = featured.indexOf(product.slug); const selected = index >= 0; return <div key={product.id} className={`flex items-center gap-3 rounded-xl border p-3 ${selected ? "border-blue-400 bg-blue-50" : "border-slate-200 bg-white"}`}><input type="checkbox" checked={selected} onChange={() => toggleFeatured(product.slug)} className="h-4 w-4" /><img src={getProductImage(product.slug)} alt="" className="h-14 w-14 rounded-lg bg-white object-contain p-1" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-black text-slate-800">{product.name}</p><p className="text-xs text-slate-500">{product.uom} · ₹{product.price.toFixed(2)}</p></div>{selected && <div className="flex gap-1"><Button variant="ghost" size="icon" disabled={index === 0} onClick={() => moveFeatured(index, -1)}><ArrowUp className="h-4 w-4" /></Button><Button variant="ghost" size="icon" disabled={index === featured.length - 1} onClick={() => moveFeatured(index, 1)}><ArrowDown className="h-4 w-4" /></Button></div>}</div>; })}</div>}</CardContent></Card>

        <Card><CardHeader><CardTitle className="flex items-center justify-between"><span className="flex items-center gap-2"><LayoutGrid className="h-5 w-5 text-blue-600" /> Categories</span><Button onClick={addCategory} size="sm" className="gap-1"><Plus className="h-4 w-4" /> Add Category</Button></CardTitle><p className="text-sm text-slate-500">Create, reorder and configure category cards. Products are selected visually for each category.</p></CardHeader><CardContent className="space-y-4">{categories.map((category, index) => <div key={category.id} className="rounded-2xl border border-slate-200 bg-white p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wide text-slate-400">Category {index + 1}</p><div className="mt-1 flex gap-1"><Button variant="ghost" size="icon" disabled={index === 0} onClick={() => moveCategory(index, -1)}><ArrowUp className="h-4 w-4" /></Button><Button variant="ghost" size="icon" disabled={index === categories.length - 1} onClick={() => moveCategory(index, 1)}><ArrowDown className="h-4 w-4" /></Button></div></div><Button variant="ghost" size="icon" onClick={() => removeCategory(category.id)}><Trash2 className="h-4 w-4 text-red-600" /></Button></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"><Field label="Title" value={category.title} onChange={(v) => updateCategory(category.id, { title: v })} /><Field label="Subtitle" value={category.subtitle} onChange={(v) => updateCategory(category.id, { subtitle: v })} /><div className="space-y-2"><Label>Card Image</Label><select value={category.imageSlug} onChange={(e) => updateCategory(category.id, { imageSlug: e.target.value })} className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm">{products.map((p) => <option key={p.id} value={p.slug}>{p.name}</option>)}</select></div><div className="space-y-2"><Label>Theme</Label><select value={category.theme} onChange={(e) => updateCategory(category.id, { theme: e.target.value as StoreCategory["theme"] })} className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm">{categoryThemes.map((theme) => <option key={theme}>{theme}</option>)}</select></div></div><div className="mt-4"><Label>Products in this category</Label><div className="mt-2 flex flex-wrap gap-2">{products.map((p) => <label key={p.id} className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs ${category.productSlugs.includes(p.slug) ? "border-green-400 bg-green-50 font-bold" : "border-slate-200"}`}><input type="checkbox" checked={category.productSlugs.includes(p.slug)} onChange={() => toggleCategoryProduct(category.id, p.slug)} />{p.name}</label>)}</div></div></div>)}</CardContent></Card>

        <Card><CardHeader><CardTitle className="flex items-center justify-between"><span className="flex items-center gap-2"><Truck className="h-5 w-5 text-blue-600" /> Benefits Strip</span><Button onClick={addBenefit} size="sm" className="gap-1"><Plus className="h-4 w-4" /> Add Benefit</Button></CardTitle><p className="text-sm text-slate-500">These four compact benefits appear below the hero.</p></CardHeader><CardContent className="space-y-3">{benefits.map((item, index) => <div key={item.id} className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-[auto_150px_1fr_1fr_auto]"><div className="flex items-center gap-1"><Button variant="ghost" size="icon" disabled={index === 0} onClick={() => moveBenefit(index, -1)}><ArrowUp className="h-4 w-4" /></Button><Button variant="ghost" size="icon" disabled={index === benefits.length - 1} onClick={() => moveBenefit(index, 1)}><ArrowDown className="h-4 w-4" /></Button></div><div><Label>Icon</Label><select value={item.icon} onChange={(e) => updateBenefit(item.id, { icon: e.target.value as StoreBenefit["icon"] })} className="mt-2 h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm">{benefitIcons.map((icon) => <option key={icon}>{icon}</option>)}</select></div><Field label="Title" value={item.title} onChange={(v) => updateBenefit(item.id, { title: v })} /><Field label="Subtitle" value={item.subtitle} onChange={(v) => updateBenefit(item.id, { subtitle: v })} /><Button variant="ghost" size="icon" className="self-end" onClick={() => removeBenefit(item.id)}><Trash2 className="h-4 w-4 text-red-600" /></Button></div>)}</CardContent></Card>

        <Card><CardHeader><CardTitle className="flex items-center justify-between"><span className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-purple-600" /> Why Choose Us</span><Button onClick={addWhyUs} size="sm" className="gap-1"><Plus className="h-4 w-4" /> Add Reason</Button></CardTitle><p className="text-sm text-slate-500">Edit the feature cards shown near the bottom of the storefront.</p></CardHeader><CardContent className="space-y-3">{whyUs.map((item, index) => <div key={item.id} className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-2 lg:grid-cols-[auto_150px_150px_1fr_1.5fr_auto]"><div className="flex items-center gap-1"><Button variant="ghost" size="icon" disabled={index === 0} onClick={() => moveWhyUs(index, -1)}><ArrowUp className="h-4 w-4" /></Button><Button variant="ghost" size="icon" disabled={index === whyUs.length - 1} onClick={() => moveWhyUs(index, 1)}><ArrowDown className="h-4 w-4" /></Button></div><div><Label>Icon</Label><select value={item.icon} onChange={(e) => updateWhyUs(item.id, { icon: e.target.value as StoreWhyUs["icon"] })} className="mt-2 h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm">{whyIcons.map((icon) => <option key={icon}>{icon}</option>)}</select></div><div><Label>Theme</Label><select value={item.theme} onChange={(e) => updateWhyUs(item.id, { theme: e.target.value as StoreWhyUs["theme"] })} className="mt-2 h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm">{whyThemes.map((theme) => <option key={theme}>{theme}</option>)}</select></div><Field label="Title" value={item.title} onChange={(v) => updateWhyUs(item.id, { title: v })} /><div><Label>Description</Label><Textarea value={item.description} onChange={(e) => updateWhyUs(item.id, { description: e.target.value })} /></div><Button variant="ghost" size="icon" className="self-end" onClick={() => removeWhyUs(item.id)}><Trash2 className="h-4 w-4 text-red-600" /></Button></div>)}</CardContent></Card>

        <div className="flex justify-end gap-2"><Button variant="outline" onClick={() => navigate("/store-products")}>Manage Products</Button><Button onClick={save} disabled={saveSettings.isPending} className="gap-2 bg-blue-600 hover:bg-blue-700"><Check className="h-4 w-4" />{saveSettings.isPending ? "Saving…" : "Save Store"}</Button></div>
      </div>
    </div></main><Footer /></div>;
};

export default Settings;
