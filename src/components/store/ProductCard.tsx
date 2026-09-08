import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { getProductImage } from "@/data/productImages";
import { useCart } from "@/contexts/CartContext";
import type { StoreProduct } from "@/hooks/useStoreProducts";

const ProductCard = ({ product }: { product: StoreProduct }) => {
  const { addItem } = useCart();
  const discount = product.mrp && product.mrp > product.price ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
  const badge = discount >= 25 ? "BEST SELLER" : discount > 0 ? "POPULAR" : "NEW";
  const image = product.imageUrl || getProductImage(product.slug);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#dbe7ef] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/product/${product.slug}`} className="relative block bg-white px-4 pt-4">
        <div className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[9px] font-black tracking-wide text-white shadow-sm ${badge === "NEW" ? "bg-pink-500" : badge === "POPULAR" ? "bg-sky-500" : "bg-green-600"}`}>{badge}</div>
        <button type="button" aria-label="Add to wishlist" onClick={(e) => e.preventDefault()} className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#47708f] shadow-sm ring-1 ring-slate-100 transition hover:text-pink-500">
          <Heart className="h-4 w-4" />
        </button>
        <div className="flex h-56 items-center justify-center sm:h-60">
          <img src={image} alt={`Urban Shine ${product.name}`} loading="lazy" width={700} height={700} className="h-full w-full object-contain transition duration-300 group-hover:scale-105" />
        </div>
      </Link>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-2">
        <Link to={`/product/${product.slug}`}><h3 className="line-clamp-2 min-h-[40px] text-[15px] font-black leading-5 text-[#0b315b] hover:text-[#0872d1]">{product.name}</h3></Link>
        <p className="mt-1 line-clamp-1 text-xs text-[#5f7890]">{product.tagline}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xl font-black text-[#0b315b]">₹{product.price}</span>
          {product.mrp && product.mrp > product.price && <span className="text-xs text-slate-400 line-through">₹{product.mrp}</span>}
          {discount > 0 && <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-black text-green-700">{discount}% OFF</span>}
        </div>
        <span className="mt-1 text-[11px] font-semibold text-slate-400">{product.uom}</span>
        <button type="button" onClick={() => { addItem({ slug: product.slug, name: product.name, uom: product.uom, price: product.price }); toast.success(`${product.name} added to cart`); }} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#073b70] py-3 text-sm font-extrabold text-white shadow-md transition hover:bg-[#052d55]">
          <ShoppingCart className="h-4 w-4" /> Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
