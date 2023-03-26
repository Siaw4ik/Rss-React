import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import { CardForm } from '../../components/CardForm';

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

const mockProductForm = {
  title: 'Product',
  description: 'product product roduct',
  date: '2023-05-03',
  category: 'jewelery',
  presence: 'available',
  count: 22,
  price: 22,
  consent: 'true',
  image: 'https://i.pinimg.com/564x/6f/4b/b0/6f4bb0df17555f2b09bad03b0d828c65.jpg',
};

describe('test Card', () => {
  it('renders card', () => {
    const { getByText, getByAltText } = render(<CardForm product={mockProductForm} key={2} />);

    expect(getByAltText('image product')).toHaveAttribute('src', mockProductForm.image);
    expect(getByText(mockProductForm.title)).toBeInTheDocument();
    expect(getByText(mockProductForm.description)).toBeInTheDocument();
    expect(getByText(mockProductForm.category)).toBeInTheDocument();
    expect(getByText(`Count: ${mockProductForm.count}`)).toBeInTheDocument();
    expect(getByText(`Price: $${mockProductForm.price}`)).toBeInTheDocument();
    expect(getByText(mockProductForm.presence)).toBeInTheDocument();
    expect(getByText(mockProductForm.date)).toBeInTheDocument();
  });
});
