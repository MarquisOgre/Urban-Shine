import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
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

  const visible = (products ?? []).filter(
    (p) => category === "All" || p.category === category
  );

  const bestSellerSlugs = ["floor-cleaner", "dish-wash", "copper-cleaning-liquid", "hand-wash"];
  const featuredProducts = bestSellerSlugs
    .map((slug) => products?.find((p) => p.slug === slug))
    .filter(Boolean) as NonNullable<typeof products>[number][];
  const fallbackFeatured = (products ?? []).filter((p) => !bestSellerSlugs.includes(p.slug)).slice(0, 4 - featuredProducts.length);
  const bestSellers = [...featuredProducts, ...fallbackFeatured].slice(0, 4);

  const chooseCategory = (keywords: string[]) => {
    const match = categories.find((c) => {
      const value = c.toLowerCase();
      return keywords.some((keyword) => value.includes(keyword));
    });
    if (match) setCategory(match);
    setShowAll(true);
    requestAnimationFrame(() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <StoreHeader />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-r from-[#f5fbff] via-white to-[#f2fbf2]">
        <div className="pointer-events-none absolute -left-16 top-20 h-40 w-40 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="pointer-events-none absolute right-8 top-8 h-52 w-52 rounded-full bg-lime-100/70 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
          <div className="z-10 max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-800 sm:text-sm">
              A cleaner • healthier • happier home
            </p>
            <h1 className="mt-5 text-4xl font-black leading-[0.98] tracking-tight text-[#082d57] sm:text-5xl lg:text-[62px]">
              CLEAN HOME.
              <span className="block text-green-600">FRESH EVERY DAY.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-6 text-slate-600 sm:text-lg sm:leading-7">
              High quality cleaning &amp; personal care products made for modern homes — effective, affordable and reliable.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#products" className="inline-flex items-center gap-2 rounded-xl bg-[#073b71] px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-blue-900/15 hover:bg-blue-900">
                Shop Products <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#categories" className="inline-flex items-center gap-2 rounded-xl border border-blue-300 bg-white px-6 py-3.5 text-sm font-extrabold text-[#073b71] hover:bg-blue-50">
                Explore Categories
              </a>
            </div>
          </div>

          <div className="relative min-h-[350px] overflow-hidden rounded-[32px] bg-gradient-to-br from-white via-blue-50/70 to-green-50/80 lg:min-h-[430px]">
            <div className="absolute bottom-5 left-8 right-8 h-14 rounded-full bg-slate-900/10 blur-2xl" />
            <div className="absolute left-[10%] top-[17%] h-8 w-8 rounded-full border-2 border-white bg-blue-100/60 shadow-sm" />
            <div className="absolute right-[13%] top-[15%] h-5 w-5 rounded-full bg-green-200/70" />
            <div className="absolute right-[7%] top-[31%] h-12 w-12 rounded-full border-2 border-white bg-white/60 shadow-sm" />

            <div className="absolute bottom-5 left-[3%] w-[29%] sm:w-[25%] lg:w-[27%]">
              <img src={getProductImage("floor-cleaner")} alt="Urban Shine Floor Cleaner" className="w-full object-contain drop-shadow-2xl" />
            </div>
            <div className="absolute bottom-7 left-[25%] w-[29%] sm:w-[25%] lg:w-[27%]">
              <img src={getProductImage("dish-wash")} alt="Urban Shine Dish Wash" className="w-full object-contain drop-shadow-2xl" />
            </div>
            <div className="absolute bottom-6 left-[48%] w-[28%] sm:w-[24%] lg:w-[26%]">
              <img src={getProductImage("copper-cleaning-liquid")} alt="Urban Shine Glass Cleaner" className="w-full object-contain drop-shadow-2xl" />
            </div>
            <div className="absolute bottom-5 right-[1%] w-[29%] sm:w-[25%] lg:w-[27%]">
              <img src={getProductImage("hand-wash")} alt="Urban Shine Hand Wash" className="w-full object-contain drop-shadow-2xl" />
            </div>
            <div className="absolute right-5 top-5 max-w-[155px] rotate-[-3deg] text-right text-lg font-black leading-tight text-[#0c5264] sm:text-xl">
              Small steps<br />for a cleaner<br /><span className="text-green-600">tomorrow.</span>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="border-t border-slate-200/70 bg-white/90">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-5 sm:px-6 lg:grid-cols-4 lg:gap-8">
            {[
              { icon: Truck, title: "Fast Delivery", text: "3–5 working days" },
              { icon: ShieldCheck, title: "Quality Tested", text: "Safe & Reliable" },
              { icon: Leaf, title: "Skin Friendly", text: "Gentle Formulas" },
              { icon: CreditCard, title: "Guest Checkout", text: "Hassle Free" },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-black text-[#082d57]">{title}</p>
                  <p className="text-xs text-slate-500">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="mb-7 text-center">
          <h2 className="text-3xl font-black tracking-tight text-[#082d57] sm:text-4xl">Shop by Category</h2>
          <p className="mt-1 text-sm text-slate-500 sm:text-base">Find the right product for every need</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {categoryConfig.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => chooseCategory(item.keywords)}
              className="group rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="mx-auto flex aspect-square max-w-[150px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-50 to-green-50 p-2">
                <img src={getProductImage(item.image)} alt={`Urban Shine ${item.label}`} className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105" />
              </div>
              <h3 className="mt-3 text-sm font-black text-[#082d57]">{item.label}</h3>
              <p className="mt-1 text-[11px] font-medium text-slate-500">Shop now <span className="text-blue-700">›</span></p>
            </button>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section id="products" className="scroll-mt-20 bg-[#f5faff] px-4 py-12 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-black tracking-tight text-[#082d57] sm:text-4xl">Best Sellers</h2>
              <p className="mt-1 text-sm text-slate-500 sm:text-base">Our most loved everyday essentials</p>
            </div>
            {products && products.length > 4 && (
              <button type="button" onClick={() => setShowAll((value) => !value)} className="hidden text-sm font-extrabold text-blue-700 hover:text-blue-900 sm:block">
                {showAll ? "Show Best Sellers" : "View All Products"} <ArrowRight className="ml-1 inline h-4 w-4" />
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-[430px] animate-pulse rounded-2xl border border-slate-200 bg-white" />)}
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {(showAll ? visible : bestSellers).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => { setCategory(c); setShowAll(true); }}
                    className={`rounded-full border px-4 py-2 text-xs font-bold transition-colors ${category === c && showAll ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Why Urban Shine */}
      <section id="why-us" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-black tracking-tight text-[#082d57] sm:text-4xl">Why Choose Urban Shine?</h2>
          <p className="mt-1 text-sm text-slate-500 sm:text-base">Quality products for a cleaner and healthier tomorrow</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, title: "Quality You Can Trust", text: "Every product is tested for safe & effective use.", cls: "bg-green-100 text-green-700" },
            { icon: Home, title: "Made for Everyday Homes", text: "Practical solutions for modern living.", cls: "bg-blue-100 text-blue-700" },
            { icon: Sparkles, title: "Honest Pricing", text: "Great quality without unnecessary premium.", cls: "bg-amber-100 text-amber-700" },
            { icon: ShoppingCart, title: "Easy Ordering", text: "Simple shopping with guest checkout.", cls: "bg-pink-100 text-pink-600" },
          ].map(({ icon: Icon, title, text, cls }) => (
            <div key={title} className="flex gap-4">
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${cls}`}><Icon className="h-6 w-6" /></div>
              <div><h3 className="text-sm font-black text-[#082d57]">{title}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{text}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* Offer banner */}
      <section className="px-4 pb-12 sm:px-6 sm:pb-14">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-green-50 via-lime-50 to-blue-50 px-6 py-8 sm:px-10 sm:py-10">
          <div className="relative z-10 max-w-md">
            <p className="text-3xl font-black tracking-tight text-[#082d57] sm:text-4xl">Clean More. <span className="text-green-600">Spend Less.</span></p>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">Everyday essentials at prices you’ll love.</p>
            <a href="#products" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg hover:bg-green-700">Shop Now <ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="absolute bottom-0 right-[18%] hidden h-40 w-[42%] sm:block">
            <div className="absolute inset-x-0 bottom-0 h-7 rounded-full bg-slate-900/10 blur-xl" />
            <img src={getProductImage("floor-cleaner")} alt="Urban Shine Floor Cleaner" className="absolute bottom-0 left-0 h-36 w-28 object-contain drop-shadow-xl" />
            <img src={getProductImage("dish-wash")} alt="Urban Shine Dish Wash" className="absolute bottom-0 left-24 h-32 w-24 object-contain drop-shadow-xl" />
            <img src={getProductImage("copper-cleaning-liquid")} alt="Urban Shine Glass Cleaner" className="absolute bottom-0 left-44 h-36 w-24 object-contain drop-shadow-xl" />
            <img src={getProductImage("hand-wash")} alt="Urban Shine Hand Wash" className="absolute bottom-0 left-64 h-32 w-24 object-contain drop-shadow-xl" />
          </div>
          <div className="absolute right-5 top-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-600 text-center text-xs font-black leading-tight text-white shadow-lg sm:right-8 sm:h-24 sm:w-24">UP TO<br /><span className="text-xl">25%</span><br />OFF</div>
        </div>
      </section>

      <StoreFooter />
    </div>
  );
};

export default Storefront;
