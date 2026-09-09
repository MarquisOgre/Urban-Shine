import { useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Props = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder: string;
  description?: string;
  aspect?: "wide" | "banner" | "logo";
};

const SettingsImageUpload = ({ label, value, onChange, folder, description, aspect = "wide" }: Props) => {
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File) => {
    if (!file.type.startsWith("image/")) return toast.error("Only image files are allowed");
    if (file.size > 5 * 1024 * 1024) return toast.error("Image must be 5 MB or smaller");
    setUploading(true);
    try {
      const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
      const path = `settings/${folder}/${crypto.randomUUID()}-${safeName}`;
      const { error } = await supabase.storage.from("store-images").upload(path, file, { upsert: false, contentType: file.type });
      if (error) throw error;
      const { data } = supabase.storage.from("store-images").getPublicUrl(path);
      onChange(data.publicUrl);
      toast.success(`${label} uploaded`);
    } catch (error: any) {
      toast.error(error?.message ?? `Could not upload ${label.toLowerCase()}`);
    } finally {
      setUploading(false);
    }
  };

  const height = aspect === "logo" ? "h-28" : aspect === "banner" ? "h-44" : "h-52";

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className={`relative overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 ${height}`}>
        {value ? <img src={value} alt={`${label} preview`} className="h-full w-full object-contain p-3" /> : <div className="flex h-full flex-col items-center justify-center text-center text-slate-400"><ImagePlus className="h-8 w-8" /><p className="mt-2 text-sm font-semibold">No image selected</p></div>}
        {uploading && <div className="absolute inset-0 flex items-center justify-center bg-white/80"><Loader2 className="h-7 w-7 animate-spin text-blue-600" /></div>}
      </div>
      <div className="flex flex-wrap gap-2">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-xs font-bold text-white hover:bg-blue-700">
          <ImagePlus className="h-4 w-4" />{uploading ? "Uploading…" : value ? "Replace Image" : "Upload Image"}
          <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" disabled={uploading} onChange={(e) => { const file = e.target.files?.[0]; if (file) void upload(file); e.currentTarget.value = ""; }} />
        </label>
        {value && <Button type="button" variant="outline" size="sm" onClick={() => onChange("")} className="gap-2"><Trash2 className="h-4 w-4 text-red-500" />Remove</Button>}
      </div>
      <p className="text-xs text-slate-500">{description ?? "PNG, JPG, WebP or GIF · maximum 5 MB"}</p>
    </div>
  );
};

export default SettingsImageUpload;
