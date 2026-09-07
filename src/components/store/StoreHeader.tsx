import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, ShieldCheck, UserRound } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const StoreHeader = () => {
  const { count } = useCart();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-5 px-4 sm:px-6">
        <Link to="/" className="shrink-0" aria-label="Urban Shine home">
          <img src="/Logo.png" alt="Urban Shine" className="h-12 w-auto object-contain" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <Link to="/" className="rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700">Home</Link>
          <a href="/#products" className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-700">Products</a>
          <a href="/#categories" className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-700">Categories</a>
          <a href="/#why-us" className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-700">About</a>
          <a href="/#contact" className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-700">Contact</a>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden h-10 w-52 items-center gap-2 rounded-full bg-slate-100 px-4 md:flex">
            <Search className="h-4 w-4 text-slate-500" />
            <span className="text-xs text-slate-400">Search products...</span>
          </div>

          <button
            type="button"
            onClick={() => navigate("/login")}
            aria-label="Staff login"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 sm:flex"
          >
            <UserRound className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => navigate("/cart")}
            aria-label="Cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-800 hover:bg-slate-100"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-[10px] font-black text-white">
                {count}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="hidden items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 sm:flex"
          >
            <ShieldCheck className="h-4 w-4" />
            Staff
          </button>
        </div>
      </div>
    </header>
  );
};

export default StoreHeader;
