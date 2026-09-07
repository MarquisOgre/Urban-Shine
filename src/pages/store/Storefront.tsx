import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Home,
  Leaf,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
} from "lucide-react";
import StoreHeader from "@/components/store/StoreHeader";
import StoreFooter from "@/components/store/StoreFooter";
import ProductCard from "@/components/store/ProductCard";
import { useStoreProducts } from "@/hooks/useStoreProducts";
import { getProductImage } from "@/data/productImages";

const categoryConfig = [
  { label: "Household Cleaning", keywords: ["household", "floor", "toilet", "glass"], image: "floor-cleaner" },
  { label: "Kitchen Care", keywords: ["kitchen", "dish"], image: "dish-wash" },
  { label: "Laundry Care", keywords: ["laundry", "detergent"], image: "liquid-detergent" },
  { label: "Personal Care", keywords: ["personal", "hand", "rose", "balm", "vaseline"], image: "hand-wash" },
  { label: "Specialty Care", keywords: ["special", "copper", "acid", "phenyl"], image: "copper-cleaning-liquid" },
];

const Storefront = () => {
  const { data: products, isLoading } = useStoreProducts();
  const [category, setCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set((products ?? []).map((p) => p.category)))],
    [products]
  );

  const visible = (products ?? []).filter((p) => category === "All" || p.category === category);
  const featuredSlugs = ["floor-cleaner", "dish-wash", "copper-cleaning-liquid", "hand-wash"];
  const featured = featuredSlugs
    .map((slug) => products?.find((p) => p.slug === slug))
    .filter(Boolean) as NonNullable<typeof products>[number][];
  const fallback = (products ?? []).filter((p) => !featuredSlugs.includes(p.slug)).slice(0, 4 - featured.length);
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

      {/* Main hero */}
      <section className="relative overflow-hidden bg-[#eef9ff]">
        <div className="absolute -left-28 top-10 h-72 w-72 rounded-full bg-white/80 blur-3xl" />
        <div className="absolute right-[20%] top-0 h-64 w-64 rounded-full bg-green-100/70 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" />

        <div className="relative mx-auto grid min-h-[500px] max-w-7xl items-center px-4 py-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:py-8">
          <div className="relative z-10 max-w-xl py-6 lg:py-12">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/85 px-4 py-2 text-xs font-extrabold text-green-700 shadow-sm">
              <Sparkles className="h-4 w-4" /> CLEANING MADE SIMPLE
            </div>
            <h1 className="text-[46px] font-black leading-[0.94] tracking-[-0.04em] text-[#073b71] sm:text-6xl lg:text-[72px]">
              CLEAN HOME.
              <span className="block text-green-600">HAPPY LIFE.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
              Everyday cleaning, kitchen and personal care essentials — thoughtfully made for modern Indian homes.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#products" className="inline-flex items-center gap-2 rounded-full bg-[#073b71] px-7 py-3.5 text-sm font-black text-white shadow-xl shadow-blue-900/15 transition hover:-translate-y-0.5 hover:bg-[#052d58]">
                Shop Now <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#categories" className="inline-flex items-center rounded-full border-2 border-[#073b71]/15 bg-white px-7 py-3.5 text-sm font-black text-[#073b71] transition hover:border-[#073b71]/30 hover:bg-white/80">
                Explore Categories
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-slate-500">
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-600" /> Quality products</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-600" /> Honest pricing</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-600" /> Easy checkout</span>
            </div>
          </div>

          {/* Product hero composition */}
          <div className="relative mx-auto h-[390px] w-full max-w-[650px] sm:h-[460px] lg:h-[510px]">
            <div className="absolute bottom-8 left-1/2 h-16 w-[82%] -translate-x-1/2 rounded-full bg-slate-900/15 blur-2xl" />
            <div className="absolute left-[3%] top-[12%] h-20 w-20 rounded-full bg-white/75 shadow-sm" />
            <div className="absolute right-[9%] top-[8%] h-12 w-12 rounded-full bg-green-200/70" />
            <div className="absolute left-[7%] top-[40%] h-4 w-4 rounded-full bg-blue-300" />

            <div className="absolute bottom-3 left-[1%] z-20 w-[29%] sm:left-[4%] sm:w-[27%]">
              <img src={getProductImage("floor-cleaner")} alt="Urban Shine Floor Cleaner" className="w-full object-contain drop-shadow-2xl" />
            </div>
            <div className="absolute bottom-1 left-[23%] z-30 w-[31%] sm:left-[25%] sm:w-[28%]">
              <img src={getProductImage("dish-wash")} alt="Urban Shine Dish Wash" className="w-full object-contain drop-shadow-2xl" />
            </div>
            <div className="absolute bottom-2 left-[47%] z-20 w-[28%] sm:left-[49%] sm:w-[27%]">
              <img src={getProductImage("copper-cleaning-liquid")} alt="Urban Shine Copper Cleaner" className="w-full object-contain drop-shadow-2xl" />
            </div>
            <div className="absolute bottom-3 right-[0%] z-30 w-[29%] sm:right-[3%] sm:w-[27%]">
              <img src={getProductImage("hand-wash")} alt="Urban Shine Hand Wash" className="w-full object-contain drop-shadow-2xl" />
            </div>

            <div className="absolute right-[3%] top-[22%] z-40 rounded-2xl bg-white px-4 py-3 text-right shadow-xl shadow-slate-900/10 sm:right-[5%] sm:px-5 sm:py-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Everyday essentials</p>
              <p className="mt-1 text-sm font-black leading-tight text-[#073b71] sm:text-base">Clean better.<br /><span className="text-green-600">Live better.</span></p>
            </div>
          </div>
        </div>

        {/* Benefits strip */}
        <div className="border-t border-white/80 bg-white/95">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-100 px-4 sm:px-6 lg:grid-cols-4">
            {[
              { icon: Truck, title: "Fast Delivery", text: "3–5 working days" },
              { icon: ShieldCheck, title: "Quality Assured", text: "Reliable everyday care" },
              { icon: Leaf, title: "Made for Homes", text: "Simple & practical" },
              { icon: CreditCard, title: "Easy Checkout", text: "Guest checkout available" },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-center gap-3 px-3 py-5 sm:px-5 lg:py-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eef7ff] text-[#073b71]"><Icon className="h-5 w-5" /></div>
                <div><p className="text-xs font-black text-[#073b71] sm:text-sm">{title}</p><p className="mt-0.5 text-[10px] text-slate-500 sm:text-xs">{text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-green-600">Explore</p>
            <h2 className="mt-1 text-3xl font-black tracking-tight text-[#073b71] sm:text-4xl">Shop by Category</h2>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">Everything you need for a cleaner everyday life.</p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categoryConfig.map((item) => (
            <button key={item.label} type="button" onClick={() => chooseCategory(item.keywords)} className="group text-center">
              <div className="mx-auto flex aspect-square max-w-[175px] items-center justify-center overflow-hidden rounded-full border border-slate-100 bg-[#f4faff] p-3 shadow-sm transition duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                <img src={getProductImage(item.image)} alt={`Urban Shine ${item.label}`} className="h-full w-full object-contain transition duration-300 group-hover:scale-105" />
              </div>
              <h3 className="mt-4 text-sm font-black text-[#073b71]">{item.label}</h3>
              <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-green-600">Shop now <ArrowRight className="h-3 w-3" /></span>
            </button>
          ))}
        </div>
      </section>

      {/* Best sellers */}
      <section id="products" className="scroll-mt-20 bg-[#f6fbff] px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-green-600">Customer favourites</p>
              <h2 className="mt-1 text-3xl font-black tracking-tight text-[#073b71] sm:text-4xl">Best Sellers</h2>
              <p className="mt-2 text-sm text-slate-500 sm:text-base">Our most-loved Urban Shine essentials.</p>
            </div>
            {products && products.length > 4 && (
              <button type="button" onClick={() => setShowAll((value) => !value)} className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-[#073b71] shadow-sm sm:inline-flex">
                {showAll ? "Show Featured" : "View All"} <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="mt-8">
            {isLoading ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-[430px] animate-pulse rounded-3xl bg-white" />)}</div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {(showAll ? visible : bestSellers).map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            )}
          </div>

          {!isLoading && categories.length > 1 && (
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {categories.map((c) => (
                <button key={c} type="button" onClick={() => { setCategory(c); setShowAll(true); }} className={`rounded-full px-4 py-2 text-xs font-bold transition ${category === c && showAll ? "bg-[#073b71] text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-[#073b71]/30 hover:text-[#073b71]"}`}>
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why choose us */}
      <section id="why-us" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-green-600">Why Urban Shine</p>
            <h2 className="mt-2 text-3xl font-black leading-tight tracking-tight text-[#073b71] sm:text-5xl">Good products.<br /><span className="text-green-600">Better everyday living.</span></h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">We focus on practical products, clear pricing and a shopping experience that stays simple.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: ShieldCheck, title: "Quality You Can Trust", text: "Reliable products selected for everyday use.", cls: "bg-green-100 text-green-700" },
              { icon: Home, title: "Made for Everyday Homes", text: "Useful essentials for real homes and routines.", cls: "bg-blue-100 text-blue-700" },
              { icon: Sparkles, title: "Honest Pricing", text: "Good value without unnecessary premium pricing.", cls: "bg-amber-100 text-amber-700" },
              { icon: ShoppingCart, title: "Easy Ordering", text: "Browse, add to cart and checkout with ease.", cls: "bg-pink-100 text-pink-600" },
            ].map(({ icon: Icon, title, text, cls }) => (
              <div key={title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${cls}`}><Icon className="h-5 w-5" /></div>
                <h3 className="mt-4 text-sm font-black text-[#073b71]">{title}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional CTA */}
      <section className="px-4 pb-14 sm:px-6 sm:pb-16">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#087c57] px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
          <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-white/10" />
          <div className="absolute -bottom-32 left-[38%] h-80 w-80 rounded-full bg-lime-300/10" />
          <div className="relative z-10 max-w-lg">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-green-100">Urban Shine essentials</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-5xl">Clean More.<br /><span className="text-lime-200">Spend Less.</span></h2>
            <p className="mt-3 text-sm leading-6 text-green-50 sm:text-base">Stock up on the products your home uses every day.</p>
            <a href="#products" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-black text-[#087c57] shadow-xl hover:bg-green-50">Shop Products <ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="absolute bottom-0 right-[3%] hidden h-[230px] w-[52%] md:block">
            <img src={getProductImage("floor-cleaner")} alt="Urban Shine Floor Cleaner" className="absolute bottom-0 left-0 h-52 w-36 object-contain drop-shadow-2xl" />
            <img src={getProductImage("dish-wash")} alt="Urban Shine Dish Wash" className="absolute bottom-0 left-[24%] h-48 w-36 object-contain drop-shadow-2xl" />
            <img src={getProductImage("copper-cleaning-liquid")} alt="Urban Shine Copper Cleaner" className="absolute bottom-0 left-[47%] h-52 w-36 object-contain drop-shadow-2xl" />
            <img src={getProductImage("hand-wash")} alt="Urban Shine Hand Wash" className="absolute bottom-0 right-0 h-48 w-36 object-contain drop-shadow-2xl" />
          </div>
        </div>
      </section>

      <StoreFooter />
    </div>
  );
};

export default Storefront;
