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
  like?: boolean;
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
