import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-[68px] max-w-[1100px] items-center justify-between px-5 lg:px-8">
          <button onClick={() => navigate("/")} className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <img src="/Logo.png" alt="Urban Shine" className="h-12 w-auto object-contain" />
          </button>
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm font-bold text-[#092f59] hover:text-green-600">
            <ArrowLeft className="h-4 w-4" /> Back to Urban Shine
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[900px] px-5 py-12 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700"><FileText className="h-6 w-6" /></span>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-[#092f59]">Terms &amp; Conditions</h1>
            <p className="mt-1 text-sm text-slate-500">Terms governing use of the Urban Shine website and orders.</p>
          </div>
        </div>

        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
          <section><h2 className="text-lg font-black text-[#092f59]">1. Acceptance of Terms</h2><p className="mt-2 leading-7 text-slate-600">By accessing or using the Urban Shine website, you agree to these Terms &amp; Conditions. If you do not agree, please do not use the website.</p></section>
          <section><h2 className="text-lg font-black text-[#092f59]">2. Products &amp; Information</h2><p className="mt-2 leading-7 text-slate-600">We aim to keep product names, descriptions, quantities, prices and availability accurate. Product information may be updated from time to time without prior notice.</p></section>
          <section><h2 className="text-lg font-black text-[#092f59]">3. Orders</h2><p className="mt-2 leading-7 text-slate-600">An order is subject to product availability and successful order processing. We may contact you when clarification is required or when an order cannot be fulfilled.</p></section>
          <section><h2 className="text-lg font-black text-[#092f59]">4. Pricing &amp; Payment</h2><p className="mt-2 leading-7 text-slate-600">Prices displayed on the website are subject to change. Applicable delivery charges, taxes or other charges, where relevant, will be shown during the ordering process.</p></section>
          <section><h2 className="text-lg font-black text-[#092f59]">5. Delivery</h2><p className="mt-2 leading-7 text-slate-600">Delivery timelines are estimates and can be affected by location, courier conditions, weather, holidays or other circumstances beyond our reasonable control.</p></section>
          <section><h2 className="text-lg font-black text-[#092f59]">6. Returns &amp; Refunds</h2><p className="mt-2 leading-7 text-slate-600">Returns, replacements and refunds are subject to the applicable product and order policy. Please contact Urban Shine promptly if an item arrives damaged, incorrect or otherwise requires assistance.</p></section>
          <section><h2 className="text-lg font-black text-[#092f59]">7. Website Use</h2><p className="mt-2 leading-7 text-slate-600">You agree not to misuse the website, interfere with its operation, attempt unauthorized access, or use the website for unlawful purposes.</p></section>
          <section><h2 className="text-lg font-black text-[#092f59]">8. Intellectual Property</h2><p className="mt-2 leading-7 text-slate-600">Website content, branding, graphics, product materials and other original content are protected by applicable intellectual-property laws and may not be reproduced without permission.</p></section>
          <section><h2 className="text-lg font-black text-[#092f59]">9. Changes</h2><p className="mt-2 leading-7 text-slate-600">We may update these terms when necessary. Continued use of the website after an update means you accept the revised terms.</p></section>
          <section><h2 className="text-lg font-black text-[#092f59]">10. Contact</h2><p className="mt-2 leading-7 text-slate-600">If you have questions about these terms or an order, please use the <button onClick={() => navigate("/contact")} className="font-bold text-green-700 hover:underline">Contact Us</button> page.</p></section>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-5 text-center text-xs text-slate-500">© 2026 Urban Shine. All rights reserved.</footer>
    </div>
  );
};

export default TermsAndConditions;
