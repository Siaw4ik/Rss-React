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

export interface IdProps {
  id: number;
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

export interface FormProps {
  addProduct: (product: ProductForm) => void;
  showModalWindow: () => void;
}

export type InputForm = {
  name: string;
  description: string;
  price: number;
  count: number;
  date: string;
  category: string;
  availability: string;
  consent: string;
  image: FileList;
};