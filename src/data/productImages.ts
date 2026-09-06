import acid from "@/assets/products/Acid-Cleaner.png";
import balm from "@/assets/products/Balm.png";
import copper from "@/assets/products/Copper-Cleaner.png";
import detergentPowder from "@/assets/products/Detergent-Powder.png";
import dishWash from "@/assets/products/Dish-Wash.png";
import floorCleaner from "@/assets/products/Floor-Cleaner.png";
import handWash from "@/assets/products/Hand-Wash.png";
import liquidDetergent from "@/assets/products/Liquid-Detergent.png";
import phenyl from "@/assets/products/Phenyl.png";
import roseWater from "@/assets/products/Rose-Water.png";
import soapOil from "@/assets/products/Soap-Oil.png";
import toiletCleaner from "@/assets/products/Toilet-Cleaner.png";
import vaseline from "@/assets/products/Vaseline.png";

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

export const getProductImage = (slug: string) =>
  productImages[slug] ?? copper;
