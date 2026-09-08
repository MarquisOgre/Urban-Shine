import { Link } from "react-router-dom";
import { Facebook, Instagram, Lock, Youtube } from "lucide-react";
import { useStoreSettings } from "@/hooks/useStoreSettings";

const StoreFooter = () => {
  const { data: settings } = useStoreSettings();
  const name = settings?.storeName ?? "Urban Shine";
  return (
    <footer id="contact" className="bg-[#062447] text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Link to="/" className="inline-flex items-center rounded-2xl bg-white px-3 py-1.5"><img src="/Logo.png" alt={name} className="h-14 w-auto object-contain" /></Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">Quality home, kitchen, cleaning and personal care essentials made for everyday living — with honest pricing.</p>
          {settings?.address && <p className="mt-3 max-w-sm whitespace-pre-line text-sm leading-6 text-slate-400">{settings.address}</p>}
          {settings?.phone && <p className="mt-2 text-sm text-slate-400">{settings.phone}</p>}
          {settings?.email && <p className="mt-1 text-sm text-slate-400">{settings.email}</p>}
        </div>
        <div><h4 className="mb-4 text-sm font-black text-white">Shop</h4><ul className="space-y-3 text-sm"><li><a href="/#products" className="hover:text-white">Products</a></li><li><a href="/#categories" className="hover:text-white">Categories</a></li><li><Link to="/cart" className="hover:text-white">Your Cart</Link></li><li><Link to="/checkout" className="hover:text-white">Guest Checkout</Link></li></ul></div>
        <div><h4 className="mb-4 text-sm font-black text-white">Support</h4><ul className="space-y-3 text-sm"><li>Delivery in 3–5 working days</li><li>UPI payment on checkout</li><li><Link to="/login" className="inline-flex items-center gap-1.5 hover:text-white"><Lock className="h-3.5 w-3.5" /> Staff login</Link></li></ul><div className="mt-5 flex gap-2">{[Facebook, Instagram, Youtube].map((Icon, index) => <span key={index} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white"><Icon className="h-4 w-4" /></span>)}</div></div>
      </div>
      <div className="border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6"><span>© {new Date().getFullYear()} {name}. All rights reserved.</span><div className="flex gap-5"><Link to="/privacy-policy">Privacy Policy</Link><Link to="/terms-and-conditions">Terms &amp; Conditions</Link></div></div></div>
    </footer>
  );
};

export default StoreFooter;
