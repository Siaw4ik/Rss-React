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

  test('adds a new product to the list', async () => {
    render(<FormsPage />);
    const file = new File(['test'], 'test.png', { type: 'image/png' });

    const nameInput = screen.getByTestId('name-input');
    const priceInput = screen.getByTestId('price-input');
    const descriptionInput = screen.getByTestId('description-input');
    const countInput = screen.getByTestId('count-input');
    const dateInput = screen.getByTestId('date-input');
    const categorySelect = screen.getByTestId('category-select');
    const presenceRadio1 = screen.getByTestId('presence-radio1');
    const imageInput = screen.getByTestId('image-input');
    const consentCheckbox = screen.getByTestId('consent-check');
    const button = screen.getByTestId('button');

    fireEvent.change(nameInput, { target: { value: 'Product' } });
    fireEvent.change(priceInput, { target: { value: '10' } });
    fireEvent.change(descriptionInput, { target: { value: 'Product product product' } });
    fireEvent.change(countInput, { target: { value: 10 } });
    fireEvent.change(dateInput, { target: { value: '2023-03-26' } });
    fireEvent.change(categorySelect, { target: { value: 'jewelery' } });
    fireEvent.change(presenceRadio1, { target: { checked: true } });
    fireEvent.change(imageInput, { target: { files: [file] } });
    fireEvent.change(consentCheckbox, { target: { checked: true } });
    fireEvent.click(button);

    await waitFor(() => {
      const cardTitle = screen.getByText('Product');
      expect(cardTitle).toBeInTheDocument();
    });
  });
});

/* it('shows the modal window', () => {
    render(<FormsPage />);
    const showModalButton = screen.getByTestId('show-modal-button');

    fireEvent.click(showModalButton);

    const modalWindow = screen.getByText('Data saved, card created');
    expect(modalWindow).toBeInTheDocument();
  }); */
