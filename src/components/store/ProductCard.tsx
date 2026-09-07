import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { getProductImage } from "@/data/productImages";
import { useCart } from "@/contexts/CartContext";
import type { StoreProduct } from "@/hooks/useStoreProducts";

const ProductCard = ({ product }: { product: StoreProduct }) => {
  const { addItem } = useCart();
  const discount = product.mrp && product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/product/${product.slug}`} className="relative block overflow-hidden bg-white">
        {discount > 0 && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-green-600 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white shadow-sm">
            {discount}% OFF
          </span>
        )}
        <button type="button" aria-label="Add to wishlist" onClick={(e) => e.preventDefault()} className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-400 shadow-sm transition hover:text-pink-500">
          <Heart className="h-4 w-4" />
        </button>
        <div className="flex h-64 items-center justify-center bg-gradient-to-b from-[#fafdff] to-[#f2f8fc] px-5 py-5 sm:h-68">
          <img src={getProductImage(product.slug)} alt={`Urban Shine ${product.name}`} loading="lazy" width={700} height={700} className="h-full w-full object-contain drop-shadow-xl transition duration-500 group-hover:scale-105" />
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[44px] text-[15px] font-black leading-5 text-[#073b71] transition hover:text-green-600">{product.name}</h3>
        </Link>
        <p className="mt-1 line-clamp-1 text-xs text-slate-500">{product.tagline}</p>
        <div className="mt-3 flex items-end gap-2">
          <span className="text-xl font-black text-slate-950">₹{product.price}</span>
          {product.mrp && product.mrp > product.price && <span className="mb-0.5 text-xs text-slate-400 line-through">₹{product.mrp}</span>}
        </div>
        <span className="mt-1 text-[11px] font-bold text-slate-400">{product.uom}</span>
        <button type="button" onClick={() => { addItem({ slug: product.slug, name: product.name, uom: product.uom, price: product.price }); toast.success(`${product.name} added to cart`); }} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#073b71] py-3 text-sm font-black text-white shadow-md transition hover:bg-green-600">
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
