import { ArrowRight, Check, Facebook, Heart, Instagram, Leaf, Menu, Search, ShoppingCart, ShieldCheck, Sparkles, Truck, UserRound, Youtube } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { useStoreProducts } from "@/hooks/useStoreProducts";
import { getProductImage } from "@/data/productImages";
import heroImage from "@/assets/hero.png";
import promoBanner from "@/assets/promo-banner.png";

const categories = [
  ["Household Cleaning", "Floor Cleaner · Toilet Cleaner · Phenyl", "floor-cleaner", "bg-[#e8f7ff]", ["floor-cleaner", "toilet-cleaner", "phenyl"]],
  ["Kitchen Care", "Dish Wash · Soap Oil · Kitchen Cleaning", "dish-wash", "bg-[#eaf9e8]", ["dish-wash", "soap-oil"]],
  ["Laundry Care", "Liquid Detergent · Detergent Powder", "liquid-detergent", "bg-[#fff0f7]", ["liquid-detergent", "detergent-powder"]],
  ["Personal Care", "Hand Wash · Vaseline · Balm · Rose Water", "hand-wash", "bg-[#fff3e7]", ["hand-wash", "vaseline", "zandu-balm", "rose-water"]],
  ["Specialty Care", "Copper Cleaner · Acid Cleaner", "copper-cleaning-liquid", "bg-[#f0eaff]", ["copper-cleaning-liquid", "acid"]],
] as const;

const benefits = [
  [Truck, "Fast Delivery", "Across India"],
  [ShieldCheck, "Quality Tested", "Safe & Reliable"],
  [Leaf, "Skin Friendly", "Gentle Formulas"],
  [ShoppingCart, "Guest Checkout", "Hassle Free"],
] as const;

const whyUs = [
  [ShieldCheck, "Quality You Can Trust", "Every product is tested for safe & effective use.", "bg-green-600"],
  [Sparkles, "Made for Everyday Homes", "Practical solutions for modern living.", "bg-blue-500"],
  [Check, "Honest Pricing", "Great quality without unnecessary premium.", "bg-amber-400"],
  [ShoppingCart, "Easy Ordering", "Simple shopping with guest checkout.", "bg-pink-500"],
] as const;

const Storefront = () => {
  const navigate = useNavigate();
  const { count, addItem } = useCart();
  const { data: products = [] } = useStoreProducts();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const featuredSlugs = ["floor-cleaner", "dish-wash", "copper-cleaning-liquid", "hand-wash"];
  const featured = featuredSlugs.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean) as typeof products;
  const selectedCategory = categories.find(([title]) => title === activeCategory);
  const visibleProducts = activeCategory && selectedCategory ? products.filter((product) => selectedCategory[4].includes(product.slug as never)) : showAllProducts ? products : featured;

  const scrollToProducts = () => window.requestAnimationFrame(() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  const selectCategory = (title: string) => { setShowAllProducts(false); setActiveCategory((current) => current === title ? null : title); scrollToProducts(); };
  const showAll = () => { setActiveCategory(null); setShowAllProducts(true); scrollToProducts(); };
  const showBestSellers = () => { setActiveCategory(null); setShowAllProducts(false); scrollToProducts(); };
  const add = (product: (typeof products)[number]) => { addItem({ slug: product.slug, name: product.name, uom: product.uom, price: product.price }); toast.success(`${product.name} added to cart`); };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-[68px] max-w-[1530px] items-center gap-7 px-5 lg:px-10">
          <button className="lg:hidden" aria-label="Menu"><Menu className="h-6 w-6 text-[#092f59]" /></button>
          <a href="#home" className="flex shrink-0 items-center"><img src="/Logo.png" alt="Urban Shine" className="h-12 w-auto object-contain" /></a>
          <nav className="hidden items-center gap-2 lg:flex">
            <a href="#home" className="rounded-full bg-[#edf5ff] px-5 py-2.5 text-sm font-black text-blue-700">Home</a>
            <button onClick={showAll} className="rounded-full px-4 py-2.5 text-sm font-bold text-[#092f59]">Products</button>
            <a href="#categories" className="rounded-full px-4 py-2.5 text-sm font-bold text-[#092f59]">Categories</a>
            <a href="#why-us" className="rounded-full px-4 py-2.5 text-sm font-bold text-[#092f59]">About</a>
            <a href="#footer" className="rounded-full px-4 py-2.5 text-sm font-bold text-[#092f59]">Contact</a>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden h-10 w-[260px] items-center gap-2 rounded-full bg-[#f1f5f9] px-4 md:flex"><Search className="h-4 w-4 text-[#6d8299]" /><span className="text-xs text-[#8a9aac]">Search products...</span></div>
            <button aria-label="Account" className="hidden h-10 w-10 items-center justify-center text-[#092f59] sm:flex"><UserRound className="h-5 w-5" /></button>
            <button onClick={() => navigate("/cart")} aria-label="Cart" className="relative flex h-10 w-10 items-center justify-center text-[#092f59]"><ShoppingCart className="h-5 w-5" />{count > 0 && <span className="absolute right-0 top-0 min-w-5 rounded-full bg-green-600 px-1.5 py-0.5 text-[10px] font-black text-white">{count}</span>}</button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="relative isolate h-[500px] overflow-hidden bg-[#eaf7ff] sm:h-[520px] lg:h-[540px]">
          <img src={heroImage} alt="Urban Shine cleaning products" className="absolute inset-0 z-0 h-full w-full object-cover object-right" />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[57%] bg-gradient-to-r from-[#eaf7ff] via-[#eaf7ff]/96 via-[72%] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-[38%] z-10 w-[22%] bg-gradient-to-r from-[#eaf7ff]/90 to-transparent" />
          <div className="relative z-30 mx-auto h-full max-w-[1530px] px-5 lg:px-10">
            <div className="flex h-full max-w-[600px] flex-col justify-center">
              <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#0b4b7f] sm:text-sm">A CLEANER • HEALTHIER • HAPPIER HOME</p>
              <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.05em] text-[#073f76] sm:text-6xl lg:text-[68px]">CLEAN HOME.<br /><span className="text-green-600">FRESH EVERY DAY.</span></h1>
              <p className="mt-5 max-w-[520px] text-sm font-medium leading-6 text-[#3f5872] sm:text-base">High quality cleaning & personal care products made for modern homes — effective, affordable and reliable.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button onClick={showAll} className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#073f76] px-7 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#052f59]">Shop Products <ArrowRight className="h-4 w-4" /></button>
                <a href="#categories" className="inline-flex h-12 items-center rounded-lg border-2 border-[#073f76] bg-white px-7 text-sm font-black text-[#073f76] shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50">Explore Categories</a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-100 bg-white"><div className="mx-auto grid max-w-[1530px] grid-cols-2 lg:grid-cols-4">{benefits.map(([Icon, title, subtitle]) => <div key={title} className="flex items-center justify-center gap-3 border-r border-slate-100 px-3 py-4 last:border-r-0"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eaf6ff] text-[#0b4b7f]"><Icon className="h-5 w-5" /></span><span><b className="block text-[12px] font-black text-[#092f59]">{title}</b><small className="text-[10px] text-slate-500">{subtitle}</small></span></div>)}</div></section>

        <section id="categories" className="mx-auto max-w-[1530px] px-5 py-9 lg:px-10">
          <div className="text-center"><h2 className="text-[29px] font-black tracking-[-.03em] text-[#092f59]">Shop by Category</h2><p className="mt-1 text-sm text-[#58708b]">Find the right product for every need</p></div>
          <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-5">{categories.map(([title, subtitle, slug, bg]) => { const active = activeCategory === title; return <button type="button" onClick={() => selectCategory(title)} key={title} className={`group rounded-xl border bg-white p-2.5 text-center shadow-[0_3px_14px_rgba(25,64,95,.04)] transition hover:-translate-y-1 hover:shadow-lg ${active ? "border-green-500 ring-2 ring-green-100" : "border-[#d9e5ef]"}`}><div className={`flex h-[150px] items-end justify-center overflow-hidden rounded-xl ${bg}`}><img src={getProductImage(slug)} alt={title} className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105" /></div><h3 className="mt-3 text-[13px] font-black text-[#092f59]">{title}</h3><p className="mt-1 min-h-8 text-[10px] leading-4 text-[#55708e]">{subtitle}</p><span className={`mt-2 inline-flex items-center gap-1 text-[10px] font-black ${active ? "text-green-700" : "text-blue-700"}`}>{active ? "Showing products" : "Shop now"} <ArrowRight className="h-3 w-3" /></span></button>; })}</div>
        </section>

        <section id="products" className="scroll-mt-16 bg-[#f2f9ff] px-5 py-8 lg:px-10"><div className="mx-auto max-w-[1530px]"><div className="flex items-end justify-between gap-4"><div><h2 className="text-[29px] font-black tracking-[-.03em] text-[#092f59]">{activeCategory ? activeCategory : showAllProducts ? "All Products" : "Best Sellers"}</h2><p className="mt-1 text-sm text-[#58708b]">{activeCategory ? "Products in this category" : showAllProducts ? `${products.length} products available` : "Our most loved everyday essentials"}</p></div><div className="flex items-center gap-4">{activeCategory && <button onClick={showBestSellers} className="text-xs font-black text-green-700">← Show Best Sellers</button>}{!showAllProducts && <button onClick={showAll} className="hidden items-center gap-1 text-sm font-black text-blue-700 sm:flex">View All Products <ArrowRight className="h-4 w-4" /></button>}{showAllProducts && <button onClick={showBestSellers} className="text-sm font-black text-blue-700">Show Best Sellers</button>}</div></div>{visibleProducts.length > 0 ? <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{visibleProducts.map((product, index) => { const discount = product.mrp && product.mrp > product.price ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0; const badge = activeCategory ? "CATEGORY" : showAllProducts ? "PRODUCT" : index === 3 ? "NEW" : index === 1 ? "POPULAR" : "BEST SELLER"; return <article key={product.id} className="overflow-hidden rounded-xl border border-[#dbe7f0] bg-white shadow-[0_3px_14px_rgba(25,64,95,.05)] transition hover:-translate-y-1 hover:shadow-lg"><div className="relative flex h-[205px] items-center justify-center bg-gradient-to-b from-white to-[#f8fbfd]"><span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[9px] font-black text-white ${badge === "NEW" ? "bg-pink-500" : badge === "POPULAR" ? "bg-blue-600" : "bg-green-600"}`}>{badge}</span><button className="absolute right-3 top-3 rounded-full bg-white p-1.5 text-[#577594] shadow-sm" aria-label="Wishlist"><Heart className="h-4 w-4" /></button><img src={getProductImage(product.slug)} alt={product.name} className="h-[190px] w-[82%] object-contain transition-transform duration-300 hover:scale-105" /></div><div className="p-3.5"><h3 className="text-[13px] font-black text-[#092f59]">{product.name}</h3><p className="mt-0.5 text-[11px] text-[#607895]">{product.tagline}</p><div className="mt-2.5 flex flex-wrap items-center gap-1.5"><b className="text-[18px] text-[#092f59]">₹{product.price}</b>{discount > 0 && <span className="text-[10px] text-slate-400 line-through">₹{product.mrp}</span>}{discount > 0 && <span className="rounded-full bg-green-100 px-2 py-1 text-[9px] font-black text-green-700">{discount}% OFF</span>}</div><small className="text-[10px] text-slate-400">{product.uom}</small><button onClick={() => add(product)} className="mt-2.5 flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-[#073f76] text-xs font-black text-white shadow-sm"><ShoppingCart className="h-3.5 w-3.5" /> Add to Cart</button></div></article>; })}</div> : <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">No products found in this category yet.</div>}</div></section>

        <section id="why-us" className="mx-auto max-w-[1530px] px-5 py-9 lg:px-10"><div className="text-center"><h2 className="text-[29px] font-black tracking-[-.03em] text-[#092f59]">Why Choose Urban Shine?</h2><p className="mt-1 text-sm text-[#58708b]">Quality products for a cleaner and healthier tomorrow</p></div><div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{whyUs.map(([Icon, title, text, bg]) => <div key={title} className="flex items-start justify-center gap-3"><span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${bg} text-white`}><Icon className="h-5 w-5" /></span><div><h3 className="text-[12px] font-black text-[#092f59]">{title}</h3><p className="mt-1 max-w-[190px] text-[10px] leading-4 text-[#607895]">{text}</p></div></div>)}</div></section>

        <section className="px-0 pb-0">
          <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#dff5d8] via-[#eefbe8] to-[#dff4ff]" style={{ aspectRatio: "2172 / 724" }}>
            <img src={promoBanner} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
            <div className="relative z-10 mx-auto flex h-full max-w-[1530px] items-center px-5 lg:px-10">
              <div className="max-w-[560px]">
                <h2 className="text-[32px] font-black leading-[1.05] tracking-[-0.04em] text-[#092f59] sm:text-[40px] lg:text-[46px]">Clean More. <span className="text-green-600">Spend Less.</span></h2>
                <p className="mt-2 text-sm font-medium text-[#58708b] sm:text-base">Everyday essentials at prices you’ll love.</p>
                <button onClick={showAll} className="mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-green-600 px-6 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-green-700">Shop Now <ArrowRight className="h-4 w-4" /></button>
              </div>
              <div className="absolute right-5 top-1/2 z-20 flex h-[82px] w-[82px] -translate-y-1/2 items-center justify-center rounded-full bg-green-600 text-center font-black text-white shadow-xl sm:right-8 sm:h-[100px] sm:w-[100px] lg:right-12">
                <div className="leading-none"><span className="block text-[9px] sm:text-[10px]">UP TO</span><span className="block text-[27px] sm:text-[32px]">25%</span><span className="block text-[9px] sm:text-[10px]">OFF</span></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className="bg-[#062447] text-white"><div className="mx-auto max-w-[1530px] px-5 sm:px-10"><div className="grid items-center gap-6 border-b border-white/10 py-5 lg:grid-cols-[1fr_auto_1fr]"><div className="text-left"><b className="text-[21px] tracking-[-.03em] text-white">Urban <span className="text-green-400">Shine</span></b><p className="mt-1 text-[8px] uppercase tracking-[.08em] text-slate-400">Cleaner homes · brighter lives</p></div><nav className="flex items-center justify-center gap-7 text-[12px] text-slate-200"><a href="#home" className="hover:text-white">Home</a><button onClick={showAll} className="hover:text-white">Products</button><a href="#categories" className="hover:text-white">Categories</a><a href="#why-us" className="hover:text-white">About</a><a href="#footer" className="hover:text-white">Contact</a></nav><div className="flex items-center justify-end gap-4"><a href="#footer" aria-label="Facebook" className="text-white"><Facebook className="h-4 w-4" /></a><a href="#footer" aria-label="Instagram" className="text-white"><Instagram className="h-4 w-4" /></a><a href="#footer" aria-label="YouTube" className="text-white"><Youtube className="h-4 w-4" /></a></div></div><div className="flex flex-col gap-3 py-3 text-[10px] text-slate-300 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Urban Shine. All rights reserved.</span><div className="flex gap-6"><a href="#footer">Privacy Policy</a><a href="#footer">Terms &amp; Conditions</a></div></div></div></footer>
    </div>
  );
};

export default Storefront;
