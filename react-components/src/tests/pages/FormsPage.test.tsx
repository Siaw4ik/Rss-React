import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { FormsPage } from '../../pages/FormsPage';
import { Provider } from 'react-redux';
import { setupStore } from '../../redux/store';

global.URL.createObjectURL = vi.fn();

const store = setupStore();

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
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form page', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormsPage />
        </BrowserRouter>
      </Provider>
    );
    const formTitle = screen.getByTestId('formpage-formtitle');
    expect(formTitle).toBeInTheDocument();
    const formCardsTirle = screen.getByTestId('formpage-cardsformtitle');
    expect(formCardsTirle).toBeInTheDocument();

    const showModalWindow = screen.getByTestId('show-modal-button');
    expect(showModalWindow).toHaveClass('modalWindow');
  });

  it('submitting the form calls the addProduct and showModalWindow functions', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <FormsPage />
        </BrowserRouter>
      </Provider>
    );
    const file = new File(['test'], 'test.png', { type: 'image/png' });

    const showModalWindow = screen.getByTestId('show-modal-button');
    expect(showModalWindow).toHaveClass('modalWindow');

    const containerCards = getByTestId('containerCards');
    expect(containerCards.children.length).toBe(0);

    fireEvent.change(getByTestId('name-input'), { target: { value: 'SlawaProduct' } });
    fireEvent.change(getByTestId('species-select'), { target: { value: 'Animal' } });
    fireEvent.change(getByTestId('status-select'), { target: { value: 'Alive' } });
    fireEvent.change(getByTestId('location-input'), { target: { value: 'planet' } });
    fireEvent.click(getByTestId('gender-radio1'));
    fireEvent.change(getByTestId('date-input'), { target: { value: '2023-03-26' } });
    fireEvent.change(getByTestId('image-input'), { target: { files: [file] } });
    fireEvent.click(getByTestId('consent-check'));
    fireEvent.click(getByTestId('button'));

    waitFor(() => {
      const cardTitle = screen.getByText('SlawaProduct');
      expect(cardTitle).toBeInTheDocument();
      expect(showModalWindow).toHaveBeenCalled();
      expect(containerCards.children.length).toBe(1);
    });
  });
});
