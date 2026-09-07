import acid from "@/assets/products/Products-nobackground/Acid Cleaner.png";
import balm from "@/assets/products/Products-nobackground/Pain Relif Balm.png";
import copper from "@/assets/products/Products-nobackground/Copper-Cleaner.png";
import detergentPowder from "@/assets/products/Products-nobackground/Detergent Powder.png";
import dishWash from "@/assets/products/Products-nobackground/Dish Wash.png";
import floorCleaner from "@/assets/products/Products-nobackground/Floor Cleaner.png";
import handWash from "@/assets/products/Products-nobackground/Hand Wash.png";
import liquidDetergent from "@/assets/products/Products-nobackground/Liquid Detergent.png";
import phenyl from "@/assets/products/Products-nobackground/Phenyl.png";
import roseWater from "@/assets/products/Products-nobackground/Rose Water.png";
import soapOil from "@/assets/products/Products-nobackground/Soap Oil.png";
import toiletCleaner from "@/assets/products/Products-nobackground/Toilet Cleaner.png";
import vaseline from "@/assets/products/Products-nobackground/Vaseline.png";

export const productImages: Record<string, string> = {
  acid,
  "zandu-balm": balm,
  "copper-cleaning-liquid": copper,
  "detergent-powder": detergentPowder,
  "dish-wash": dishWash,
  "floor-cleaner": floorCleaner,
  "hand-wash": handWash,
  "liquid-detergent": liquidDetergent,
  phenyl,
  "rose-water": roseWater,
  "soap-oil": soapOil,
  "toilet-cleaner": toiletCleaner,
  vaseline,
};

export const getProductImage = (slug: string) => productImages[slug] ?? copper;
