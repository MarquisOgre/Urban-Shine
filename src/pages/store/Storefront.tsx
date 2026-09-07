import { ArrowRight, Check, Heart, Leaf, Menu, Search, ShoppingCart, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { useStoreProducts } from "@/hooks/useStoreProducts";

type BottleProps = { color: string; dark: string; name: string; pump?: boolean };
const Bottle = ({ color, dark, name, pump }: BottleProps) => (
  <div className="relative h-60 w-32 sm:h-72 sm:w-36">
    <div className="absolute left-1/2 top-0 h-10 w-10 -translate-x-1/2 rounded-t-lg" style={{ background: dark }} />
    {pump && <div className="absolute right-3 top-0 h-8 w-14"><div className="absolute right-0 top-0 h-3 w-11 rounded-full" style={{ background: dark }} /><div className="absolute right-0 top-2 h-6 w-3" style={{ background: dark }} /></div>}
    <div className="absolute bottom-0 left-1/2 flex h-52 w-28 -translate-x-1/2 items-center justify-center rounded-[18px] shadow-[0_22px_36px_rgba(15,23,42,.2)] sm:h-64 sm:w-32" style={{ background: `linear-gradient(145deg,${color},${dark})` }}>
      <div className="absolute inset-x-2 top-3 h-10 rounded-full bg-white/15" />
      <div className="z-10 mx-2 w-[78%] rounded-xl bg-white px-2 py-3 text-center shadow"><span className="mx-auto mb-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[9px] font-black text-white">U</span><b className="block text-[9px] text-slate-800">URBAN SHINE</b><span className="mt-1 block text-[9px] font-bold leading-3 text-slate-600">{name}</span></div>
    </div>
  </div>
);

const visual: Record<string, BottleProps> = {
  "floor-cleaner": { color: "#a855f7", dark: "#6d28d9", name: "Floor Cleaner" },
  "dish-wash": { color: "#38bdf8", dark: "#0284c7", name: "Dish Wash" },
  "copper-cleaning-liquid": { color: "#fde047", dark: "#ca8a04", name: "Copper Cleaner" },
  "hand-wash": { color: "#fb7185", dark: "#db2777", name: "Hand Wash", pump: true },
  "liquid-detergent": { color: "#60a5fa", dark: "#2563eb", name: "Liquid Detergent" },
};

const categoryCards = [
  { title: "Household Cleaning", sub: "Floor & Toilet Care", slug: "floor-cleaner", bg: "from-sky-50 to-blue-100" },
  { title: "Kitchen Care", sub: "Dish & Copper Care", slug: "dish-wash", bg: "from-cyan-50 to-sky-100" },
  { title: "Laundry Care", sub: "Powerful Everyday Clean", slug: "liquid-detergent", bg: "from-indigo-50 to-blue-100" },
  { title: "Personal Care", sub: "Fresh & Gentle", slug: "hand-wash", bg: "from-pink-50 to-rose-100" },
  { title: "Specialty Care", sub: "Solutions That Work", slug: "copper-cleaning-liquid", bg: "from-amber-50 to-yellow-100" },
];

const Storefront = () => {
  const navigate = useNavigate();
  const { count, addItem } = useCart();
  const { data: products = [] } = useStoreProducts();
  const featured = ["floor-cleaner", "dish-wash", "copper-cleaning-liquid", "hand-wash"].map((s) => products.find((p) => p.slug === s)).filter(Boolean) as typeof products;

  const add = (p: (typeof products)[number]) => {
    addItem({ slug: p.slug, name: p.name, uom: p.uom, price: p.price });
    toast.success(`${p.name} added to cart`);
  };

  return <div className="min-h-screen bg-white text-slate-900">
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[74px] max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <button className="lg:hidden" aria-label="Menu"><Menu className="h-6 w-6" /></button>
        <a href="#home" className="flex items-center gap-2"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white"><Leaf className="h-5 w-5" /></span><b className="text-xl">Urban <span className="text-green-600">Shine</span></b></a>
        <nav className="hidden items-center gap-7 lg:flex"><a href="#home" className="text-sm font-black text-blue-700">Home</a><a href="#products" className="text-sm font-semibold text-slate-600">Products</a><a href="#categories" className="text-sm font-semibold text-slate-600">Categories</a><a href="#why-us" className="text-sm font-semibold text-slate-600">About</a><a href="#footer" className="text-sm font-semibold text-slate-600">Contact</a></nav>
        <div className="ml-auto flex items-center gap-2"><div className="hidden h-10 w-52 items-center gap-2 rounded-full bg-slate-100 px-4 md:flex"><Search className="h-4 w-4 text-slate-400" /><span className="text-xs text-slate-400">Search products...</span></div><button onClick={() => navigate("/cart")} aria-label="Cart" className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100"><ShoppingCart className="h-5 w-5" />{count > 0 && <span className="absolute right-0 top-0 rounded-full bg-green-600 px-1.5 py-0.5 text-[10px] font-black text-white">{count}</span>}</button></div>
      </div>
    </header>

    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-[#eaf7ff] via-white to-[#effbea]"><div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" /><div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-green-100/60 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center px-4 sm:px-6 lg:grid-cols-[.92fr_1.08fr] lg:px-8">
        <div className="py-14 sm:py-16 lg:py-20"><p className="text-xs font-black uppercase tracking-[.28em] text-blue-800">A cleaner • healthier • happier home</p><h1 className="mt-5 text-5xl font-black leading-[.94] tracking-tight text-[#062b55] sm:text-6xl lg:text-[68px]">CLEAN HOME.<span className="block text-green-600">FRESH EVERY DAY.</span></h1><p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">High quality cleaning &amp; personal care products made for modern homes — effective, affordable and reliable.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#products" className="inline-flex items-center gap-2 rounded-lg bg-[#063b70] px-6 py-3.5 text-sm font-black text-white shadow-lg">Shop Products <ArrowRight className="h-4 w-4" /></a><a href="#categories" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-black text-[#063b70]">Explore Categories</a></div></div>
        <div className="relative flex min-h-[410px] items-end justify-center sm:min-h-[500px]"><div className="absolute bottom-12 h-12 w-[82%] rounded-full bg-slate-900/15 blur-2xl" /><div className="absolute right-2 top-12 rotate-[-4deg] text-right text-xl font-black leading-tight text-slate-700">Small steps<br />for a cleaner<br /><span className="text-green-600">tomorrow.</span></div><div className="relative z-20 flex -space-x-5 sm:-space-x-2"><Bottle {...visual["floor-cleaner"]} /><Bottle {...visual["dish-wash"]} /><Bottle {...visual["copper-cleaning-liquid"]} /><Bottle {...visual["hand-wash"]} /></div></div>
      </div>
      <div className="border-t border-slate-200 bg-white"><div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">{[{I:Truck,t:"Fast Delivery",s:"3–5 working days"},{I:ShieldCheck,t:"Quality Tested",s:"Safe & Reliable"},{I:Leaf,t:"Skin Friendly",s:"Gentle Formulas"},{I:ShoppingCart,t:"Guest Checkout",s:"Hassle Free"}].map(({I,t,s}) => <div key={t} className="flex items-center gap-3 border-r border-slate-100 px-4 py-5 sm:justify-center"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700"><I className="h-5 w-5" /></span><span><b className="block text-sm font-black text-[#092f59]">{t}</b><small className="text-[11px] text-slate-500">{s}</small></span></div>)}</div></div>
    </section>

    <section id="categories" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><div className="text-center"><h2 className="text-3xl font-black text-[#092f59] sm:text-4xl">Shop by Category</h2><p className="mt-2 text-sm text-slate-500 sm:text-base">Find the right product for every need</p></div><div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">{categoryCards.map((c) => <a href="#products" key={c.title} className="group rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm hover:-translate-y-1 hover:shadow-xl"><div className={`flex aspect-square items-end justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${c.bg} pt-4`}><div className="scale-[.7] transition group-hover:scale-[.76]"><Bottle {...visual[c.slug]} /></div></div><h3 className="mt-4 text-sm font-black text-[#092f59]">{c.title}</h3><p className="mt-1 text-[11px] text-slate-500">{c.sub}</p><span className="mt-3 inline-flex items-center gap-1 text-[11px] font-black text-blue-700">Shop now <ArrowRight className="h-3 w-3" /></span></a>)}</div></section>

    <section id="products" className="scroll-mt-20 bg-[#f4faff] px-4 py-14 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><div className="flex items-end justify-between"><div><h2 className="text-3xl font-black text-[#092f59] sm:text-4xl">Best Sellers</h2><p className="mt-2 text-sm text-slate-500 sm:text-base">Our most loved everyday essentials</p></div><button onClick={() => navigate("/products")} className="hidden items-center gap-1 text-sm font-black text-blue-700 sm:flex">View All Products <ArrowRight className="h-4 w-4" /></button></div><div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{featured.map((p) => { const v = visual[p.slug] ?? visual["floor-cleaner"]; const d = p.mrp && p.mrp > p.price ? Math.round(((p.mrp-p.price)/p.mrp)*100) : 0; return <article key={p.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:shadow-xl"><div className="relative flex h-64 items-center justify-center bg-gradient-to-b from-white to-slate-50"><span className="absolute left-4 top-4 rounded-full bg-green-600 px-3 py-1 text-[10px] font-black text-white">{d >= 20 ? "BEST SELLER" : "POPULAR"}</span><button className="absolute right-4 top-4 rounded-full bg-white p-2 text-slate-400 shadow" aria-label="Wishlist"><Heart className="h-4 w-4" /></button><Bottle {...v} /></div><div className="p-5"><h3 className="font-black">{p.name}</h3><p className="mt-1 line-clamp-1 text-xs text-slate-500">{p.tagline}</p><div className="mt-4 flex items-center gap-2"><b className="text-xl">₹{p.price}</b>{d > 0 && <><span className="text-xs text-slate-400 line-through">₹{p.mrp}</span><span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-black text-green-700">{d}% OFF</span></>}</div><small className="text-[11px] text-slate-400">{p.uom}</small><button onClick={() => add(p)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0872d1] py-3 text-sm font-black text-white"><ShoppingCart className="h-4 w-4" /> Add to Cart</button></div></article> })}</div></div></section>

    <section id="why-us" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><div className="text-center"><h2 className="text-3xl font-black text-[#092f59] sm:text-4xl">Why Choose Urban Shine?</h2><p className="mt-2 text-sm text-slate-500 sm:text-base">Quality products for a cleaner and healthier tomorrow</p></div><div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{[{I:ShieldCheck,t:"Quality You Can Trust",s:"Every product is tested for safe & effective use.",b:"bg-green-600"},{I:Sparkles,t:"Made for Everyday Homes",s:"Practical solutions for modern living.",b:"bg-blue-600"},{I:Check,t:"Honest Pricing",s:"Great quality without unnecessary premium.",b:"bg-amber-500"},{I:ShoppingCart,t:"Easy Ordering",s:"Simple shopping with guest checkout.",b:"bg-pink-500"}].map(({I,t,s,b}) => <div key={t} className="flex items-start gap-4"><span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${b} text-white`}><I className="h-6 w-6" /></span><div><h3 className="text-sm font-black text-[#092f59]">{t}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{s}</p></div></div>)}</div></section>

    <section className="px-4 pb-14 sm:px-6 lg:px-8"><div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-[#dff5d9] via-[#eefbe7] to-[#e5f6ff] px-6 py-10 sm:px-10"><div className="relative z-20 max-w-lg"><p className="text-xs font-black uppercase tracking-[.25em] text-green-700">Everyday value</p><h2 className="mt-2 text-4xl font-black text-[#092f59]">Clean More. <span className="text-green-600">Spend Less.</span></h2><p className="mt-2 text-sm text-slate-600">Everyday essentials at prices you’ll love.</p><a href="#products" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-black text-white">Shop Now <ArrowRight className="h-4 w-4" /></a></div><div className="absolute bottom-0 right-10 hidden sm:flex"><div className="scale-[.5]"><Bottle {...visual["floor-cleaner"]} /></div><div className="-ml-10 scale-[.46]"><Bottle {...visual["dish-wash"]} /></div><div className="-ml-10 scale-[.5]"><Bottle {...visual["copper-cleaning-liquid"]} /></div><div className="-ml-10 scale-[.46]"><Bottle {...visual["hand-wash"]} /></div></div><div className="absolute right-6 top-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-600 text-center text-[10px] font-black text-white">SPECIAL<br /><span className="text-xl">OFFER</span></div></div></section>

    <footer id="footer" className="bg-[#062447] text-slate-300"><div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8"><div><div className="flex items-center gap-2"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-white"><Leaf className="h-5 w-5" /></span><b className="text-2xl text-white">Urban <span className="text-green-400">Shine</span></b></div><p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">Quality home, kitchen, cleaning and personal care essentials made for everyday living.</p></div><div><h4 className="mb-4 text-sm font-black text-white">Shop</h4><div className="space-y-3 text-sm"><a href="#products" className="block">Products</a><a href="#categories" className="block">Categories</a><button onClick={() => navigate("/cart")} className="block">Your Cart</button></div></div><div><h4 className="mb-4 text-sm font-black text-white">Support</h4><div className="space-y-3 text-sm"><p>Delivery in 3–5 working days</p><p>UPI payment on checkout</p><button onClick={() => navigate("/login")}>Staff login</button></div></div></div><div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">© 2026 Urban Shine. All rights reserved.</div></footer>
  </div>;
};
export default Storefront;
