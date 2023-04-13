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
  onShowDetails: () => void;
}

export interface CardDetailsProps {
  // person: Person | null;
  onClose: () => void;
  /*   onError: boolean;
  onLoading: boolean; */
}

export interface ErrorProps {
  onError: boolean;
}

export interface ProductProps {
  product: Product;
}

export interface IdProps {
  id: number;
}

/* export interface SearchBarProps {
  onHandleSearch: () => void;
  onHandleLocalStorage: (value: string) => void;
  inputValue: string;
  onSubmitForm: () => void;
} */

export type PersonForm = {
  name: string;
  date: string;
  species: string;
  status: string;
  gender: string;
  consent: string;
  location: string;
  imageUrl?: string;
  imageUpload?: FileList | null;
};

export interface CardFormProps {
  person: PersonForm;
}

export interface FormProps {
  showModalWindow: () => void;
}

export interface CardListProps {
  persons: Person[];
  onShowDetails: () => void;
}
