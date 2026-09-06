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
import { FREE_SHIPPING_ABOVE, SHIPPING_FEE, UPI_ID, buildUpiLink } from "@/config/store";

const addressSchema = z.object({
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

type AddressForm = z.infer<typeof addressSchema>;

const emptyForm: AddressForm = {
  customer_name: "",
  customer_phone: "",
  customer_email: "",
  address_line1: "",
  address_line2: "",
  city: "",
  state: "",
  pincode: "",
  notes: "",
};

const Field = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}: {
  label: string;
  name: keyof AddressForm;
  value: string;
  onChange: (name: keyof AddressForm, value: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) => (
  <div>
    <label htmlFor={name} className="text-sm font-medium text-slate-700">
      {label}
    </label>
    <input
      id={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(name, e.target.value)}
      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
  </div>
);

const CheckoutPage = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<AddressForm>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const shipping = subtotal >= FREE_SHIPPING_ABOVE || subtotal === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const upiLink = useMemo(() => buildUpiLink(total, "UltraShine order"), [total]);

  const update = (name: keyof AddressForm, value: string) => {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((e) => ({ ...e, [name]: "" }));
  };

  if (items.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen bg-slate-50">
        <StoreHeader />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Your cart is empty</h1>
          <Link to="/" className="mt-6 inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl">
            Browse products
          </Link>
        </div>
        <StoreFooter />
      </div>
    );
  }

  const goToPayment = () => {
    const result = addressSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        fieldErrors[i.path[0] as string] = i.message;
      });
      setErrors(fieldErrors);
      toast.error("Please correct the highlighted details");
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const placeOrder = async () => {
    if (transactionId.trim().length < 4) {
      toast.error("Please enter the UPI transaction / reference ID");
      return;
    }
    if (!screenshot) {
      toast.error("Please upload the payment screenshot");
      return;
    }

    setSubmitting(true);
    try {
      const number = `ORD-${Date.now().toString().slice(-8)}`;
      let screenshotPath: string | null = null;

      const ext = screenshot.name.split(".").pop() ?? "jpg";
      const path = `${number}-${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("payment-proofs")
        .upload(path, screenshot, { contentType: screenshot.type });
      if (uploadError) throw uploadError;
      screenshotPath = path;

      const { error } = await supabase.from("orders").insert({
        order_number: number,
        customer_name: form.customer_name,
        customer_phone: form.customer_phone,
        customer_email: form.customer_email || null,
        address_line1: form.address_line1,
        address_line2: form.address_line2 || null,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        items: items as unknown as any,
        subtotal,
        shipping,
        total_amount: total,
        payment_method: "UPI",
        transaction_id: transactionId.trim(),
        payment_screenshot_path: screenshotPath,
        notes: form.notes || null,
      });
      if (error) throw error;

      setOrderNumber(number);
      clearCart();
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      toast.error(err?.message ?? "Could not place the order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <StoreHeader />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {step !== 3 && (
          <>
            <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600">
              <ChevronLeft className="h-4 w-4" /> Back to cart
            </Link>
            <div className="mt-4 flex items-center gap-4">
              {["Delivery details", "Payment"].map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <span
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      step === i + 1 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-700">{label}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <div className="mt-6 grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
              <h1 className="text-xl font-extrabold text-slate-900">Delivery Address</h1>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full name *" name="customer_name" value={form.customer_name} onChange={update} error={errors.customer_name} />
                <Field label="Mobile number *" name="customer_phone" value={form.customer_phone} onChange={update} error={errors.customer_phone} placeholder="10-digit number" />
              </div>
              <Field label="Email (optional)" name="customer_email" value={form.customer_email} onChange={update} error={errors.customer_email} type="email" />
              <Field label="House no, building, street *" name="address_line1" value={form.address_line1} onChange={update} error={errors.address_line1} />
              <Field label="Area, landmark" name="address_line2" value={form.address_line2} onChange={update} error={errors.address_line2} />
              <div className="grid sm:grid-cols-3 gap-4">
                <Field label="City *" name="city" value={form.city} onChange={update} error={errors.city} />
                <Field label="State *" name="state" value={form.state} onChange={update} error={errors.state} />
                <Field label="Pincode *" name="pincode" value={form.pincode} onChange={update} error={errors.pincode} />
              </div>
              <Field label="Order notes (optional)" name="notes" value={form.notes} onChange={update} error={errors.notes} />
              <button
                onClick={goToPayment}
                className="w-full sm:w-auto bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-700"
              >
                Continue to Payment
              </button>
            </div>
            <OrderSummary items={items} subtotal={subtotal} shipping={shipping} total={total} />
          </div>
        )}

        {step === 2 && (
          <div className="mt-6 grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6">
              <h1 className="text-xl font-extrabold text-slate-900">Pay ₹{total.toFixed(2)} via UPI</h1>
              <p className="text-sm text-slate-500 mt-1">
                Scan the QR with any UPI app (GPay, PhonePe, Paytm), then enter the transaction ID and upload the screenshot.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <div className="bg-white p-4 rounded-2xl border-2 border-blue-100">
                  <QRCodeCanvas value={upiLink} size={190} includeMargin />
                </div>
                <div className="text-sm text-slate-600 space-y-2">
                  <p><span className="font-semibold text-slate-900">UPI ID:</span> {UPI_ID}</p>
                  <p><span className="font-semibold text-slate-900">Amount:</span> ₹{total.toFixed(2)}</p>
                  <a href={upiLink} className="inline-block sm:hidden bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl">
                    Pay in UPI app
                  </a>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div>
                  <label htmlFor="txn" className="text-sm font-medium text-slate-700">
                    UPI transaction / reference ID *
                  </label>
                  <input
                    id="txn"
                    value={transactionId}
                    maxLength={50}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="e.g. 402312345678"
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="proof" className="text-sm font-medium text-slate-700">
                    Payment screenshot *
                  </label>
                  <label
                    htmlFor="proof"
                    className="mt-1 flex items-center gap-3 border-2 border-dashed border-slate-300 rounded-xl px-4 py-5 cursor-pointer hover:border-blue-400"
                  >
                    <Upload className="h-5 w-5 text-slate-400" />
                    <span className="text-sm text-slate-600">
                      {screenshot ? screenshot.name : "Tap to upload a screenshot (max 5 MB)"}
                    </span>
                  </label>
                  <input
                    id="proof"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? null;
                      if (file && file.size > 5 * 1024 * 1024) {
                        toast.error("Please upload an image under 5 MB");
                        return;
                      }
                      setScreenshot(file);
                    }}
                  />
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="px-6 py-3 rounded-xl border border-slate-300 font-semibold text-slate-700">
                    Back
                  </button>
                  <button
                    onClick={placeOrder}
                    disabled={submitting}
                    className="flex-1 bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-60"
                  >
                    {submitting ? "Placing order…" : "Place Order"}
                  </button>
                </div>
              </div>
            </div>
            <OrderSummary items={items} subtotal={subtotal} shipping={shipping} total={total} />
          </div>
        )}

        {step === 3 && (
          <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl p-10 text-center">
            <CheckCircle2 className="h-14 w-14 text-green-600 mx-auto" />
            <h1 className="mt-4 text-2xl font-extrabold text-slate-900">Order placed!</h1>
            <p className="mt-2 text-slate-600">
              Thank you {form.customer_name}. Your order <span className="font-semibold">{orderNumber}</span> has
              been received. We will verify the payment and call you on {form.customer_phone} to confirm delivery.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-7 bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-700"
            >
              Continue shopping
            </button>
          </div>
        )}
      </main>
      <StoreFooter />
    </div>
  );
};

const OrderSummary = ({
  items,
  subtotal,
  shipping,
  total,
}: {
  items: { slug: string; name: string; qty: number; price: number }[];
  subtotal: number;
  shipping: number;
  total: number;
}) => (
  <aside className="bg-white border border-slate-200 rounded-2xl p-6 h-fit">
    <h2 className="font-bold text-slate-900">Order Summary</h2>
    <ul className="mt-4 space-y-3 text-sm">
      {items.map((i) => (
        <li key={i.slug} className="flex justify-between gap-3">
          <span className="text-slate-600">
            {i.name} <span className="text-slate-400">× {i.qty}</span>
          </span>
          <span className="font-semibold">₹{(i.price * i.qty).toFixed(2)}</span>
        </li>
      ))}
    </ul>
    <dl className="mt-4 border-t pt-4 space-y-2 text-sm">
      <div className="flex justify-between">
        <dt className="text-slate-500">Subtotal</dt>
        <dd className="font-semibold">₹{subtotal.toFixed(2)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-slate-500">Shipping</dt>
        <dd className="font-semibold">{shipping === 0 ? "Free" : `₹${shipping}`}</dd>
      </div>
      <div className="flex justify-between border-t pt-3 text-base">
        <dt className="font-bold">Total</dt>
        <dd className="font-extrabold">₹{total.toFixed(2)}</dd>
      </div>
    </dl>
  </aside>
);

export default CheckoutPage;
