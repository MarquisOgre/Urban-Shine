import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Leaf,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import StoreHeader from "@/components/store/StoreHeader";
import StoreFooter from "@/components/store/StoreFooter";
import ProductCard from "@/components/store/ProductCard";
import { useStoreProducts } from "@/hooks/useStoreProducts";
import { getProductImage } from "@/data/productImages";

const categoryImages: Record<string, string> = {
  "Household Cleaning": "floor-cleaner",
  "Kitchen Care": "dish-wash",
  "Laundry Care": "detergent-powder",
  "Personal Care": "rose-water",
  "Specialty Care": "copper-cleaning-liquid",
};

const Storefront = () => {
  const { data: products, isLoading } = useStoreProducts();
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set((products ?? []).map((p) => p.category)))],
    [products]
  );

  const visible = (products ?? []).filter(
    (p) => category === "All" || p.category === category
  );

  const featuredProducts = (products ?? []).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-900">
      <StoreHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-lime-100/70 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-blue-100/70 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-lime-50 border border-lime-100 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-lime-700">
              <Sparkles className="h-3.5 w-3.5" /> Everyday essentials
            </span>

            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.02] tracking-tight text-slate-950">
              Clean home.
              <span className="block text-blue-700">Fresh every day.</span>
            </h1>

            <p className="mt-5 max-w-lg text-base sm:text-lg leading-7 text-slate-600">
              High-quality cleaning and personal care products made for modern homes —
              effective, affordable and reliable.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800 transition-colors"
              >
                Shop Products <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#categories"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 hover:border-blue-200 hover:text-blue-700 transition-colors"
              >
                Explore Categories
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-slate-500">
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-lime-600" /> Guest checkout</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-lime-600" /> Honest pricing</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-lime-600" /> Quality tested</span>
            </div>
          </div>

          <div className="relative min-h-[420px] rounded-[32px] bg-gradient-to-br from-blue-50 via-white to-lime-50 border border-slate-100 shadow-sm overflow-hidden">
            <div className="absolute inset-x-8 bottom-7 h-24 rounded-full bg-blue-900/10 blur-2xl" />
            <div className="absolute top-7 right-7 rounded-2xl bg-white/90 backdrop-blur border border-white px-4 py-3 shadow-lg">
              <p className="text-[10px] uppercase tracking-widest font-extrabold text-slate-400">Urban Shine</p>
              <p className="mt-1 text-sm font-black text-slate-900">Made for everyday homes</p>
            </div>

            <div className="absolute left-[8%] bottom-7 w-[29%] sm:w-[25%]">
              <img src={getProductImage("floor-cleaner")} alt="Urban Shine Floor Cleaner" className="w-full h-auto object-contain drop-shadow-2xl" />
            </div>
            <div className="absolute left-[30%] bottom-10 w-[31%] sm:w-[28%]">
              <img src={getProductImage("dish-wash")} alt="Urban Shine Dish Wash" className="w-full h-auto object-contain drop-shadow-2xl" />
            </div>
            <div className="absolute left-[53%] bottom-8 w-[27%] sm:w-[25%]">
              <img src={getProductImage("hand-wash")} alt="Urban Shine Hand Wash" className="w-full h-auto object-contain drop-shadow-2xl" />
            </div>
            <div className="absolute right-[4%] bottom-8 w-[27%] sm:w-[24%]">
              <img src={getProductImage("liquid-detergent")} alt="Urban Shine Liquid Detergent" className="w-full h-auto object-contain drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
          {[
            { icon: Truck, title: "Fast Delivery", text: "3–5 working days" },
            { icon: ShieldCheck, title: "Quality Tested", text: "Every batch checked" },
            { icon: Leaf, title: "Skin Friendly", text: "Balanced formulations" },
            { icon: Sparkles, title: "Guest Checkout", text: "No sign-up needed" },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="h-11 w-11 shrink-0 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-extrabold text-sm text-slate-900">{title}</p>
                <p className="mt-0.5 text-xs text-slate-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 sm:pt-18">
        <div className="flex items-end justify-between gap-4 mb-7">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-lime-700">Shop smarter</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">Shop by Category</h2>
            <p className="mt-2 text-sm text-slate-500">Everything you need for a cleaner, fresher everyday life.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(categoryImages).map(([title, slug]) => (
            <button
              key={title}
              type="button"
              onClick={() => {
                const match = categories.find((c) => c.toLowerCase().includes(title.split(" ")[0].toLowerCase()));
                if (match) setCategory(match);
                document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group rounded-2xl border border-slate-200 bg-white p-3 text-left hover:-translate-y-1 hover:shadow-lg hover:border-blue-100 transition-all"
            >
              <div className="aspect-[1.15] rounded-xl bg-slate-50 overflow-hidden flex items-center justify-center">
                <img src={getProductImage(slug)} alt={`Urban Shine ${title}`} className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300" />
              </div>
              <p className="px-1 pt-3 pb-1 text-sm font-extrabold text-slate-900">{title}</p>
              <span className="px-1 text-xs font-semibold text-blue-700">Shop now →</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700">Customer favourites</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">Best Sellers</h2>
            <p className="mt-2 text-sm text-slate-500">Our most-loved everyday products from Urban Shine.</p>
          </div>
          <Link to="#products" className="text-sm font-extrabold text-blue-700 hover:text-blue-800">View all products →</Link>
        </div>

        {isLoading ? (
          <div className="grid gap-5 mt-8 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-80 rounded-2xl bg-white animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid gap-5 mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
                    category === c
                      ? "bg-blue-700 text-white border-blue-700"
                      : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="mt-7 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {visible.slice(4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Why Urban Shine */}
      <section id="why-us" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="rounded-[30px] bg-slate-950 text-white overflow-hidden">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 p-7 sm:p-10 lg:p-12">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-lime-300">Why Urban Shine</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">Good products. Honest value.</h2>
              <p className="mt-4 text-sm leading-6 text-slate-300 max-w-md">
                Urban Shine keeps everyday shopping simple: useful products, dependable quality and pricing that makes sense.
              </p>
              <a href="#products" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-lime-400 px-5 py-3 text-sm font-black text-slate-950 hover:bg-lime-300 transition-colors">
                Shop Urban Shine <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ["01", "Quality You Can Trust", "Reliable formulations made for daily use."],
                ["02", "Made for Everyday Homes", "Practical products for real household needs."],
                ["03", "Honest Pricing", "Good value without unnecessary markup."],
                ["04", "Easy Ordering", "Simple shopping with guest checkout."],
              ].map(([number, title, text]) => (
                <div key={number} className="rounded-2xl bg-white/5 border border-white/10 p-5">
                  <span className="text-xs font-black text-lime-300">{number}</span>
                  <h3 className="mt-4 font-extrabold text-white">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StoreFooter />
    </div>
  );
};

export default Storefront;
