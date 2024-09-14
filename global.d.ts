type MessageItem = {
  message: string
  user: boolean = true
}

interface ProductAnalysis {
  product_name: string | null;
  brand: string | null;
  quantity: string | null;
  weight: number | null;
  serving_size: string | null;
  nutrients: Nutrients | null;
  vitamins: string[] | null;
  minerals: string[] | null;
  ingredients: string[] | null;
  preservatives: string[] | null;
  artificial_additives: string[] | null;
  allergens: string[] | null;
  proprietary_claims: string[] | null;
  processed_level: string | null;
  nutrient_deficits: string[] | null; 
  keto_friendly: boolean | null;
  vegan: boolean | null;
  diabetic_friendly: boolean | null;
  health_analysis: string | null;
  brand_claims_validation: string | null;
}

interface Nutrients {
  calories: number | null;
  fats: Fats | null;
  sugars: number | null;
  sodium: number | null;
  protein: number | null;
  carbohydrates: number | null;
  fiber: number | null;
}

interface Fats {
  total: number | null;
  saturated_fats: number | null;
  trans_fats: number | null;
}