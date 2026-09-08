import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Storefront from "./pages/store/StorefrontManaged";
import ProductPage from "./pages/store/ProductPage";
import CartPage from "./pages/store/CartPage";
import CheckoutPage from "./pages/store/CheckoutPage";
import Formulations from "./pages/Formulations";
import FormulationDetail from "./pages/FormulationDetail";
import ProductPrices from "./pages/ProductPrices";
import PackingMaterials from "./pages/PackingMaterials";
import ChemicalPrices from "./pages/ChemicalPrices";
import IndentSheet from "./pages/IndentSheet";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Invoice from "./pages/Invoice";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "auto" }); }, [pathname]);
  return null;
};

const StorefrontFooterLinkRedirector = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const element = event.target as HTMLElement | null;
      const link = element?.closest('a[href="#footer"]') as HTMLAnchorElement | null;
      if (!link) return;
      const label = link.textContent?.trim();
      const destination = label === "Contact" ? "/contact" : label === "Privacy Policy" ? "/privacy-policy" : label === "Terms & Conditions" ? "/terms-and-conditions" : null;
      if (!destination) return;
      event.preventDefault();
      navigate(destination);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [navigate]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <ScrollToTop />
            <StorefrontFooterLinkRedirector />
            <Routes>
              <Route path="/" element={<Storefront />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/formulations" element={<ProtectedRoute><Formulations /></ProtectedRoute>} />
              <Route path="/formulation/:slug" element={<ProtectedRoute><FormulationDetail /></ProtectedRoute>} />
              <Route path="/indent-sheet" element={<ProtectedRoute><IndentSheet /></ProtectedRoute>} />
              <Route path="/invoice" element={<ProtectedRoute><Invoice /></ProtectedRoute>} />
              <Route path="/prices" element={<ProtectedRoute><ProductPrices /></ProtectedRoute>} />
              <Route path="/product-prices" element={<ProtectedRoute><ProductPrices /></ProtectedRoute>} />
              <Route path="/packing-materials" element={<ProtectedRoute><PackingMaterials /></ProtectedRoute>} />
              <Route path="/chemical-prices" element={<ProtectedRoute><ChemicalPrices /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
