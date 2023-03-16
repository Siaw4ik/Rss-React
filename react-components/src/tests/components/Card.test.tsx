import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import { Card } from '../../components/Card';

let container: HTMLDivElement | null = null;
beforeEach(() => {
  container = document.createElement('div') as HTMLDivElement;
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container as Element);
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
});

const mockProduct = {
  id: 20,
  title: 'DANVOUY Womens T Shirt Casual Cotton Short',
  price: 12.99,
  description:
    '95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.',
  category: "women's clothing",
  image: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
  rating: {
    rate: 3.6,
    count: 145,
  },
  like: false,
};

describe('test Card', () => {
  it('renders card', () => {
    render(<Card product={mockProduct} key={mockProduct.id} />);
    const card = screen.getByTestId('card');
    const showDetails = screen.getByTestId('show-details');
    const ratingProduct = screen.getByTestId('rating-product');

    expect(ratingProduct).toBeEmptyDOMElement();
    expect(card).toBeInTheDocument();
    expect(screen.getByText('Show details')).toBeInTheDocument();
    fireEvent.click(showDetails);
    expect(ratingProduct).not.toBeEmptyDOMElement();
    expect(screen.getByText('Hide details')).toBeInTheDocument();
  });
});
