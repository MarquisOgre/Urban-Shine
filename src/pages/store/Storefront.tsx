import { ArrowRight, Check, Heart, Leaf, Menu, Search, ShoppingCart, ShieldCheck, Sparkles, Truck, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { useStoreProducts } from "@/hooks/useStoreProducts";

type BottleProps = { color: string; dark: string; label: string; pump?: boolean; shape?: "round" | "square" };

const Bottle = ({ color, dark, label, pump, shape = "round" }: BottleProps) => (
  <div className="relative h-[250px] w-[112px] sm:h-[290px] sm:w-[130px]">
    {pump ? (
      <div className="absolute left-1/2 top-0 z-20 h-12 w-16 -translate-x-1/2">
        <div className="absolute right-0 top-0 h-3.5 w-14 rounded-full" style={{ background: dark }} />
        <div className="absolute right-1 top-2 h-10 w-4 rounded-b-lg" style={{ background: dark }} />
      </div>
    ) : (
      <div className="absolute left-1/2 top-0 z-20 h-12 w-11 -translate-x-1/2 rounded-t-lg" style={{ background: dark }} />
    )}
    <div
      className={`absolute bottom-0 left-1/2 h-[218px] w-[104px] -translate-x-1/2 overflow-hidden shadow-[0_24px_35px_rgba(15,23,42,.22)] sm:h-[252px] sm:w-[116px] ${shape === "square" ? "rounded-[18px]" : "rounded-[22px_22px_16px_16px]"}`}
      style={{ background: `linear-gradient(150deg, ${color}, ${dark})` }}
    >
      <div className="absolute inset-x-3 top-3 h-10 rounded-full bg-white/20" />
      <div className="absolute left-3 top-5 h-24 w-5 rounded-full bg-white/10 blur-sm" />
      <div className="absolute bottom-3 left-1/2 z-10 w-[78%] -translate-x-1/2 rounded-[12px] bg-white px-2 py-3 text-center shadow-lg">
        <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-[10px] font-black text-white">U</span>
        <b className="mt-1 block text-[8px] tracking-tight text-slate-800">URBAN SHINE</b>
        <span className="mt-1 block text-[8px] font-bold leading-3 text-slate-600">{label}</span>
      </div>
    </div>
  </div>
);

const visual: Record<string, BottleProps> = {
  "floor-cleaner": { color: "#a855f7", dark: "#6d28d9", label: "Floor Cleaner" },
  "dish-wash": { color: "#27b5e8", dark: "#0788c5", label: "Dish Wash" },
  "copper-cleaning-liquid": { color: "#f7cc28", dark: "#d79a00", label: "Copper Cleaner" },
  "hand-wash": { color: "#f35a82", dark: "#d91f69", label: "Hand Wash", pump: true },
  "liquid-detergent": { color: "#4f8df1", dark: "#2563eb", label: "Liquid Detergent" },
};

const categoryCards = [
  ["Household Cleaning", "Floor & Toilet Care", "floor-cleaner", "from-[#edf8ff] to-[#dceeff]"],
  ["Kitchen Care", "Dish & Copper Care", "dish-wash", "from-[#eafffb] to-[#d8f1ff]"],
  ["Laundry Care", "Powerful Everyday Clean", "liquid-detergent", "from-[#edf0ff] to-[#dce8ff]"],
  ["Personal Care", "Fresh & Gentle", "hand-wash", "from-[#fff0f5] to-[#ffe0e8]"],
  ["Specialty Care", "Solutions That Work", "copper-cleaning-liquid", "from-[#fff9dc] to-[#fff0b9]"],
] as const;

const Storefront = () => {
  const navigate = useNavigate();
  const { count, addItem } = useCart();
  const { data: products = [] } = useStoreProducts();
  const wanted = ["floor-cleaner", "dish-wash", "copper-cleaning-liquid", "hand-wash"];
  const featured = wanted.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean) as typeof products;

  const add = (p: (typeof products)[number]) => {
    addItem({ slug: p.slug, name: p.name, uom: p.uom, price: p.price });
    toast.success(`${p.name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-white text-[#092f59]">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center px-5 sm:px-8 lg:px-12">
          <button className="mr-4 lg:hidden" aria-label="Menu"><Menu className="h-6 w-6" /></button>
          <a href="#home" className="flex items-center gap-2.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-white shadow-sm"><Leaf className="h-6 w-6" /></span>
            <span className="text-[22px] font-extrabold tracking-tight text-[#13233b]">Urban <span className="text-green-600">Shine</span></span>
          </a>
          <nav className="ml-10 hidden items-center gap-8 lg:flex">
            <a href="#home" className="rounded-full bg-[#e8f3ff] px-5 py-2.5 text-sm font-extrabold text-[#1268bd]">Home</a>
            <a href="#products" className="text-sm font-bold text-slate-600 hover:text-blue-700">Products</a>
            <a href="#categories" className="text-sm font-bold text-slate-600 hover:text-blue-700">Categories</a>
            <a href="#why-us" className="text-sm font-bold text-slate-600 hover:text-blue-700">About</a>
            <a href="#footer" className="text-sm font-bold text-slate-600 hover:text-blue-700">Contact</a>
          </nav>
          <div className="ml-auto flex items-center gap-2.5">
            <div className="hidden h-11 w-56 items-center gap-2 rounded-full bg-[#f2f6fa] px-4 md:flex"><Search className="h-4 w-4 text-slate-400" /><span className="text-xs text-slate-400">Search products...</span></div>
            <button onClick={() => navigate("/login")} aria-label="Login" className="hidden h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100 sm:flex"><UserRound className="h-5 w-5" /></button>
            <button onClick={() => navigate("/cart")} aria-label="Cart" className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100"><ShoppingCart className="h-5 w-5" />{count > 0 && <span className="absolute -right-0.5 -top-0.5 min-w-5 rounded-full bg-green-600 px-1 py-0.5 text-center text-[10px] font-black text-white">{count}</span>}</button>
          </div>
        </div>
      </header>

      <section id="home" className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-[#eaf7ff] via-white to-[#effbe9]">
        <div className="absolute -left-32 top-10 h-[520px] w-[520px] rounded-full bg-[#ccecff]/70 blur-3xl" />
        <div className="absolute right-[-100px] top-[-80px] h-[520px] w-[520px] rounded-full bg-[#d9f7d5]/80 blur-3xl" />
        <div className="absolute right-[26%] top-16 h-5 w-5 rounded-full bg-green-200" />
        <div className="mx-auto grid min-h-[575px] max-w-[1440px] items-center px-5 sm:px-8 lg:grid-cols-[48%_52%] lg:px-12">
          <div className="relative z-20 py-14 lg:py-16">
            <p className="text-[12px] font-black uppercase tracking-[.34em] text-[#064b90]">A cleaner • healthier • happier home</p>
            <h1 className="mt-6 max-w-[650px] text-[58px] font-black leading-[.9] tracking-[-.045em] text-[#073665] sm:text-[72px] lg:text-[76px]">CLEAN HOME.<span className="block text-green-600">FRESH EVERY</span><span className="block text-green-600">DAY.</span></h1>
            <p className="mt-7 max-w-[570px] text-[17px] leading-7 text-[#315477]">High quality cleaning &amp; personal care products made for modern homes — effective, affordable and reliable.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#products" className="inline-flex items-center gap-3 rounded-xl bg-[#063d72] px-7 py-4 text-sm font-black text-white shadow-[0_12px_25px_rgba(6,61,114,.2)]">Shop Products <ArrowRight className="h-4 w-4" /></a>
              <a href="#categories" className="inline-flex items-center gap-3 rounded-xl border border-[#7d9fbe] bg-white/90 px-7 py-4 text-sm font-black text-[#063d72]">Explore Categories</a>
            </div>
          </div>

          <div className="relative flex min-h-[500px] items-end justify-center lg:min-h-[575px]">
            <div className="absolute bottom-10 left-[12%] h-14 w-[78%] rounded-full bg-slate-900/10 blur-2xl" />
            <div className="absolute right-[2%] top-[14%] z-10 rotate-[-4deg] text-center text-[24px] font-black leading-[1.12] text-[#14546b] sm:text-[28px]">Small steps<br />for a cleaner<br /><span className="text-green-600">tomorrow.</span></div>
            <div className="absolute bottom-0 left-[3%] h-[320px] w-[92%] rounded-[50%_50%_8%_8%] bg-white/45 blur-[1px]" />
            <div className="absolute bottom-[15%] left-[3%] h-28 w-36 -rotate-12 rounded-[45%_45%_20%_20%] bg-white/70 shadow-sm" />
            <div className="absolute bottom-[13%] right-[0%] h-32 w-44 rotate-6 rounded-[40%_40%_12%_12%] bg-white/65 shadow-sm" />
            <div className="absolute bottom-[28%] left-[4%] h-12 w-12 rotate-45 rounded-[4px_28px_4px_28px] bg-green-500/80" />
            <div className="absolute bottom-[24%] left-[8%] h-8 w-8 -rotate-12 rounded-[4px_28px_4px_28px] bg-green-400/70" />
            <div className="absolute bottom-[20%] right-[8%] h-10 w-10 -rotate-45 rounded-[28px_4px_28px_4px] bg-green-500/70" />
            <div className="relative z-20 flex items-end -space-x-3 sm:-space-x-1">
              <Bottle {...visual["floor-cleaner"]} />
              <Bottle {...visual["dish-wash"]} />
              <Bottle {...visual["copper-cleaning-liquid"]} />
              <Bottle {...visual["hand-wash"]} />
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 bg-white/95">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">
            {[[Truck,"Fast Delivery","3–5 working days"],[ShieldCheck,"Quality Tested","Safe & Reliable"],[Leaf,"Skin Friendly","Gentle Formulas"],[ShoppingCart,"Guest Checkout","Hassle Free"]].map(([I,t,s]) => { const Icon = I as typeof Truck; return <div key={t as string} className="flex items-center gap-3 border-r border-slate-100 px-5 py-5 sm:justify-center"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eef7ff] text-[#0a67bd]"><Icon className="h-5 w-5" /></span><span><b className="block text-sm font-black text-[#092f59]">{t as string}</b><small className="text-[11px] text-slate-500">{s as string}</small></span></div>; })}
          </div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12">
        <div className="text-center"><h2 className="text-[38px] font-black tracking-tight text-[#073665]">Shop by Category</h2><p className="mt-2 text-base text-[#58718e]">Find the right product for every need</p></div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categoryCards.map(([title, sub, slug, bg]) => <a key={title} href="#products" className="group rounded-2xl border border-[#dce5ee] bg-white p-3 text-center shadow-[0_2px_5px_rgba(15,23,42,.04)] transition hover:-translate-y-1 hover:shadow-lg"><div className={`flex aspect-[1.05] items-end justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${bg} pt-4`}><div className="scale-[.66] transition duration-300 group-hover:scale-[.71]"><Bottle {...visual[slug]} /></div></div><h3 className="mt-4 text-[15px] font-black text-[#073665]">{title}</h3><p className="mt-1 text-[12px] text-[#6c8198]">{sub}</p><span className="mt-3 inline-flex items-center gap-1 text-[12px] font-black text-[#0d57d7]">Shop now <ArrowRight className="h-3.5 w-3.5" /></span></a>)}
        </div>
      </section>

      <section id="products" className="scroll-mt-20 bg-[#f4f9fd] px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1360px]"><div className="flex items-end justify-between"><div><h2 className="text-[38px] font-black tracking-tight text-[#073665]">Best Sellers</h2><p className="mt-2 text-base text-[#58718e]">Our most loved everyday essentials</p></div><button onClick={() => navigate("/products")} className="hidden items-center gap-1 text-sm font-black text-[#0d57d7] sm:flex">View All Products <ArrowRight className="h-4 w-4" /></button></div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => { const v = visual[p.slug] ?? visual["floor-cleaner"]; const d = p.mrp && p.mrp > p.price ? Math.round(((p.mrp-p.price)/p.mrp)*100) : 0; return <article key={p.id} className="overflow-hidden rounded-2xl border border-[#dce5ee] bg-white shadow-[0_2px_7px_rgba(15,23,42,.06)] transition hover:-translate-y-1 hover:shadow-xl"><div className="relative flex h-[290px] items-center justify-center overflow-hidden bg-gradient-to-b from-white to-[#f6f9fc]"><span className="absolute left-4 top-4 z-10 rounded-full bg-green-600 px-3 py-1 text-[10px] font-black text-white">{d >= 20 ? "BEST SELLER" : "POPULAR"}</span><button className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm" aria-label="Wishlist"><Heart className="h-4 w-4" /></button><Bottle {...v} /></div><div className="p-5"><h3 className="text-[17px] font-black text-slate-900">{p.name}</h3><p className="mt-1 line-clamp-1 text-[12px] text-slate-500">{p.tagline}</p><div className="mt-4 flex flex-wrap items-center gap-2"><b className="text-[21px] text-slate-950">₹{p.price}</b>{d > 0 && <><span className="text-xs text-slate-400 line-through">₹{p.mrp}</span><span className="rounded-full bg-[#dcf8e7] px-2.5 py-1 text-[10px] font-black text-green-700">{d}% OFF</span></>}</div><small className="text-[11px] text-slate-400">{p.uom}</small><button onClick={() => add(p)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0878d1] py-3.5 text-sm font-black text-white shadow-sm hover:bg-[#066bbb]"><ShoppingCart className="h-4 w-4" /> Add to Cart</button></div></article>; })}
          </div>
        </div>
      </section>

      <section id="why-us" className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12"><div className="text-center"><h2 className="text-[38px] font-black tracking-tight text-[#073665]">Why Choose Urban Shine?</h2><p className="mt-2 text-base text-[#58718e]">Quality products for a cleaner and healthier tomorrow</p></div><div className="mt-11 grid gap-9 sm:grid-cols-2 lg:grid-cols-4">{[[ShieldCheck,"Quality You Can Trust","Every product is tested for safe & effective use.","bg-green-600"],[Sparkles,"Made for Everyday Homes","Practical solutions for modern living.","bg-blue-600"],[Check,"Honest Pricing","Great quality without unnecessary premium.","bg-amber-500"],[ShoppingCart,"Easy Ordering","Simple shopping with guest checkout.","bg-pink-500"]].map(([I,t,s,b]) => { const Icon=I as typeof ShieldCheck; return <div key={t as string} className="flex items-start gap-4"><span className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${b as string} text-white shadow-sm`}><Icon className="h-7 w-7" /></span><div><h3 className="text-[15px] font-black text-[#073665]">{t as string}</h3><p className="mt-2 max-w-[245px] text-[12px] leading-5 text-[#657d96]">{s as string}</p></div></div>; })}</div></section>

      <section className="px-5 pb-16 sm:px-8 lg:px-12"><div className="relative mx-auto max-w-[1380px] overflow-hidden rounded-[22px] bg-gradient-to-r from-[#e0f6d8] via-[#effbe8] to-[#e4f6ff] px-7 py-11 sm:px-11"><div className="relative z-20 max-w-[550px]"><p className="text-[11px] font-black uppercase tracking-[.3em] text-green-700">Everyday value</p><h2 className="mt-2 text-[40px] font-black tracking-tight text-[#073665]">Clean More. <span className="text-green-600">Spend Less.</span></h2><p className="mt-2 text-[15px] text-[#58718e]">Everyday essentials at prices you’ll love.</p><a href="#products" className="mt-7 inline-flex items-center gap-3 rounded-xl bg-green-600 px-6 py-3.5 text-sm font-black text-white shadow-lg">Shop Now <ArrowRight className="h-4 w-4" /></a></div><div className="absolute bottom-0 right-[15%] hidden items-end sm:flex"><div className="scale-[.48]"><Bottle {...visual["floor-cleaner"]} /></div><div className="-ml-10 scale-[.43]"><Bottle {...visual["dish-wash"]} /></div><div className="-ml-10 scale-[.48]"><Bottle {...visual["copper-cleaning-liquid"]} /></div><div className="-ml-10 scale-[.43]"><Bottle {...visual["hand-wash"]} /></div></div><div className="absolute right-7 top-5 flex h-24 w-24 items-center justify-center rounded-full bg-green-600 text-center text-[10px] font-black text-white shadow-lg">UP<br /><span className="text-[26px] leading-5">25%</span><br />OFF</div></div></section>

      <footer id="footer" className="bg-[#062447] text-slate-300"><div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-12"><div><div className="flex items-center gap-2"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-white"><Leaf className="h-5 w-5" /></span><b className="text-2xl text-white">Urban <span className="text-green-400">Shine</span></b></div><p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">Quality home, kitchen, cleaning and personal care essentials made for everyday living.</p></div><div><h4 className="mb-4 text-sm font-black text-white">Shop</h4><div className="space-y-3 text-sm"><a href="#products" className="block hover:text-white">Products</a><a href="#categories" className="block hover:text-white">Categories</a><button onClick={() => navigate("/cart")} className="block hover:text-white">Your Cart</button></div></div><div><h4 className="mb-4 text-sm font-black text-white">Support</h4><div className="space-y-3 text-sm"><p>Delivery in 3–5 working days</p><p>UPI payment on checkout</p><button onClick={() => navigate("/login")} className="hover:text-white">Staff login</button></div></div></div><div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">© 2026 Urban Shine. All rights reserved.</div></footer>
    </div>
  );
};

export default Storefront;
