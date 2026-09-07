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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/product/${product.slug}`} className="relative block bg-gradient-to-b from-white to-slate-50 px-4 pt-4">
        <div className="absolute left-4 top-4 z-10 rounded-full bg-green-600 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white">
          {discount >= 20 ? "Best Seller" : discount > 0 ? "Popular" : "New"}
        </div>
        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={(e) => e.preventDefault()}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-400 shadow-sm hover:text-pink-500"
        >
          <Heart className="h-4 w-4" />
        </button>
        <div className="flex h-52 items-center justify-center sm:h-56">
          <img
            src={getProductImage(product.slug)}
            alt={`Urban Shine ${product.name}`}
            loading="lazy"
            width={600}
            height={600}
            className="h-full w-full object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 pt-2">
        <Link to={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[42px] text-base font-extrabold leading-5 text-slate-900 hover:text-blue-700">
            Urban Shine {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-xs text-slate-500 line-clamp-1">{product.tagline}</p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xl font-black text-slate-950">₹{product.price}</span>
          {product.mrp && product.mrp > product.price && (
            <span className="text-xs text-slate-400 line-through">₹{product.mrp}</span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-black text-green-700">
              {discount}% OFF
            </span>
          )}
        </div>
        <span className="mt-1 text-[11px] font-semibold text-slate-400">{product.uom}</span>

        <button
          type="button"
          onClick={() => {
            addItem({ slug: product.slug, name: product.name, uom: product.uom, price: product.price });
            toast.success(`${product.name} added to cart`);
          }}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 py-3 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-blue-800"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
