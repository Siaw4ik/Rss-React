global.URL.createObjectURL = jest.fn();
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import { FormsPage } from '../../pages/FormsPage';

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

describe('Form Page', () => {
  const showModalWindow = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders about page', () => {
    render(
      <BrowserRouter>
        <FormsPage />
      </BrowserRouter>
    );
    const formTitle = screen.getByTestId('formpage-formtitle');
    expect(formTitle).toBeInTheDocument();
    const formCardsTirle = screen.getByTestId('formpage-cardsformtitle');
    expect(formCardsTirle).toBeInTheDocument();
  });

  it('submitting the form calls the addProduct and showModalWindow functions', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <FormsPage />
      </BrowserRouter>
    );
    const file = new File(['test'], 'test.png', { type: 'image/png' });

    const containerCards = getByTestId('containerCards');
    expect(containerCards.children.length).toBe(0);

    fireEvent.change(getByTestId('name-input'), { target: { value: 'SlawaProduct' } });
    fireEvent.change(getByTestId('description-input'), {
      target: { value: 'Product product product' },
    });
    fireEvent.change(getByTestId('price-input'), { target: { value: '10' } });
    fireEvent.change(getByTestId('count-input'), { target: { value: '5' } });
    fireEvent.change(getByTestId('category-select'), { target: { value: 'jewelery' } });
    fireEvent.click(getByTestId('presence-radio1'));
    fireEvent.change(getByTestId('date-input'), { target: { value: '2023-03-26' } });
    fireEvent.click(getByTestId('consent-check'));
    fireEvent.change(getByTestId('image-input'), { target: { files: [file] } });
    fireEvent.click(getByTestId('button'));

    waitFor(() => {
      const cardTitle = screen.getByText('SlawaProduct');
      expect(cardTitle).toBeInTheDocument();
      expect(showModalWindow).toHaveBeenCalled();
      expect(containerCards.children.length).toBe(1);
    });
  });
});
