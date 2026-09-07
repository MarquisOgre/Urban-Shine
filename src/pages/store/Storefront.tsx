import { useNavigate } from "react-router-dom";

const Storefront = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-white">
      <div className="relative mx-auto w-full max-w-[1536px] overflow-hidden">
        <img
          src="/homepage-reference.jpg"
          alt="Urban Shine homepage"
          className="block h-auto w-full select-none"
          draggable={false}
        />

        {/* Functional hotspots over the AI-generated reference image */}
        <button aria-label="Home" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="absolute left-[27%] top-[1.1%] h-[2.7%] w-[7%] cursor-pointer bg-transparent" />
        <button aria-label="Products" onClick={() => document.getElementById("products-hotspot")?.scrollIntoView({ behavior: "smooth" })} className="absolute left-[34%] top-[1.1%] h-[2.7%] w-[7%] cursor-pointer bg-transparent" />
        <button aria-label="Categories" onClick={() => document.getElementById("categories-hotspot")?.scrollIntoView({ behavior: "smooth" })} className="absolute left-[41%] top-[1.1%] h-[2.7%] w-[8%] cursor-pointer bg-transparent" />
        <button aria-label="Cart" onClick={() => navigate("/cart")} className="absolute right-[3%] top-[1%] h-[3%] w-[5%] cursor-pointer bg-transparent" />
        <button aria-label="Shop Products" onClick={() => document.getElementById("products-hotspot")?.scrollIntoView({ behavior: "smooth" })} className="absolute left-[4%] top-[17%] h-[3%] w-[16%] cursor-pointer bg-transparent" />
        <button aria-label="Explore Categories" onClick={() => document.getElementById("categories-hotspot")?.scrollIntoView({ behavior: "smooth" })} className="absolute left-[20%] top-[17%] h-[3%] w-[17%] cursor-pointer bg-transparent" />

        <span id="categories-hotspot" className="absolute left-0 top-[29%]" />
        <span id="products-hotspot" className="absolute left-0 top-[46%]" />
        <button aria-label="View All Products" onClick={() => navigate("/products")} className="absolute right-[3%] top-[46%] h-[3%] w-[18%] cursor-pointer bg-transparent" />
        <button aria-label="Shop Now" onClick={() => document.getElementById("products-hotspot")?.scrollIntoView({ behavior: "smooth" })} className="absolute left-[8%] top-[78%] h-[3%] w-[15%] cursor-pointer bg-transparent" />
      </div>
    </main>
  );
};

export default Storefront;
