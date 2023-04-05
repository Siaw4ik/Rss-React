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

export interface Person {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface RickMortiResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: Person[];
}

export interface CardProps {
  person: Person;
  onCardClick: (card: Person) => void;
}

export interface CardDetailsProps {
  person: Person | null;
  onClose: () => void;
}

export interface ProductProps {
  product: Product;
}

export interface IdProps {
  id: number;
}

export interface SearchBarProps {
  onHandleSearch: () => void;
  onHandleLocalStorage: (value: string) => void;
  inputValue: string;
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

export interface CardListProps {
  persons: Person[];
  onCardClick: (card: Person) => void;
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
