import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, Package } from "lucide-react";
import MobileNav from "./MobileNav";

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const handleLogout = async () => { await signOut(); navigate("/"); };

  // Rename the admin navigation labels here. Keep labels short so they stay on one line.
  const items = [
    ["/invoice", "Invoice System"],
    ["/formulations", "Formulations"],
    ["/product-prices", "Product Prices"],
    ["/store-products", "Store Products"],
    ["/packing-materials", "Packing Materials"],
    ["/chemical-prices", "Chemical Prices"],
    ["/indent-sheet", "Indent Sheet"],
  ];

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="w-full px-3 sm:px-5 lg:px-6 py-2 sm:py-3">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 lg:gap-5">
          <Link to="/" className="flex shrink-0 items-center hover:opacity-90 transition-opacity">
            <div className="bg-white rounded-full p-1.5 sm:p-2 flex items-center justify-center">
              <img src="/Logo.png" alt="Urban Shine Logo" className="h-16 w-auto sm:h-14 object-contain" />
            </div>
          </Link>

          {user ? <>
            <nav className="hidden md:flex min-w-0 items-center justify-center gap-2 overflow-visible">
              {items.map(([to, label]) => (
                <Link
                  key={to}
                  to={to}
                  className="inline-flex shrink-0 items-center justify-center whitespace-nowrap bg-white text-blue-600 font-semibold py-2 px-3 lg:px-3.5 rounded-lg shadow hover:bg-blue-100 transition-colors text-sm"
                >
                  {label === "Store Products" && <Package className="mr-1 inline h-4 w-4 shrink-0" />}
                  {label}
                </Link>
              ))}
              <Link
                to="/settings"
                className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap bg-white text-blue-600 font-semibold py-2 px-3 lg:px-3.5 rounded-lg shadow hover:bg-blue-100 transition-colors text-sm"
              >
                <Settings className="h-4 w-4 shrink-0" /> Settings
              </Link>
            </nav>

            <div className="hidden md:block shrink-0">
              <Button variant="ghost" size="sm" onClick={handleLogout} className="whitespace-nowrap text-white hover:bg-white/20 px-2 lg:px-3">
                <LogOut className="h-4 w-4 mr-1" /> Logout
              </Button>
            </div>
            <MobileNav />
          </> : (
            <Link to="/" className="justify-self-end bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-100 transition-colors text-sm">
              Back to Store
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
