import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, ShieldCheck } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const StoreHeader = () => {
  const { count } = useCart();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[76px] flex items-center justify-between gap-6">
        <Link to="/" className="shrink-0 flex items-center" aria-label="Urban Shine home">
          <img
            src="/Logo.png"
            alt="Urban Shine"
            className="h-16 sm:h-[68px] w-auto object-contain"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          <Link to="/" className="text-sm font-semibold text-slate-800 hover:text-blue-700 transition-colors">
            Home
          </Link>
          <a href="/#products" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">
            Products
          </a>
          <a href="/#categories" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">
            Categories
          </a>
          <a href="/#why-us" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">
            Why Urban Shine
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => navigate("/#products")}
            aria-label="Search products"
            className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700 transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="relative inline-flex items-center gap-2 rounded-full bg-blue-700 text-white px-4 py-2.5 text-sm font-bold shadow-sm hover:bg-blue-800 transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-lime-400 text-slate-950 text-[10px] font-extrabold rounded-full h-5 min-w-5 px-1 flex items-center justify-center ring-2 ring-white">
                {count}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 text-slate-700 px-4 py-2.5 text-sm font-semibold hover:border-blue-200 hover:text-blue-700 transition-colors"
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
