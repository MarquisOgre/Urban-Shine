import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, UserRound } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useStoreSettings } from "@/hooks/useStoreSettings";

const StoreHeader = () => {
  const { count } = useCart();
  const navigate = useNavigate();
  const { data: settings } = useStoreSettings();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-5 px-4 sm:px-6">
        <Link to="/" aria-label={`${settings?.storeName ?? "Urban Shine"} home`} className="shrink-0">
          <img src="/Logo.png" alt={settings?.storeName ?? "Urban Shine"} className="h-11 w-auto object-contain" />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          <Link to="/" className="rounded-xl bg-[#eaf5ff] px-4 py-2 text-sm font-bold text-[#0872d1]">Home</Link>
          <a href="/#products" className="rounded-xl px-4 py-2 text-sm font-semibold text-[#173a5c] hover:bg-slate-50">Products</a>
          <a href="/#categories" className="rounded-xl px-4 py-2 text-sm font-semibold text-[#173a5c] hover:bg-slate-50">Categories</a>
          <a href="/#why-us" className="rounded-xl px-4 py-2 text-sm font-semibold text-[#173a5c] hover:bg-slate-50">About</a>
          <a href="/#contact" className="rounded-xl px-4 py-2 text-sm font-semibold text-[#173a5c] hover:bg-slate-50">Contact</a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden h-10 w-52 items-center gap-2 rounded-full bg-[#f2f6f9] px-4 text-[#60758a] md:flex"><Search className="h-4 w-4" /><span className="text-xs">Search products...</span></div>
          <button type="button" onClick={() => navigate("/login")} aria-label="Account" className="flex h-10 w-10 items-center justify-center rounded-full text-[#073b70] hover:bg-slate-100"><UserRound className="h-5 w-5" /></button>
          <button type="button" onClick={() => navigate("/cart")} aria-label="Cart" className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#073b70] hover:bg-slate-100"><ShoppingCart className="h-5 w-5" />{count > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-[10px] font-black text-white">{count}</span>}</button>
        </div>
      </div>
    </header>
  );
};

export default StoreHeader;
