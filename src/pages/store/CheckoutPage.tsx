import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { CheckCircle2, Upload, ChevronLeft } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import StoreHeader from "@/components/store/StoreHeader";
import StoreFooter from "@/components/store/StoreFooter";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { buildUpiLink, useStoreSettings } from "@/hooks/useStoreSettings";

const schema = z.object({
  customer_name: z.string().trim().min(2, "Please enter your full name").max(100),
  customer_phone: z.string().trim().regex(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number"),
  customer_email: z.string().trim().email("Enter a valid email").max(255).or(z.literal("")),
  address_line1: z.string().trim().min(5, "Enter your house / street").max(200),
  address_line2: z.string().trim().max(200),
  city: z.string().trim().min(2, "Enter your city").max(100),
  state: z.string().trim().min(2, "Enter your state").max(100),
  pincode: z.string().trim().regex(/^[0-9]{6}$/, "Enter a valid 6-digit pincode"),
  notes: z.string().trim().max(500),
});
type Form = z.infer<typeof schema>;
const empty: Form = { customer_name: "", customer_phone: "", customer_email: "", address_line1: "", address_line2: "", city: "", state: "", pincode: "", notes: "" };

const CheckoutPage = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { data: settings } = useStoreSettings();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const shipping = subtotal >= (settings?.freeShippingAbove ?? 999) || subtotal === 0 ? 0 : (settings?.shippingFee ?? 60);
  const total = subtotal + shipping;
  const upiLink = useMemo(() => buildUpiLink(settings ?? { ...emptySettings }, total, `${settings?.storeName ?? "UltraShine"} order`), [settings, total]);

  const update = (name: keyof Form, value: string) => { setForm((f) => ({ ...f, [name]: value })); setErrors((e) => ({ ...e, [name]: "" })); };

  const goToPayment = () => {
    const result = schema.safeParse(form);
    if (!result.success) { const e: Record<string, string> = {}; result.error.issues.forEach((i) => { e[String(i.path[0])] = i.message; }); setErrors(e); toast.error("Please correct the highlighted details"); return; }
    setStep(2); window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const placeOrder = async () => {
    if (transactionId.trim().length < 4) return toast.error("Please enter the UPI transaction / reference ID");
    if (!screenshot) return toast.error("Please upload the payment screenshot");
    setSubmitting(true);
    try {
      const number = `ORD-${Date.now().toString().slice(-8)}`;
      const ext = screenshot.name.split(".").pop() ?? "jpg";
      const path = `${number}-${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("payment-proofs").upload(path, screenshot, { contentType: screenshot.type });
      if (uploadError) throw uploadError;
      const { error } = await supabase.from("orders").insert({ order_number: number, customer_name: form.customer_name, customer_phone: form.customer_phone, customer_email: form.customer_email || null, address_line1: form.address_line1, address_line2: form.address_line2 || null, city: form.city, state: form.state, pincode: form.pincode, items: items as any, subtotal, shipping, total_amount: total, payment_method: "UPI", transaction_id: transactionId.trim(), payment_screenshot_path: path, notes: form.notes || null });
      if (error) throw error;
      setOrderNumber(number); clearCart(); setStep(3); window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error: any) { toast.error(error?.message ?? "Could not place the order. Please try again."); }
    finally { setSubmitting(false); }
  };

  if (items.length === 0 && step !== 3) return <div className="min-h-screen bg-slate-50"><StoreHeader /><div className="mx-auto max-w-3xl px-4 py-20 text-center"><h1 className="text-2xl font-bold">Your cart is empty</h1><Link to="/" className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white">Browse products</Link></div><StoreFooter /></div>;

  return <div className="min-h-screen bg-slate-50"><StoreHeader /><main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
    {step !== 3 && <><Link to="/cart" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600"><ChevronLeft className="h-4 w-4" /> Back to cart</Link><div className="mt-4 flex gap-4 text-sm font-medium text-slate-700"><span className={step === 1 ? "font-bold text-blue-600" : ""}>1. Delivery details</span><span>→</span><span className={step === 2 ? "font-bold text-blue-600" : ""}>2. Payment</span></div></>}
    {step === 1 && <div className="mt-6 grid gap-8 lg:grid-cols-3"><div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2"><h1 className="text-xl font-extrabold">Delivery Address</h1>{([['customer_name','Full name *'],['customer_phone','Mobile number *'],['customer_email','Email (optional)'],['address_line1','House no, building, street *'],['address_line2','Area, landmark'],['city','City *'],['state','State *'],['pincode','Pincode *'],['notes','Order notes (optional)']] as [keyof Form,string][]).map(([name,label]) => <div key={name}><label className="text-sm font-medium text-slate-700">{label}</label><input value={form[name]} onChange={(e) => update(name,e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />{errors[name] && <p className="mt-1 text-xs text-red-600">{errors[name]}</p>}</div>)}<button onClick={goToPayment} className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700">Continue to Payment</button></div><Summary items={items} subtotal={subtotal} shipping={shipping} total={total} /></div>}
    {step === 2 && <div className="mt-6 grid gap-8 lg:grid-cols-3"><div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2"><h1 className="text-xl font-extrabold">Pay ₹{total.toFixed(2)} via UPI</h1><p className="mt-1 text-sm text-slate-500">Scan the QR with GPay, PhonePe or Paytm, then enter the transaction ID and upload the screenshot.</p><div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-start"><div className="rounded-2xl border-2 border-blue-100 bg-white p-4"><QRCodeCanvas value={upiLink} size={190} includeMargin /></div><div className="space-y-2 text-sm text-slate-600"><p><b className="text-slate-900">UPI ID:</b> {settings?.upiId}</p><p><b className="text-slate-900">Payee:</b> {settings?.upiPayeeName}</p><p><b className="text-slate-900">Amount:</b> ₹{total.toFixed(2)}</p><a href={upiLink} className="inline-block rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white sm:hidden">Pay in UPI app</a></div></div><div className="mt-8 space-y-4"><div><label className="text-sm font-medium">UPI transaction / reference ID *</label><input value={transactionId} maxLength={50} onChange={(e) => setTransactionId(e.target.value)} placeholder="e.g. 402312345678" className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm" /></div><div><label className="text-sm font-medium">Payment screenshot *</label><label htmlFor="proof" className="mt-1 flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-slate-300 px-4 py-5"><Upload className="h-5 w-5 text-slate-400" /><span className="text-sm text-slate-600">{screenshot ? screenshot.name : "Tap to upload a screenshot (max 5 MB)"}</span></label><input id="proof" type="file" accept="image/*" className="hidden" onChange={(e) => { const f=e.target.files?.[0]??null; if(f && f.size>5*1024*1024) return toast.error("Please upload an image under 5 MB"); setScreenshot(f); }} /></div><div className="flex gap-3"><button onClick={() => setStep(1)} className="rounded-xl border border-slate-300 px-6 py-3 font-semibold">Back</button><button onClick={placeOrder} disabled={submitting} className="flex-1 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white disabled:opacity-60">{submitting ? "Placing order…" : "Place Order"}</button></div></div></div><Summary items={items} subtotal={subtotal} shipping={shipping} total={total} /></div>}
    {step === 3 && <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-10 text-center"><CheckCircle2 className="mx-auto h-14 w-14 text-green-600" /><h1 className="mt-4 text-2xl font-extrabold">Order placed!</h1><p className="mt-2 text-slate-600">Thank you {form.customer_name}. Your order <b>{orderNumber}</b> has been received. We will verify the payment and contact you on {form.customer_phone}.</p><button onClick={() => navigate("/")} className="mt-7 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white">Continue shopping</button></div>}
  </main><StoreFooter /></div>;
};

const emptySettings = { storeName: "UltraShine", businessName: "UltraShine", phone: "", email: "", address: "", gstNumber: "", upiId: "urbanshine@upi", upiPayeeName: "UltraShine", freeShippingAbove: 999, shippingFee: 60, heroEyebrow: "", heroTitle: "", heroTitleAccent: "", heroDescription: "" };
const Summary = ({ items, subtotal, shipping, total }: { items: any[]; subtotal: number; shipping: number; total: number }) => <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6"><h2 className="font-bold">Order Summary</h2><ul className="mt-4 space-y-3 text-sm">{items.map((i) => <li key={i.slug} className="flex justify-between gap-3"><span>{i.name} × {i.qty}</span><span>₹{(i.price*i.qty).toFixed(2)}</span></li>)}</ul><div className="mt-5 space-y-2 border-t pt-4 text-sm"><div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div><div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}</span></div><div className="flex justify-between text-base font-extrabold"><span>Total</span><span>₹{total.toFixed(2)}</span></div></div></aside>;

export default CheckoutPage;
