import { useMemo, useState } from "react";
import { ArrowRight, CreditCard, Home, Leaf, ShieldCheck, ShoppingCart, Sparkles, Truck } from "lucide-react";
import StoreHeader from "@/components/store/StoreHeader";
import StoreFooter from "@/components/store/StoreFooter";
import ProductCard from "@/components/store/ProductCard";
import { useStoreProducts } from "@/hooks/useStoreProducts";
import { getProductImage } from "@/data/productImages";

const categoryConfig = [
  { label: "Household Cleaning", sub: "Floor Cleaner · Toilet Cleaner · Glass Cleaner", keywords: ["household", "floor", "toilet", "glass"], image: "floor-cleaner" },
  { label: "Kitchen Care", sub: "Dish Wash · Kitchen Cleaning", keywords: ["kitchen", "dish"], image: "dish-wash" },
  { label: "Laundry Care", sub: "Liquid Detergent · Detergent Powder", keywords: ["laundry", "detergent"], image: "liquid-detergent" },
  { label: "Personal Care", sub: "Hand Wash · Body Care", keywords: ["personal", "hand", "rose", "balm", "vaseline"], image: "hand-wash" },
  { label: "Specialty Care", sub: "Copper Cleaner · More", keywords: ["special", "copper", "acid", "phenyl"], image: "copper-cleaning-liquid" },
];

const Storefront = () => {
  const { data: products, isLoading } = useStoreProducts();
  const [category, setCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const categories = useMemo(() => ["All", ...Array.from(new Set((products ?? []).map((p) => p.category)))], [products]);
  const visibleProducts = (products ?? []).filter((p) => category === "All" || p.category === category);
  const featuredSlugs = ["floor-cleaner", "dish-wash", "copper-cleaning-liquid", "hand-wash"];
  const featured = featuredSlugs.map((slug) => products?.find((p) => p.slug === slug)).filter(Boolean) as NonNullable<typeof products>[number][];
  const fallback = (products ?? []).filter((p) => !featuredSlugs.includes(p.slug)).slice(0, Math.max(0, 4 - featured.length));
  const bestSellers = [...featured, ...fallback].slice(0, 4);

  const chooseCategory = (keywords: string[]) => {
    const match = categories.find((c) => keywords.some((keyword) => c.toLowerCase().includes(keyword)));
    if (match) setCategory(match);
    setShowAll(true);
    requestAnimationFrame(() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <StoreHeader />

      {/* Reference-style hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#eaf7ff] via-white to-[#eef9ed]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,.95),transparent_32%)]" />
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-green-100/60 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center lg:grid-cols-[0.9fr_1.1fr]">
          <div className="z-10 px-5 py-12 sm:px-8 lg:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#174d78] sm:text-sm">A cleaner • healthier • happier home</p>
            <h1 className="mt-5 text-[44px] font-black leading-[0.95] tracking-tight text-[#0b315b] sm:text-6xl lg:text-[64px]">CLEAN HOME.<span className="block text-[#218d42]">FRESH EVERY DAY.</span></h1>
            <p className="mt-5 max-w-xl text-base leading-6 text-[#315276] sm:text-lg sm:leading-7">High quality cleaning &amp; personal care products made for modern homes — effective, affordable and reliable.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#products" className="inline-flex items-center gap-2 rounded-lg bg-[#073b70] px-6 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:bg-[#052d55]">Shop Products <ArrowRight className="h-4 w-4" /></a>
              <a href="#categories" className="inline-flex items-center gap-2 rounded-lg border border-[#5b7895] bg-white px-6 py-3.5 text-sm font-extrabold text-[#073b70] hover:bg-slate-50">Explore Categories</a>
            </div>
          </div>

          <div className="relative h-[390px] overflow-hidden sm:h-[470px] lg:h-[500px]">
            <div className="absolute bottom-8 left-[8%] right-[8%] h-12 rounded-full bg-slate-900/15 blur-2xl" />
            <div className="absolute left-[6%] top-[14%] h-8 w-8 rounded-full border-2 border-white bg-white/70" />
            <div className="absolute left-[19%] top-[27%] h-4 w-4 rounded-full bg-white/90" />
            <div className="absolute right-[26%] top-[11%] h-6 w-6 rounded-full bg-green-200/80" />
            <div className="absolute right-[8%] top-[28%] h-12 w-12 rounded-full border-2 border-white bg-white/60" />
            <div className="absolute right-[4%] top-[16%] z-40 max-w-[145px] -rotate-3 text-right text-xl font-black leading-tight text-[#0b5b5c] sm:text-2xl">Small steps<br />for a cleaner<br /><span className="text-[#218d42]">tomorrow.</span></div>
            <div className="absolute bottom-0 left-[0%] z-20 w-[31%] sm:left-[3%] sm:w-[29%]"><img src={getProductImage("floor-cleaner")} alt="Urban Shine Floor Cleaner" className="w-full object-contain drop-shadow-2xl" /></div>
            <div className="absolute bottom-0 left-[22%] z-30 w-[31%] sm:left-[25%] sm:w-[28%]"><img src={getProductImage("copper-cleaning-liquid")} alt="Urban Shine Copper Cleaner" className="w-full object-contain drop-shadow-2xl" /></div>
            <div className="absolute bottom-0 left-[46%] z-20 w-[29%] sm:left-[49%] sm:w-[27%]"><img src={getProductImage("dish-wash")} alt="Urban Shine Dish Wash" className="w-full object-contain drop-shadow-2xl" /></div>
            <div className="absolute bottom-0 right-[0%] z-30 w-[30%] sm:right-[3%] sm:w-[28%]"><img src={getProductImage("hand-wash")} alt="Urban Shine Hand Wash" className="w-full object-contain drop-shadow-2xl" /></div>
          </div>
        </div>

        <div className="border-t border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-100 lg:grid-cols-4">
            {[
              { icon: Truck, title: "Fast Delivery", text: "3–5 working days" },
              { icon: ShieldCheck, title: "Quality Tested", text: "Safe & Reliable" },
              { icon: Leaf, title: "Skin Friendly", text: "Gentle Formulas" },
              { icon: CreditCard, title: "Guest Checkout", text: "Hassle Free" },
            ].map(({ icon: Icon, title, text }) => <div key={title} className="flex items-center gap-3 px-4 py-5 sm:justify-center"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e9f6ff] text-[#0b4b7d]"><Icon className="h-5 w-5" /></div><div><p className="text-sm font-black text-[#0b315b]">{title}</p><p className="text-[11px] text-slate-500">{text}</p></div></div>)}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="mb-8 text-center"><h2 className="text-3xl font-black tracking-tight text-[#0b315b] sm:text-4xl">Shop by Category</h2><p className="mt-1 text-sm text-slate-500 sm:text-base">Find the right product for every need</p></div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categoryConfig.map((item) => <button key={item.label} type="button" onClick={() => chooseCategory(item.keywords)} className="group rounded-xl border border-[#dce7ef] bg-white p-3 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mx-auto flex aspect-square max-w-[165px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#e9f7ff] to-[#effbee] p-3"><img src={getProductImage(item.image)} alt={`Urban Shine ${item.label}`} className="h-full w-full object-contain transition group-hover:scale-105" /></div>
            <h3 className="mt-3 text-sm font-black text-[#0b315b]">{item.label}</h3><p className="mt-1 min-h-[30px] text-[10px] leading-4 text-slate-500">{item.sub}</p><span className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-[#1474bd]">Shop now <ArrowRight className="h-3 w-3" /></span>
          </button>)}
        </div>
      </section>

      {/* Best Sellers */}
      <section id="products" className="scroll-mt-20 bg-[#f4faff] px-4 py-12 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4"><div><h2 className="text-3xl font-black tracking-tight text-[#0b315b] sm:text-4xl">Best Sellers</h2><p className="mt-1 text-sm text-slate-500 sm:text-base">Our most loved everyday essentials</p></div>{products && products.length > 4 && <button type="button" onClick={() => setShowAll((v) => !v)} className="hidden items-center gap-1 text-sm font-extrabold text-[#0872d1] sm:inline-flex">{showAll ? "Show Featured" : "View All Products"} <ArrowRight className="h-4 w-4" /></button>}</div>
          {isLoading ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-[430px] animate-pulse rounded-2xl bg-white" />)}</div> : <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{(showAll ? visibleProducts : bestSellers).map((product) => <ProductCard key={product.id} product={product} />)}</div>}
          {!isLoading && <div className="mt-7 flex flex-wrap justify-center gap-2">{categories.map((c) => <button key={c} type="button" onClick={() => { setCategory(c); setShowAll(true); }} className={`rounded-full border px-4 py-2 text-xs font-bold ${category === c && showAll ? "border-[#0872d1] bg-[#0872d1] text-white" : "border-slate-200 bg-white text-slate-600 hover:text-[#0872d1]"}`}>{c}</button>)}</div>}
        </div>
      </section>

      {/* Why choose */}
      <section id="why-us" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="mb-9 text-center"><h2 className="text-3xl font-black tracking-tight text-[#0b315b] sm:text-4xl">Why Choose Urban Shine?</h2><p className="mt-1 text-sm text-slate-500 sm:text-base">Quality products for a cleaner and healthier tomorrow</p></div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{[
          { icon: ShieldCheck, title: "Quality You Can Trust", text: "Every product is tested for safe & effective use.", cls: "bg-green-600" },
          { icon: Home, title: "Made for Everyday Homes", text: "Practical solutions for modern living.", cls: "bg-blue-600" },
          { icon: Sparkles, title: "Honest Pricing", text: "Great quality without unnecessary premium.", cls: "bg-amber-500" },
          { icon: ShoppingCart, title: "Easy Ordering", text: "Simple shopping with guest checkout.", cls: "bg-pink-500" },
        ].map(({ icon: Icon, title, text, cls }) => <div key={title} className="flex items-start gap-4"><div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${cls} text-white shadow-md`}><Icon className="h-6 w-6" /></div><div><h3 className="text-sm font-black text-[#0b315b]">{title}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{text}</p></div></div>)}</div>
      </section>

      {/* Promotional banner */}
      <section className="px-4 pb-12 sm:px-6 sm:pb-14"><div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-gradient-to-r from-[#dff5d9] via-[#eefbe7] to-[#e5f6ff] px-6 py-9 sm:px-10 sm:py-10">
        <div className="absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-white/70 blur-xl" /><div className="relative z-20 max-w-md"><h2 className="text-3xl font-black tracking-tight text-[#0b315b] sm:text-4xl">Clean More. <span className="text-[#218d42]">Spend Less.</span></h2><p className="mt-2 text-sm text-slate-600 sm:text-base">Everyday essentials at prices you’ll love.</p><a href="#products" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#159447] px-5 py-3 text-sm font-extrabold text-white shadow-lg hover:bg-[#107b39]">Shop Now <ArrowRight className="h-4 w-4" /></a></div>
        <div className="absolute bottom-0 right-[16%] hidden h-44 w-[46%] sm:block"><div className="absolute bottom-0 left-0 h-5 w-full rounded-full bg-slate-800/10 blur-xl" /><img src={getProductImage("floor-cleaner")} alt="Urban Shine Floor Cleaner" className="absolute bottom-0 left-0 h-40 w-28 object-contain drop-shadow-xl" /><img src={getProductImage("dish-wash")} alt="Urban Shine Dish Wash" className="absolute bottom-0 left-24 h-36 w-24 object-contain drop-shadow-xl" /><img src={getProductImage("copper-cleaning-liquid")} alt="Urban Shine Copper Cleaner" className="absolute bottom-0 left-44 h-40 w-24 object-contain drop-shadow-xl" /><img src={getProductImage("hand-wash")} alt="Urban Shine Hand Wash" className="absolute bottom-0 left-64 h-36 w-24 object-contain drop-shadow-xl" /></div>
        <div className="absolute right-5 top-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#159447] text-center text-[10px] font-black leading-tight text-white shadow-lg sm:right-8 sm:h-24 sm:w-24">UP TO<br /><span className="text-2xl">25%</span><br />OFF</div>
      </div></section>

      <StoreFooter />
    </div>
  );
};

export default Storefront;
