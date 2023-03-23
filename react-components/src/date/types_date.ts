export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductProps {
  product: Product;
}

export interface ShowState {
  isActive: boolean;
}

export interface IdProps {
  id: number;
}
export interface LikeState {
  isLike: boolean;
}

export type ProductForm = {
  title: string;
  description: string;
  date: string;
  category: string;
  presence: string;
  count: number | string;
  price: number | string;
  consent: string;
  image: string | undefined;
};

export interface CardFormProps {
  product: ProductForm;
}
