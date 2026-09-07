import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

const StoreFooter = () => (
  <footer className="mt-4 bg-slate-950 text-slate-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      <div>
        <div className="inline-flex items-center rounded-2xl bg-white px-3 py-2">
          <img src="/Logo.png" alt="Urban Shine" className="h-16 w-auto object-contain" />
        </div>
        <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
          Home, kitchen and personal care essentials made for everyday homes, with dependable quality and honest pricing.
        </p>
      </div>

      <div>
        <h4 className="text-white font-extrabold mb-4">Shop Urban Shine</h4>
        <ul className="space-y-3 text-sm">
          <li><a href="/#products" className="hover:text-lime-300 transition-colors">All Products</a></li>
          <li><a href="/#categories" className="hover:text-lime-300 transition-colors">Categories</a></li>
          <li><Link to="/cart" className="hover:text-lime-300 transition-colors">Your Cart</Link></li>
          <li><Link to="/checkout" className="hover:text-lime-300 transition-colors">Guest Checkout</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-extrabold mb-4">Help & Support</h4>
        <ul className="space-y-3 text-sm text-slate-400">
          <li>Delivery in 3–5 working days</li>
          <li>UPI payment on checkout</li>
          <li>
            <Link to="/login" className="inline-flex items-center gap-2 hover:text-lime-300 transition-colors">
              <Lock className="h-3.5 w-3.5" /> Staff login
            </Link>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
      © 2026 Urban Shine. Crafted with ❤️ by Dexorzo Creations.
    </div>
  </footer>
);

export default StoreFooter;
