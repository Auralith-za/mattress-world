export type BedSize = 'single' | 'threeQuarter' | 'double' | 'queen' | 'king';
export type BedLength = 'standard' | 'extraLength';
export type ProductType = 'set' | 'mattressOnly';

export interface PriceMatrix {
  single?: number;
  threeQuarter?: number;
  double?: number;
  queen?: number;
  king?: number;
}

export interface ProductPrices {
  set: PriceMatrix;
  mattressOnly?: PriceMatrix;
  extraLengthSet?: PriceMatrix;
  extraLengthMattressOnly?: PriceMatrix;
}

export interface Product {
  id: string;
  name: string;
  brand: 'Mattress World' | 'Cloud Nine' | 'Rest Assured' | string;
  range: string;
  category: 'Orthopedic' | 'Hospitality' | 'High Density Foam' | 'Pocket Spring' | 'Adjustable Motion' | 'Bonnell Spring' | string;
  feel: 'Medium' | 'Medium Firm' | 'Firm' | 'Luxury Plush' | string;
  firmnessRating: number; // 1 to 10
  weightLimitKg: number; // weight capacity per side
  guaranteeYears: number;
  warrantyYears: number;
  isTurnable: boolean;
  technology: string;
  description: string;
  features: string[];
  image: string;
  secondaryImage?: string;
  brandLogo: string;
  prices: ProductPrices;
  availableSizes: BedSize[];
  supportsExtraLength: boolean;
  supportsMattressOnly: boolean;
  externalLink?: string;
}

export interface CartItem {
  id: string; // unique cart item id
  product: Product;
  size: BedSize;
  length: BedLength;
  type: ProductType;
  quantity: number;
  price: number;
}

export interface RoomPreset {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  wallColor: string;
  floorColor: string;
  image: string;
  recommendedBedSizes: BedSize[];
}

export interface QuizAnswers {
  sleepingPosition?: 'side' | 'back' | 'stomach' | 'combination';
  weightRating?: 'under100' | '120' | '130' | '150plus';
  feelPreference?: 'medium' | 'mediumFirm' | 'firm';
  hasBackPain?: boolean;
  bedType?: 'set' | 'mattressOnly';
  desiredSize?: BedSize;
}
