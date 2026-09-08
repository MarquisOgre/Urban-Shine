import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Plus, Pencil, Trash2, Package, Eye, EyeOff, Upload, X, ImagePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { getProductImage } from "@/data/productImages";

type Product = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  features: string[];
  usage_instructions: string;
  category: string;
  uom: string;
  price: number;
  mrp: number | null;
  in_stock: boolean;
  sort_order: number;
  images: string[];
};

type ProductForm = Omit<Product, "id" | "images"> & { images: string[] };

const blank: ProductForm = {
  name: "", slug: "", tagline: "", description: "", features: [], usage_instructions: "",
  category: "", uom: "", price: 0, mrp: null, in_stock: true, sort_order: 0, images: [],
};

const slugify = (value: string) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const StoreProducts = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(blank);
  const [newImages, setNewImages] = useState<File[]>([]);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["store_products", "admin"],
    queryFn: async () => {
      const { data, error } = await supabase.from("store_products").select("*").order("sort_order").order("name");
      if (error) throw error;
      return (data ?? []) as Product[];
    },
    enabled: !!user,
  });

  const save = useMutation({
    mutationFn: async () => {
      const slug = slugify(form.slug || form.name);
      if (!form.name.trim() || !slug || !form.category.trim() || !form.uom.trim()) throw new Error("Name, slug, category and UOM are required");
      if (newImages.length > 6 - form.images.length) throw new Error("You can keep a maximum of 6 product images");
      for (const file of newImages) {
        if (!file.type.startsWith("image/")) throw new Error("Only image files are allowed");
        if (file.size > 5 * 1024 * 1024) throw new Error(`${file.name} is larger than 5 MB`);
      }

      const payload = {
        name: form.name.trim(), slug, tagline: form.tagline.trim(), description: form.description.trim(),
        features: form.features, usage_instructions: form.usage_instructions.trim(), category: form.category.trim(),
        uom: form.uom.trim(), price: Number(form.price) || 0, mrp: form.mrp == null ? null : Number(form.mrp),
        in_stock: form.in_stock, sort_order: Number(form.sort_order) || 0, images: form.images,
      };

      let productId = editingId;
      if (editingId) {
        const { error } = await supabase.from("store_products").update(payload).eq("id", editingId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from("store_products").insert(payload).select("id").single();
        if (error) throw error;
        productId = data.id;
      }

      const uploadedUrls: string[] = [];
      for (const file of newImages) {
        const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
        const path = `${slug}/${crypto.randomUUID()}-${safeName}`;
        const { error } = await supabase.storage.from("store-images").upload(path, file, { upsert: false, contentType: file.type });
        if (error) throw error;
        const { data } = supabase.storage.from("store-images").getPublicUrl(path);
        uploadedUrls.push(data.publicUrl);
      }

      if (uploadedUrls.length && productId) {
        const finalImages = [...form.images, ...uploadedUrls];
        const { error } = await supabase.from("store_products").update({ images: finalImages }).eq("id", productId);
        if (error) throw error;
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["store_products"] }); setOpen(false); setNewImages([]); toast.success(editingId ? "Product updated" : "Product added"); },
    onError: (e: any) => toast.error(e.message ?? "Could not save product"),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("store_products").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["store_products"] }); toast.success("Product deleted"); },
    onError: (e: any) => toast.error(e.message ?? "Could not delete product"),
  });

  const openAdd = () => { setEditingId(null); setForm({ ...blank }); setNewImages([]); setOpen(true); };
  const openEdit = (p: Product) => { setEditingId(p.id); setForm({ ...p, images: Array.isArray(p.images) ? p.images : [], features: Array.isArray(p.features) ? p.features : [] }); setNewImages([]); setOpen(true); };
  const set = (key: keyof ProductForm, value: any) => setForm((f) => ({ ...f, [key]: value }));
  const chooseImages = (files: FileList | null) => {
    if (!files) return;
    const selected = Array.from(files);
    setNewImages((current) => [...current, ...selected].slice(0, Math.max(0, 6 - form.images.length)));
  };
  const removeExistingImage = (index: number) => set("images", form.images.filter((_, i) => i !== index));
  const removeNewImage = (index: number) => setNewImages((current) => current.filter((_, i) => i !== index));

  if (!user) return null;

  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"><Header />
    <main className="px-4 py-8 sm:px-6"><div className="mx-auto max-w-[1700px]">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4"><div><Button variant="outline" onClick={() => navigate("/")} className="mb-3"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Store</Button><h1 className="flex items-center gap-3 text-3xl font-bold text-slate-800"><Package className="h-8 w-8 text-blue-600" /> Store Products</h1><p className="mt-1 text-slate-600">Manage products, pricing, stock and storefront images.</p></div><Button onClick={openAdd} className="gap-2"><Plus className="h-4 w-4" /> Add Product</Button></div>
      {isLoading ? <p className="py-16 text-center text-slate-500">Loading products…</p> : <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{products.map((p) => { const image = Array.isArray(p.images) && p.images.length ? p.images[0] : getProductImage(p.slug); return <Card key={p.id} className="overflow-hidden bg-white"><CardContent className="p-4"><div className="flex gap-4"><div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-slate-50 p-2"><img src={image} alt={p.name} className="h-full w-full object-contain" /></div><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><div><h2 className="font-black text-slate-800">{p.name}</h2><p className="text-xs text-blue-600">{p.category}</p></div><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${p.in_stock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{p.in_stock ? "In Stock" : "Out"}</span></div><p className="mt-2 line-clamp-2 text-xs text-slate-500">{p.tagline}</p><div className="mt-3 flex items-end justify-between"><div><span className="text-lg font-black text-slate-800">₹{Number(p.price).toFixed(2)}</span>{p.mrp != null && p.mrp > p.price && <span className="ml-2 text-xs text-slate-400 line-through">₹{Number(p.mrp).toFixed(2)}</span>}</div><span className="text-xs text-slate-500">{p.uom}</span></div></div></div><div className="mt-4 flex items-center justify-between border-t pt-3"><span className="text-[11px] text-slate-400">{Array.isArray(p.images) ? p.images.length : 0} managed image(s) · Order {p.sort_order}</span><div className="flex gap-1"><Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button><Button variant="ghost" size="icon" onClick={() => remove.mutate(p.id)} disabled={remove.isPending}><Trash2 className="h-4 w-4 text-red-600" /></Button></div></div></CardContent></Card>; })}</div>}
    </div></main>

    <Dialog open={open} onOpenChange={setOpen}><DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl"><DialogHeader><DialogTitle>{editingId ? "Edit Store Product" : "Add Store Product"}</DialogTitle></DialogHeader><div className="grid gap-4 sm:grid-cols-2">
      <div><Label>Product Name *</Label><Input value={form.name} onChange={(e) => set("name", e.target.value)} /></div><div><Label>Slug *</Label><Input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="floor-cleaner" /></div><div><Label>Category *</Label><Input value={form.category} onChange={(e) => set("category", e.target.value)} /></div><div><Label>UOM *</Label><Input value={form.uom} onChange={(e) => set("uom", e.target.value)} placeholder="1 Ltr" /></div><div><Label>Selling Price (₹) *</Label><Input type="number" value={String(form.price)} onChange={(e) => set("price", Number(e.target.value))} /></div><div><Label>MRP (₹)</Label><Input type="number" value={form.mrp == null ? "" : String(form.mrp)} onChange={(e) => set("mrp", e.target.value === "" ? null : Number(e.target.value))} /></div><div><Label>Sort Order</Label><Input type="number" value={String(form.sort_order)} onChange={(e) => set("sort_order", Number(e.target.value))} /></div><div><Label>Features (one per line)</Label><Textarea value={form.features.join("\n")} onChange={(e) => set("features", e.target.value.split("\n").map((v) => v.trim()).filter(Boolean))} /></div>
      <div className="sm:col-span-2"><Label>Product Images</Label><div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">{form.images.map((src, i) => <div key={src} className="relative overflow-hidden rounded-xl border bg-slate-50"><img src={src} alt={`Product ${i + 1}`} className="h-32 w-full object-contain p-2" /><button type="button" onClick={() => removeExistingImage(i)} className="absolute right-1 top-1 rounded-full bg-white p-1 shadow" aria-label="Remove image"><X className="h-4 w-4 text-red-600" /></button></div>)}{newImages.map((file, i) => <div key={`${file.name}-${i}`} className="relative overflow-hidden rounded-xl border bg-slate-50"><img src={URL.createObjectURL(file)} alt={file.name} className="h-32 w-full object-contain p-2" /><button type="button" onClick={() => removeNewImage(i)} className="absolute right-1 top-1 rounded-full bg-white p-1 shadow" aria-label="Remove selected image"><X className="h-4 w-4 text-red-600" /></button></div>)}<label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white text-center hover:border-blue-500"><ImagePlus className="h-7 w-7 text-blue-600" /><span className="mt-1 text-xs font-bold text-slate-600">Add images</span><span className="text-[10px] text-slate-400">PNG/JPG/WebP · max 5 MB</span><input type="file" accept="image/png,image/jpeg,image/webp,image/gif" multiple className="hidden" onChange={(e) => chooseImages(e.target.files)} /></label></div><p className="mt-2 text-xs text-slate-500">Up to 6 images. The first image is used as the main product image; all managed images appear in the product gallery.</p></div>
      <div className="sm:col-span-2"><Label>Tagline</Label><Input value={form.tagline} onChange={(e) => set("tagline", e.target.value)} /></div><div className="sm:col-span-2"><Label>Description</Label><Textarea className="min-h-24" value={form.description} onChange={(e) => set("description", e.target.value)} /></div><div className="sm:col-span-2"><Label>Usage Instructions</Label><Textarea value={form.usage_instructions} onChange={(e) => set("usage_instructions", e.target.value)} /></div><label className="sm:col-span-2 flex cursor-pointer items-center gap-3 rounded-lg border p-3"><input type="checkbox" checked={form.in_stock} onChange={(e) => set("in_stock", e.target.checked)} /><span className="flex items-center gap-2 text-sm font-semibold">{form.in_stock ? <Eye className="h-4 w-4 text-green-600" /> : <EyeOff className="h-4 w-4 text-slate-400" />} Available for purchase</span></label>
    </div><DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => save.mutate()} disabled={save.isPending} className="gap-2"><Upload className="h-4 w-4" />{save.isPending ? "Saving…" : "Save Product"}</Button></DialogFooter></DialogContent></Dialog><Footer /></div>;
};

export default StoreProducts;
