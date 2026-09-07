import { ArrowRight, Check, Heart, Leaf, Menu, Search, ShoppingCart, ShieldCheck, Sparkles, Truck, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { useStoreProducts } from "@/hooks/useStoreProducts";

type BottleProps = {
  color: string;
  dark: string;
  name: string;
  pump?: boolean;
};

const Bottle = ({ color, dark, name, pump }: BottleProps) => (
  <div className="relative h-52 w-28 sm:h-60 sm:w-32">
    {pump ? (
      <div className="absolute right-1 top-0 h-8 w-12">
        <div className="absolute right-0 top-0 h-2.5 w-10 rounded-full" style={{ background: dark }} />
        <div className="absolute right-1 top-2 h-7 w-2.5" style={{ background: dark }} />
      </div>
    ) : (
      <div className="absolute left-1/2 top-0 h-8 w-8 -translate-x-1/2 rounded-t-md" style={{ background: dark }} />
    )}
    <div
      className="absolute bottom-0 left-1/2 flex h-44 w-24 -translate-x-1/2 items-center justify-center rounded-[18px] shadow-[0_20px_30px_rgba(15,23,42,.16)] sm:h-52 sm:w-28"
      style={{ background: `linear-gradient(145deg,${color},${dark})` }}
    >
      <div className="absolute inset-x-2 top-3 h-8 rounded-full bg-white/15" />
      <div className="z-10 mx-2 w-[78%] rounded-xl bg-white px-2 py-2.5 text-center shadow">
        <span className="mx-auto mb-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[8px] font-black text-white">U</span>
        <b className="block text-[8px] text-slate-800">URBAN SHINE</b>
        <span className="mt-1 block text-[8px] font-bold text-slate-600">{name}</span>
      </div>
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

const categories = [
  ["Household Cleaning", "Floor Cleaner · Toilet Cleaner · Glass Cleaner", "floor-cleaner", "bg-[#e8f7ff]"],
  ["Kitchen Care", "Dish Wash · Kitchen Cleaning", "dish-wash", "bg-[#eaf9e8]"],
  ["Laundry Care", "Liquid Detergent · Detergent Powder", "liquid-detergent", "bg-[#fff0f7]"],
  ["Personal Care", "Hand Wash · Body Care", "hand-wash", "bg-[#fff3e7]"],
  ["Specialty Care", "Copper Cleaner · More", "copper-cleaning-liquid", "bg-[#f0eaff]"],
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

const HeroArtwork = () => (
  <div className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[57%]" aria-hidden="true">
    <svg viewBox="0 0 820 420" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="heroBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6fbff" />
          <stop offset="0.55" stopColor="#eefbf8" />
          <stop offset="1" stopColor="#dff6dc" />
        </linearGradient>
        <linearGradient id="purpleBottle" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b76aff" />
          <stop offset="1" stopColor="#7427db" />
        </linearGradient>
        <linearGradient id="blueBottle" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3ed1ff" />
          <stop offset="1" stopColor="#0089c8" />
        </linearGradient>
        <linearGradient id="yellowBottle" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffe96a" />
          <stop offset="1" stopColor="#f2b600" />
        </linearGradient>
        <linearGradient id="pinkBottle" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff9bb7" />
          <stop offset="1" stopColor="#ef4c8e" />
        </linearGradient>
        <filter id="bottleShadow" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#17334d" floodOpacity=".18" />
        </filter>
        <filter id="softBlur">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <rect width="820" height="420" fill="url(#heroBg)" />
      <rect x="515" y="0" width="305" height="420" fill="#f7fffc" opacity=".7" />
      <path d="M520 0V420M612 0V420M706 0V420" stroke="#ffffff" strokeWidth="18" opacity=".65" />
      <path d="M520 92H820M520 202H820M520 310H820" stroke="#dcefeb" strokeWidth="2" opacity=".7" />

      <g opacity=".72" fill="none" stroke="#ffffff" strokeWidth="3">
        <circle cx="108" cy="78" r="20" />
        <circle cx="145" cy="116" r="8" />
        <circle cx="198" cy="64" r="13" />
        <circle cx="285" cy="170" r="17" />
        <circle cx="338" cy="115" r="7" />
        <circle cx="455" cy="225" r="12" />
      </g>

      <g fill="#39c77b">
        <path d="M628 90c28-35 57-36 78-27-10 31-33 48-78 27Z" />
        <path d="M710 156c29-26 56-27 78-20-14 27-38 39-78 20Z" />
        <path d="M752 318c-30-26-34-55-29-74 29 9 47 30 29 74Z" />
        <path d="M585 350c-33-12-52-35-53-56 31-2 53 16 53 56Z" />
      </g>

      <g opacity=".96" filter="url(#bottleShadow)">
        <g>
          <rect x="180" y="78" width="54" height="42" rx="9" fill="#7132df" />
          <rect x="156" y="105" width="112" height="270" rx="30" fill="url(#purpleBottle)" />
          <rect x="168" y="125" width="88" height="31" rx="16" fill="#ffffff" opacity=".14" />
          <rect x="168" y="220" width="88" height="93" rx="14" fill="#ffffff" />
          <circle cx="212" cy="240" r="10" fill="#17a554" />
          <text x="212" y="244" textAnchor="middle" fontSize="10" fontWeight="900" fill="#fff">U</text>
          <text x="212" y="263" textAnchor="middle" fontSize="11" fontWeight="900" fill="#18314b">URBAN SHINE</text>
          <text x="212" y="281" textAnchor="middle" fontSize="11" fontWeight="700" fill="#53657a">Floor Cleaner</text>
          <text x="212" y="298" textAnchor="middle" fontSize="8" fontWeight="800" fill="#8b4ee7">LAVENDER</text>
        </g>

        <g>
          <path d="M306 113h42l18 0 12 10h-57Z" fill="#057bb9" />
          <rect x="325" y="93" width="20" height="31" rx="5" fill="#087dbb" />
          <rect x="306" y="116" width="86" height="247" rx="24" fill="url(#blueBottle)" />
          <rect x="315" y="137" width="68" height="28" rx="14" fill="#ffffff" opacity=".14" />
          <rect x="315" y="221" width="68" height="86" rx="13" fill="#fff" />
          <circle cx="349" cy="240" r="9" fill="#17a554" />
          <text x="349" y="243" textAnchor="middle" fontSize="9" fontWeight="900" fill="#fff">U</text>
          <text x="349" y="262" textAnchor="middle" fontSize="9" fontWeight="900" fill="#18314b">URBAN SHINE</text>
          <text x="349" y="280" textAnchor="middle" fontSize="9" fontWeight="700" fill="#53657a">Glass Cleaner</text>
          <text x="349" y="296" textAnchor="middle" fontSize="7" fontWeight="800" fill="#1588bf">STREAK FREE</text>
        </g>

        <g>
          <rect x="430" y="110" width="35" height="35" rx="7" fill="#c89100" />
          <rect x="410" y="137" width="93" height="226" rx="27" fill="url(#yellowBottle)" />
          <rect x="420" y="154" width="72" height="27" rx="14" fill="#fff" opacity=".15" />
          <rect x="420" y="225" width="72" height="80" rx="13" fill="#fff" />
          <circle cx="456" cy="243" r="9" fill="#17a554" />
          <text x="456" y="246" textAnchor="middle" fontSize="9" fontWeight="900" fill="#fff">U</text>
          <text x="456" y="264" textAnchor="middle" fontSize="9" fontWeight="900" fill="#18314b">URBAN SHINE</text>
          <text x="456" y="282" textAnchor="middle" fontSize="9" fontWeight="700" fill="#53657a">Dish Wash</text>
          <text x="456" y="297" textAnchor="middle" fontSize="7" fontWeight="800" fill="#d18b00">LEMON</text>
        </g>

        <g>
          <rect x="543" y="131" width="30" height="38" rx="7" fill="#11744b" />
          <rect x="530" y="157" width="84" height="206" rx="25" fill="url(#pinkBottle)" />
          <rect x="539" y="174" width="66" height="26" rx="13" fill="#fff" opacity=".16" />
          <rect x="539" y="230" width="66" height="78" rx="13" fill="#fff" />
          <circle cx="572" cy="248" r="9" fill="#17a554" />
          <text x="572" y="251" textAnchor="middle" fontSize="9" fontWeight="900" fill="#fff">U</text>
          <text x="572" y="269" textAnchor="middle" fontSize="8" fontWeight="900" fill="#18314b">URBAN SHINE</text>
          <text x="572" y="286" textAnchor="middle" fontSize="8" fontWeight="700" fill="#53657a">Hand Wash</text>
          <text x="572" y="301" textAnchor="middle" fontSize="7" fontWeight="800" fill="#df4381">ROSE</text>
        </g>
      </g>

      <g opacity=".9">
        <ellipse cx="245" cy="394" rx="170" ry="14" fill="#91a7b5" opacity=".18" filter="url(#softBlur)" />
        <ellipse cx="520" cy="394" rx="205" ry="14" fill="#91a7b5" opacity=".2" filter="url(#softBlur)" />
      </g>

      <g transform="translate(650 42) rotate(-5)">
        <circle cx="60" cy="5" r="8" fill="#a9efc5" />
        <text x="48" y="48" textAnchor="middle" fontSize="22" fontWeight="800" fill="#075b66" fontStyle="italic">Small steps</text>
        <text x="48" y="74" textAnchor="middle" fontSize="22" fontWeight="800" fill="#075b66" fontStyle="italic">for a cleaner</text>
        <text x="48" y="100" textAnchor="middle" fontSize="22" fontWeight="800" fill="#1c9d48" fontStyle="italic">tomorrow.</text>
        <path d="M-8 113c43 11 81 5 113-10" fill="none" stroke="#1c9d48" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  </div>
);

const Storefront = () => {
  const navigate = useNavigate();
  const { count, addItem } = useCart();
  const { data: products = [] } = useStoreProducts();
  const featured = ["floor-cleaner", "dish-wash", "copper-cleaning-liquid", "hand-wash"]
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean) as typeof products;

  const add = (product: (typeof products)[number]) => {
    addItem({ slug: product.slug, name: product.name, uom: product.uom, price: product.price });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-[68px] max-w-[1530px] items-center gap-7 px-5 lg:px-10">
          <button className="lg:hidden" aria-label="Menu"><Menu className="h-6 w-6 text-[#092f59]" /></button>
          <a href="#home" className="shrink-0 text-[24px] font-black tracking-[-.04em] text-[#092f59]">
            Urban <span className="text-green-600">Shine</span>
          </a>
          <nav className="hidden items-center gap-2 lg:flex">
            <a href="#home" className="rounded-full bg-[#edf5ff] px-5 py-2.5 text-sm font-black text-blue-700">Home</a>
            <a href="#products" className="rounded-full px-4 py-2.5 text-sm font-bold text-[#092f59]">Products</a>
            <a href="#categories" className="rounded-full px-4 py-2.5 text-sm font-bold text-[#092f59]">Categories</a>
            <a href="#why-us" className="rounded-full px-4 py-2.5 text-sm font-bold text-[#092f59]">About</a>
            <a href="#footer" className="rounded-full px-4 py-2.5 text-sm font-bold text-[#092f59]">Contact</a>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden h-10 w-[260px] items-center gap-2 rounded-full bg-[#f1f5f9] px-4 md:flex">
              <Search className="h-4 w-4 text-[#6d8299]" />
              <span className="text-xs text-[#8a9aac]">Search products...</span>
            </div>
            <button aria-label="Account" className="hidden h-10 w-10 items-center justify-center text-[#092f59] sm:flex">
              <UserRound className="h-5 w-5" />
            </button>
            <button onClick={() => navigate("/cart")} aria-label="Cart" className="relative flex h-10 w-10 items-center justify-center text-[#092f59]">
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && <span className="absolute right-0 top-0 min-w-5 rounded-full bg-green-600 px-1.5 py-0.5 text-[10px] font-black text-white">{count}</span>}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="relative overflow-hidden bg-gradient-to-r from-[#e8f7ff] via-white to-[#eefbf7]">
          <HeroArtwork />
          <div className="absolute inset-y-0 left-0 z-[1] w-full bg-gradient-to-r from-[#e8f7ff] via-[#eefaff]/95 via-60% to-transparent lg:w-[58%]" />
          <div className="relative z-10 mx-auto flex min-h-[385px] max-w-[1530px] items-center px-5 py-10 lg:px-10 lg:py-0">
            <div className="max-w-[760px] lg:w-[53%]">
              <p className="text-[11px] font-black uppercase tracking-[.34em] text-[#1e4f83]">A cleaner • healthier • happier home</p>
              <h1 className="mt-5 text-[48px] font-black leading-[.94] tracking-[-.055em] text-[#073b70] sm:text-[58px] lg:text-[64px]">
                CLEAN HOME.
                <span className="block text-green-600">FRESH EVERY DAY.</span>
              </h1>
              <p className="mt-5 max-w-[610px] text-[16px] leading-6 text-[#385a7e] sm:text-[17px]">
                High quality cleaning &amp; personal care products made for modern homes — effective, affordable and reliable.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#products" className="inline-flex h-11 items-center gap-3 rounded-lg bg-[#073f76] px-6 text-sm font-black text-white shadow-lg shadow-blue-900/15">
                  Shop Products <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#categories" className="inline-flex h-11 items-center gap-3 rounded-lg border border-[#8da9c4] bg-white/80 px-6 text-sm font-black text-[#073f76]">
                  Explore Categories
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto grid max-w-[1530px] grid-cols-2 lg:grid-cols-4">
            {benefits.map(([Icon, title, subtitle]) => (
              <div key={title} className="flex items-center justify-center gap-3 border-r border-slate-100 px-3 py-4 last:border-r-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eaf6ff] text-[#0b4b7f]">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <b className="block text-[12px] font-black text-[#092f59]">{title}</b>
                  <small className="text-[10px] text-slate-500">{subtitle}</small>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section id="categories" className="mx-auto max-w-[1530px] px-5 py-9 lg:px-10">
          <div className="text-center">
            <h2 className="text-[29px] font-black tracking-[-.03em] text-[#092f59]">Shop by Category</h2>
            <p className="mt-1 text-sm text-[#58708b]">Find the right product for every need</p>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
            {categories.map(([title, subtitle, slug, bg]) => (
              <a href="#products" key={title} className="group rounded-xl border border-[#d9e5ef] bg-white p-2.5 text-center shadow-[0_3px_14px_rgba(25,64,95,.04)] transition hover:-translate-y-1 hover:shadow-lg">
                <div className={`flex h-[150px] items-end justify-center overflow-hidden rounded-xl ${bg}`}>
                  <div className="scale-[.58] transition-transform group-hover:scale-[.63]"><Bottle {...visual[slug]} /></div>
                </div>
                <h3 className="mt-3 text-[13px] font-black text-[#092f59]">{title}</h3>
                <p className="mt-1 min-h-8 text-[10px] leading-4 text-[#55708e]">{subtitle}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-black text-blue-700">Shop now <ArrowRight className="h-3 w-3" /></span>
              </a>
            ))}
          </div>
        </section>

        <section id="products" className="scroll-mt-16 bg-[#f2f9ff] px-5 py-8 lg:px-10">
          <div className="mx-auto max-w-[1530px]">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-[29px] font-black tracking-[-.03em] text-[#092f59]">Best Sellers</h2>
                <p className="mt-1 text-sm text-[#58708b]">Our most loved everyday essentials</p>
              </div>
              <button onClick={() => navigate("/products")} className="hidden items-center gap-1 text-sm font-black text-blue-700 sm:flex">View All Products <ArrowRight className="h-4 w-4" /></button>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((product, index) => {
                const v = visual[product.slug] ?? visual["floor-cleaner"];
                const discount = product.mrp && product.mrp > product.price ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
                const badge = index === 3 ? "NEW" : index === 1 ? "POPULAR" : "BEST SELLER";
                return (
                  <article key={product.id} className="overflow-hidden rounded-xl border border-[#dbe7f0] bg-white shadow-[0_3px_14px_rgba(25,64,95,.05)] transition hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative flex h-[205px] items-center justify-center bg-gradient-to-b from-white to-[#f8fbfd]">
                      <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[9px] font-black text-white ${badge === "NEW" ? "bg-pink-500" : badge === "POPULAR" ? "bg-blue-600" : "bg-green-600"}`}>{badge}</span>
                      <button className="absolute right-3 top-3 rounded-full bg-white p-1.5 text-[#577594] shadow-sm" aria-label="Wishlist"><Heart className="h-4 w-4" /></button>
                      <div className="scale-[.68]"><Bottle {...v} /></div>
                    </div>
                    <div className="p-3.5">
                      <h3 className="text-[13px] font-black text-[#092f59]">{product.name}</h3>
                      <p className="mt-0.5 text-[11px] text-[#607895]">{product.tagline}</p>
                      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                        <b className="text-[18px] text-[#092f59]">₹{product.price}</b>
                        {discount > 0 && <span className="text-[10px] text-slate-400 line-through">₹{product.mrp}</span>}
                        {discount > 0 && <span className="rounded-full bg-green-100 px-2 py-1 text-[9px] font-black text-green-700">{discount}% OFF</span>}
                      </div>
                      <small className="text-[10px] text-slate-400">{product.uom}</small>
                      <button onClick={() => add(product)} className="mt-2.5 flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-[#073f76] text-xs font-black text-white shadow-sm">
                        <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="why-us" className="mx-auto max-w-[1530px] px-5 py-9 lg:px-10">
          <div className="text-center">
            <h2 className="text-[29px] font-black tracking-[-.03em] text-[#092f59]">Why Choose Urban Shine?</h2>
            <p className="mt-1 text-sm text-[#58708b]">Quality products for a cleaner and healthier tomorrow</p>
          </div>
          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map(([Icon, title, text, bg]) => (
              <div key={title} className="flex items-start justify-center gap-3">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${bg} text-white`}><Icon className="h-5 w-5" /></span>
                <div>
                  <h3 className="text-[12px] font-black text-[#092f59]">{title}</h3>
                  <p className="mt-1 max-w-[190px] text-[10px] leading-4 text-[#607895]">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-0 pb-0 lg:px-0">
          <div className="relative overflow-hidden bg-gradient-to-r from-[#dff5d8] via-[#eefbe8] to-[#dff4ff] px-5 py-8 lg:px-12">
            <div className="mx-auto flex max-w-[1530px] items-center justify-between gap-8">
              <div className="relative z-10">
                <h2 className="text-[35px] font-black tracking-[-.04em] text-[#092f59]">Clean More. <span className="text-green-600">Spend Less.</span></h2>
                <p className="mt-1 text-sm text-[#58708b]">Everyday essentials at prices you’ll love.</p>
                <a href="#products" className="mt-4 inline-flex h-9 items-center gap-2 rounded-lg bg-green-600 px-5 text-xs font-black text-white">Shop Now <ArrowRight className="h-3.5 w-3.5" /></a>
              </div>
              <div className="hidden items-end sm:flex">
                <div className="scale-[.34]"><Bottle {...visual["floor-cleaner"]} /></div>
                <div className="-ml-10 scale-[.30]"><Bottle {...visual["dish-wash"]} /></div>
                <div className="-ml-10 scale-[.33]"><Bottle {...visual["copper-cleaning-liquid"]} /></div>
                <div className="-ml-10 scale-[.29]"><Bottle {...visual["hand-wash"]} /></div>
              </div>
              <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-600 text-center text-[9px] font-black text-white shadow-lg sm:flex">UP TO<br /><span className="text-lg">25%</span><br />OFF</div>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className="bg-[#062447] text-slate-300">
        <div className="mx-auto grid max-w-[1530px] gap-8 px-5 py-8 sm:px-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <b className="text-[21px] text-white">Urban <span className="text-green-400">Shine</span></b>
            <p className="mt-2 max-w-sm text-xs leading-5 text-slate-400">Quality home, kitchen, cleaning and personal care essentials made for everyday living.</p>
          </div>
          <div>
            <h4 className="mb-2 text-xs font-black text-white">Shop</h4>
            <div className="space-y-1.5 text-xs"><a href="#products" className="block">Products</a><a href="#categories" className="block">Categories</a><button onClick={() => navigate("/cart")} className="block">Your Cart</button></div>
          </div>
          <div>
            <h4 className="mb-2 text-xs font-black text-white">Support</h4>
            <div className="space-y-1.5 text-xs"><p>Delivery in 3–5 working days</p><p>UPI payment on checkout</p><button onClick={() => navigate("/login")}>Staff login</button></div>
          </div>
        </div>
        <div className="border-t border-white/10 py-3 text-center text-[10px] text-slate-400">© 2026 Urban Shine. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default Storefront;
