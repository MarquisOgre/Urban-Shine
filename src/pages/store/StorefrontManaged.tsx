import { ArrowRight, Check, Leaf, Menu, Search, ShoppingCart, ShieldCheck, Sparkles, Truck, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { useStoreProducts } from "@/hooks/useStoreProducts";
import { useStoreSettings, type StoreCategory, type StoreBenefit, type StoreWhyUs } from "@/hooks/useStoreSettings";
import { getProductImage } from "@/data/productImages";
import heroImage from "@/assets/hero.png";
import promoBanner from "@/assets/promo-banner.png";

const categoryBg: Record<StoreCategory["theme"], string> = { blue: "bg-[#e8f7ff]", green: "bg-[#eaf9e8]", pink: "bg-[#fff0f7]", peach: "bg-[#fff3e7]", purple: "bg-[#f0eaff]" };
const whyBg: Record<StoreWhyUs["theme"], string> = { green: "bg-green-600", blue: "bg-blue-500", amber: "bg-amber-400", pink: "bg-pink-500" };
const iconMap = { truck: Truck, shield: ShieldCheck, leaf: Leaf, cart: ShoppingCart, sparkles: Sparkles, check: Check };

const StorefrontManaged = () => {
  const navigate = useNavigate();
  const { count, addItem } = useCart();
  const { data: products = [] } = useStoreProducts();
  const { data: settings } = useStoreSettings();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!settings) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading store…</div>;

  const productBySlug = new Map(products.map((product) => [product.slug, product]));
  const featured = settings.featuredSlugs.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean) as typeof products;
  const selectedCategory = settings.categories.find((c) => c.title === activeCategory);
  const filteredSearch = search.trim().toLowerCase();
  const visibleProducts = activeCategory && selectedCategory ? products.filter((p) => selectedCategory.productSlugs.includes(p.slug)) : showAllProducts ? products : featured;
  const displayProducts = filteredSearch ? products.filter((p) => `${p.name} ${p.tagline} ${p.category}`.toLowerCase().includes(filteredSearch)) : visibleProducts;
  const scrollToProducts = () => requestAnimationFrame(() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  const showAll = () => { setActiveCategory(null); setShowAllProducts(true); setMobileMenuOpen(false); scrollToProducts(); };
  const showFeatured = () => { setActiveCategory(null); setShowAllProducts(false); scrollToProducts(); };
  const selectCategory = (title: string) => { setShowAllProducts(false); setActiveCategory((v) => v === title ? null : title); setMobileMenuOpen(false); scrollToProducts(); };
  const add = (product: (typeof products)[number]) => { addItem({ slug: product.slug, name: product.name, uom: product.uom, price: product.price }); toast.success(`${product.name} added to cart`); };
  const heroSrc = settings.heroImageUrl || heroImage;
  const promoSrc = settings.promoBannerImageUrl || promoBanner;
  const shoppingLinks = settings.footerShopping.split("\n").map((item) => item.trim()).filter(Boolean);

  const shoppingLink = (label: string) => {
    const key = label.toLowerCase();
    if (key.includes("product")) return <button onClick={showAll} className="text-left hover:text-white">{label}</button>;
    if (key.includes("categor")) return <a href="#categories" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">{label}</a>;
    if (key.includes("cart")) return <button onClick={() => { setMobileMenuOpen(false); navigate("/cart"); }} className="text-left hover:text-white">{label}</button>;
    if (key.includes("contact")) return <a href="#footer" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">{label}</a>;
    if (key.includes("about")) return <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">{label}</a>;
    return <span>{label}</span>;
  };

  return <div className="min-h-screen bg-white text-slate-900">
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white">
      <div className="relative mx-auto flex h-[68px] max-w-[1530px] items-center px-4 sm:px-5 lg:px-10">
        <button type="button" onClick={() => setMobileMenuOpen(true)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#092f59] transition hover:bg-slate-100 lg:hidden" aria-label="Open menu" aria-expanded={mobileMenuOpen}>
          <Menu className="h-7 w-7" />
        </button>
        <a href="#home" className="flex shrink-0 items-center"><img src="/Logo.png" alt={settings.storeName} className="h-12 w-auto object-contain" /></a>
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 lg:flex"><a href="#home" className="rounded-full bg-[#edf5ff] px-5 py-2.5 text-sm font-black text-blue-700">Home</a><button onClick={showAll} className="rounded-full px-4 py-2.5 text-sm font-bold text-[#092f59]">Products</button><a href="#categories" className="rounded-full px-4 py-2.5 text-sm font-bold text-[#092f59]">Categories</a><a href="#why-us" className="rounded-full px-4 py-2.5 text-sm font-bold text-[#092f59]">About</a><a href="#footer" className="rounded-full px-4 py-2.5 text-sm font-bold text-[#092f59]">Contact</a></nav>
        <div className="ml-auto flex items-center gap-1 sm:gap-3"><div className="hidden h-10 w-[260px] items-center gap-2 rounded-full bg-[#f1f5f9] px-4 md:flex"><Search className="h-4 w-4 text-[#6d8299]" /><input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && scrollToProducts()} placeholder="Search products..." className="w-full bg-transparent text-xs outline-none" /></div><button type="button" onClick={() => navigate("/login")} aria-label="Login" title="Login" className="flex h-10 w-10 items-center justify-center rounded-full text-[#092f59] transition hover:bg-slate-100"><UserRound className="h-5 w-5" /></button><button onClick={() => navigate("/cart")} aria-label="Cart" className="relative flex h-10 w-10 items-center justify-center text-[#092f59]"><ShoppingCart className="h-5 w-5" />{count > 0 && <span className="absolute right-0 top-0 min-w-5 rounded-full bg-green-600 px-1.5 py-0.5 text-[10px] font-black text-white">{count}</span>}</button></div>
      </div>

      {mobileMenuOpen && <>
        <button type="button" aria-label="Close menu overlay" onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 top-[68px] z-[55] bg-slate-900/30 lg:hidden" />
        <aside className="fixed right-0 top-0 z-[60] h-full w-[min(86vw,340px)] overflow-y-auto bg-white shadow-2xl lg:hidden" aria-label="Mobile navigation">
          <div className="flex h-[68px] items-center justify-between border-b border-slate-100 px-5">
            <div className="flex items-center gap-2"><img src="/Logo.png" alt={settings.storeName} className="h-9 w-auto object-contain" /><span className="font-black text-[#092f59]">Menu</span></div>
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full text-[#092f59] hover:bg-slate-100" aria-label="Close menu"><X className="h-6 w-6" /></button>
          </div>
          <nav className="flex flex-col p-4">
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-3.5 text-base font-black text-[#092f59] hover:bg-[#edf5ff]">Home</a>
            <button type="button" onClick={showAll} className="rounded-xl px-4 py-3.5 text-left text-base font-black text-[#092f59] hover:bg-[#edf5ff]">Products</button>
            <a href="#categories" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-3.5 text-base font-black text-[#092f59] hover:bg-[#edf5ff]">Categories</a>
            <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-3.5 text-base font-black text-[#092f59] hover:bg-[#edf5ff]">About</a>
            <a href="#footer" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-3.5 text-base font-black text-[#092f59] hover:bg-[#edf5ff]">Contact</a>
            <div className="my-3 border-t border-slate-100" />
            <button type="button" onClick={() => { setMobileMenuOpen(false); navigate("/login"); }} className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-left text-base font-bold text-[#092f59] hover:bg-slate-50"><UserRound className="h-5 w-5" />Login</button>
            <button type="button" onClick={() => { setMobileMenuOpen(false); navigate("/cart"); }} className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-left text-base font-bold text-[#092f59] hover:bg-slate-50"><ShoppingCart className="h-5 w-5" />Cart {count > 0 && <span className="rounded-full bg-green-600 px-2 py-0.5 text-xs font-black text-white">{count}</span>}</button>
          </nav>
        </aside>
      </>}
    </header>

    <main>
      <section id="home" className="relative isolate h-[500px] overflow-hidden bg-[#eaf7ff] sm:h-[520px] lg:h-[540px]"><img src={heroSrc} alt={`${settings.storeName} cleaning products`} className="absolute inset-0 z-0 h-full w-full object-cover object-right" /><div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[57%] bg-gradient-to-r from-[#eaf7ff] via-[#eaf7ff]/96 via-[72%] to-transparent" /><div className="relative z-30 mx-auto h-full max-w-[1530px] px-5 lg:px-10"><div className="flex h-full max-w-[600px] flex-col justify-center"><p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#0b4b7f] sm:text-sm">{settings.heroEyebrow}</p><h1 className="text-5xl font-black leading-[0.95] tracking-[-0.05em] text-[#073f76] sm:text-6xl lg:text-[68px]">{settings.heroTitle}<br /><span className="text-green-600">{settings.heroTitleAccent}</span></h1><p className="mt-5 max-w-[520px] text-sm font-medium leading-6 text-[#3f5872] sm:text-base">{settings.heroDescription}</p><div className="mt-7 flex flex-wrap gap-3"><button onClick={showAll} className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#073f76] px-7 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5">Shop Products <ArrowRight className="h-4 w-4" /></button><a href="#categories" className="inline-flex h-12 items-center rounded-lg border-2 border-[#073f76] bg-white px-7 text-sm font-black text-[#073f76] shadow-lg">Explore Categories</a></div></div></div></section>

      <section className="border-b border-slate-100 bg-white"><div className="mx-auto grid max-w-[1530px] grid-cols-2 lg:grid-cols-4">{settings.benefits.map((item: StoreBenefit) => { const Icon = iconMap[item.icon] || Check; return <div key={`${item.title}-${item.subtitle}`} className="flex items-center justify-center gap-3 border-r border-slate-100 px-3 py-4 last:border-r-0"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eaf6ff] text-[#0b4b7f]"><Icon className="h-5 w-5" /></span><span><b className="block text-[12px] font-black text-[#092f59]">{item.title}</b><small className="text-[10px] text-slate-500">{item.subtitle}</small></span></div>; })}</div></section>

      <section id="categories" className="mx-auto max-w-[1530px] px-5 py-9 lg:px-10"><div className="text-center"><h2 className="text-[29px] font-black tracking-[-.03em] text-[#092f59]">Shop by Category</h2><p className="mt-1 text-sm text-[#58708b]">Find the right product for every need</p></div><div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-5">{settings.categories.map((category) => { const active = activeCategory === category.title; return <button type="button" onClick={() => selectCategory(category.title)} key={category.title} className={`group rounded-xl border bg-white p-2.5 text-center shadow-[0_3px_14px_rgba(25,64,95,.04)] transition hover:-translate-y-1 hover:shadow-lg ${active ? "border-green-500 ring-2 ring-green-100" : "border-[#d9e5ef]"}`}><div className={`flex h-[150px] items-end justify-center overflow-hidden rounded-xl ${categoryBg[category.theme]}`}><img src={productBySlug.get(category.imageSlug)?.imageUrl || getProductImage(category.imageSlug)} alt={category.title} className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105" /></div><h3 className="mt-3 text-[13px] font-black text-[#092f59]">{category.title}</h3><p className="mt-1 min-h-8 text-[10px] leading-4 text-[#55708e]">{category.subtitle}</p><span className={`mt-2 inline-flex items-center gap-1 text-[10px] font-black ${active ? "text-green-700" : "text-blue-700"}`}>{active ? "Showing products" : "Shop now"}<ArrowRight className="h-3 w-3" /></span></button>; })}</div></section>

      <section id="products" className="scroll-mt-16 bg-[#f2f9ff] px-5 py-8 lg:px-10"><div className="mx-auto max-w-[1530px]"><div className="flex items-end justify-between gap-4"><div><h2 className="text-[29px] font-black tracking-[-.03em] text-[#092f59]">{activeCategory || (showAllProducts ? "All Products" : "Best Sellers")}</h2><p className="mt-1 text-sm text-[#58708b]">{activeCategory ? "Products in this category" : showAllProducts ? `${products.length} products available` : "Our most loved everyday essentials"}</p></div><div className="flex items-center gap-4">{activeCategory && <button onClick={showFeatured} className="text-xs font-black text-green-700">← Show Best Sellers</button>}{!showAllProducts && !activeCategory && <button onClick={showAll} className="hidden text-sm font-black text-blue-700 sm:block">View All →</button>}</div></div>{displayProducts.length === 0 ? <div className="py-16 text-center text-slate-500">No products found.</div> : <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{displayProducts.map((product) => <article key={product.id} className="group rounded-2xl border border-[#d9e5ef] bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><button onClick={() => navigate(`/product/${product.slug}`)} className="block w-full text-left"><div className="flex h-48 items-center justify-center rounded-xl bg-slate-50 p-4"><img src={product.imageUrl || getProductImage(product.slug)} alt={product.name} className="h-full w-full object-contain transition group-hover:scale-105" /></div><div className="pt-3"><p className="text-[10px] font-bold uppercase tracking-wide text-blue-600">{product.category}</p><h3 className="mt-1 text-sm font-black text-[#092f59]">{product.name}</h3><p className="mt-1 line-clamp-2 text-xs text-slate-500">{product.tagline}</p><div className="mt-3 flex items-end justify-between"><div><span className="text-lg font-black text-[#092f59]">₹{product.price.toFixed(2)}</span>{product.mrp && product.mrp > product.price && <span className="ml-2 text-xs text-slate-400 line-through">₹{product.mrp.toFixed(2)}</span>}</div><span className="text-[10px] font-bold text-slate-500">{product.uom}</span></div></div></button><button onClick={() => add(product)} disabled={!product.inStock} className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#073f76] text-xs font-black text-white disabled:cursor-not-allowed disabled:bg-slate-300">{product.inStock ? <>Add to Cart <ShoppingCart className="h-4 w-4" /></> : "Out of Stock"}</button></article>)}</div>}</div></section>

      <section id="why-us" className="mx-auto max-w-[1530px] px-5 py-12 lg:px-10"><div className="text-center"><h2 className="text-[29px] font-black tracking-[-.03em] text-[#092f59]">Why Choose {settings.storeName}?</h2><p className="mt-1 text-sm text-[#58708b]">Simple, reliable products for everyday homes</p></div><div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{settings.whyUs.map((item: StoreWhyUs) => { const Icon = iconMap[item.icon] || Check; return <div key={item.title} className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm"><span className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${whyBg[item.theme]} text-white`}><Icon className="h-6 w-6" /></span><h3 className="mt-4 text-base font-black text-[#092f59]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p></div>; })}</div></section>

      <section className="mx-auto max-w-[1530px] px-5 pb-12 lg:px-10"><div className="relative min-h-56 overflow-hidden rounded-2xl bg-[#092f59]"><img src={promoSrc} alt={settings.promoTitle || "Special offer"} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-[#092f59]/55" /><div className="relative z-10 flex min-h-56 items-center p-6 sm:p-10"><div className="max-w-2xl text-white"><h2 className="text-2xl font-black sm:text-3xl">{settings.promoTitle}</h2><p className="mt-2 text-sm leading-6 text-blue-100 sm:text-base">{settings.promoDescription}</p><button onClick={showAll} className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-white px-5 text-xs font-black text-[#092f59] shadow">{settings.promoButtonText || "Shop Products"}<ArrowRight className="h-4 w-4" /></button></div></div></div></section>
    </main>

    <footer id="footer" className="bg-[#092f59] px-5 py-10 text-white lg:px-10"><div className="mx-auto grid max-w-[1530px] gap-8 md:grid-cols-3"><div>{settings.footerLogoUrl && <img src={settings.footerLogoUrl} alt={settings.storeName} className="h-12 max-w-[190px] rounded bg-white p-1 object-contain" />}<p className="mt-4 max-w-md whitespace-pre-line text-sm leading-6 text-blue-100">{settings.footerSubheading}</p></div><div><h3 className="font-black">Address</h3><p className="mt-3 whitespace-pre-line text-sm leading-6 text-blue-100">{settings.footerAddress}</p>{settings.phone && <p className="mt-2 whitespace-pre-line text-sm text-blue-100"><span className="font-bold text-white">Phone:</span> {settings.phone}</p>}{settings.email && <p className="mt-2 whitespace-pre-line text-sm text-blue-100"><span className="font-bold text-white">Email:</span> {settings.email}</p>}</div><div><h3 className="font-black">Shopping</h3><div className="mt-3 flex flex-col items-start gap-2 text-sm text-blue-100">{shoppingLinks.map((label, index) => <span key={`${label}-${index}`}>{shoppingLink(label)}</span>)}</div></div></div><div className="mx-auto mt-8 max-w-[1530px] border-t border-white/10 pt-5 text-center text-xs text-blue-200">{settings.footerCopyright}</div></footer>
  </div>;
};

export default StorefrontManaged;