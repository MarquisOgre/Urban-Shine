import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
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
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700"><ShieldCheck className="h-6 w-6" /></span>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-[#092f59]">Privacy Policy</h1>
            <p className="mt-1 text-sm text-slate-500">How Urban Shine handles information on this website.</p>
          </div>
        </div>

        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
          <section><h2 className="text-lg font-black text-[#092f59]">1. Information We Collect</h2><p className="mt-2 leading-7 text-slate-600">When you use Urban Shine, we may receive information you voluntarily provide, such as your name, contact details, delivery address and order information. We may also receive basic technical information needed to operate and secure the website.</p></section>
          <section><h2 className="text-lg font-black text-[#092f59]">2. How We Use Information</h2><p className="mt-2 leading-7 text-slate-600">We use information to process and deliver orders, provide customer support, communicate about your purchases, improve our products and website, and maintain website security.</p></section>
          <section><h2 className="text-lg font-black text-[#092f59]">3. Payments</h2><p className="mt-2 leading-7 text-slate-600">Payment details are handled through the applicable payment provider. Urban Shine does not need to store your complete card or payment credentials on this website.</p></section>
          <section><h2 className="text-lg font-black text-[#092f59]">4. Cookies</h2><p className="mt-2 leading-7 text-slate-600">The website may use cookies or similar technologies to keep the site working, remember preferences and understand website usage.</p></section>
          <section><h2 className="text-lg font-black text-[#092f59]">5. Sharing Information</h2><p className="mt-2 leading-7 text-slate-600">We may share necessary information with service providers such as delivery, payment, hosting or technology partners when required to provide our services. We do not sell personal information as a business practice.</p></section>
          <section><h2 className="text-lg font-black text-[#092f59]">6. Data Security</h2><p className="mt-2 leading-7 text-slate-600">We take reasonable measures to protect information against unauthorized access, alteration or disclosure. No internet transmission can be guaranteed to be completely secure.</p></section>
          <section><h2 className="text-lg font-black text-[#092f59]">7. Your Choices</h2><p className="mt-2 leading-7 text-slate-600">You may contact us to ask about personal information associated with your orders or to request corrections where applicable.</p></section>
          <section><h2 className="text-lg font-black text-[#092f59]">8. Contact</h2><p className="mt-2 leading-7 text-slate-600">For privacy-related questions, please use the <button onClick={() => navigate("/contact")} className="font-bold text-green-700 hover:underline">Contact Us</button> page.</p></section>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-5 text-center text-xs text-slate-500">© 2026 Urban Shine. All rights reserved.</footer>
    </div>
  );
};

export default PrivacyPolicy;
