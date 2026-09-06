import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Storefront from "./pages/store/Storefront";
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

import Invoice from "./pages/Invoice";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Routes>
              {/* Public storefront */}
              <Route path="/" element={<Storefront />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/login" element={<Login />} />

              {/* Admin area (login required) */}
              <Route path="/formulations" element={<ProtectedRoute><Formulations /></ProtectedRoute>} />
              <Route path="/formulation/:slug" element={<ProtectedRoute><FormulationDetail /></ProtectedRoute>} />
              <Route path="/indent-sheet" element={<ProtectedRoute><IndentSheet /></ProtectedRoute>} />
              <Route path="/invoice" element={<ProtectedRoute><Invoice /></ProtectedRoute>} />
              <Route path="/prices" element={<ProtectedRoute><ProductPrices /></ProtectedRoute>} />
              <Route path="/product-prices" element={<ProtectedRoute><ProductPrices /></ProtectedRoute>} />
              <Route path="/packing-materials" element={<ProtectedRoute><PackingMaterials /></ProtectedRoute>} />
              <Route path="/chemical-prices" element={<ProtectedRoute><ChemicalPrices /></ProtectedRoute>} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
