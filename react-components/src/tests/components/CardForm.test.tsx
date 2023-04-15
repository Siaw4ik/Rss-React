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

const mockPersonForm = {
  name: 'Product',
  species: 'Animal',
  date: '2023-05-03',
  status: 'Alive',
  gender: 'Male',
  location: 'planet',
  consent: 'true',
  imageUrl: 'https://i.pinimg.com/564x/6f/4b/b0/6f4bb0df17555f2b09bad03b0d828c65.jpg',
};

describe('test Card', () => {
  it('renders card', () => {
    const { getByText, getByAltText } = render(<CardForm person={mockPersonForm} key={2} />);

    expect(getByAltText('image product')).toHaveAttribute('src', mockPersonForm.imageUrl);
    expect(getByText(mockPersonForm.name)).toBeInTheDocument();
    expect(getByText('Species: Animal')).toBeInTheDocument();
    expect(getByText('Status: Alive')).toBeInTheDocument();
    expect(getByText('Gender: Male')).toBeInTheDocument();
    expect(getByText('Location: planet')).toBeInTheDocument();
    expect(getByText(mockPersonForm.date)).toBeInTheDocument();
  });
});
