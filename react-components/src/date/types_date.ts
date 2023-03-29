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
  image: string;
};

export interface CardFormProps {
  product: ProductForm;
}

export interface FormState {
  titleError: string;
  descriptionError: string;
  dateError: string;
  categoryError: string;
  presenceError: string;
  priceError: string;
  countError: string;
  consentError: string;
  imageError: string;
}

export interface FormProps {
  addProduct: (product: ProductForm) => void;
  showModalWindow: () => void;
}

export interface FormPageProps {
  a?: string;
}

export interface FormPageState {
  products: ProductForm[];
  isActive: boolean;
}

export interface CardState {
  a?: string;
}
