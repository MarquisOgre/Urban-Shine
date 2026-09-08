import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, Package } from "lucide-react";
import MobileNav from "./MobileNav";

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const handleLogout = async () => { await signOut(); navigate("/"); };

  const items = [
    ["/invoice", "Invoice System"], ["/formulations", "Formulations"], ["/product-prices", "Product Prices"],
    ["/store-products", "Store Products"], ["/packing-materials", "Packing Materials"], ["/chemical-prices", "Chemical Prices"], ["/indent-sheet", "Indent Sheet"],
  ];

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-4 hover:opacity-90 transition-opacity">
            <div className="bg-white rounded-full p-1.5 sm:p-3 flex items-center justify-center"><img src="/Logo.png" alt="Urban Shine Logo" className="h-16 w-auto sm:h-14 object-contain" /></div>
          </Link>
          {user ? <>
            <nav className="hidden md:flex space-x-2 lg:space-x-4 items-center">
              {items.map(([to, label]) => <Link key={to} to={to} className="bg-white text-blue-600 font-semibold py-2 px-3 lg:px-4 rounded-lg shadow hover:bg-blue-100 transition-colors text-sm lg:text-base">{label === "Store Products" && <Package className="mr-1 inline h-4 w-4" />}{label}</Link>)}
              <Link to="/settings" className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold py-2 px-3 lg:px-4 rounded-lg shadow hover:bg-blue-100 transition-colors text-sm lg:text-base"><Settings className="h-4 w-4" /> Settings</Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-white/20"><LogOut className="h-4 w-4 mr-1" /> Logout</Button>
            </nav>
            <MobileNav />
          </> : <Link to="/" className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-100 transition-colors text-sm">Back to Store</Link>}
        </div>
      </div>
    </header>
  );
};

export default Header;
