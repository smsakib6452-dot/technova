export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
};

export type ProductBadge = 'new' | 'sale' | 'bestseller';

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  image: string;
  images: string[];
  stock: number;
  badge?: ProductBadge;
  featured?: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
