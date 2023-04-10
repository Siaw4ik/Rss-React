global.URL.createObjectURL = jest.fn();
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Form } from '../../components/Form';

describe('Form Page', () => {
  const addProduct = jest.fn();
  const showModalWindow = jest.fn();
  it('submitting the form calls the addProduct and showModalWindow functions', async () => {
    const { getByTestId } = render(
      <Form addProduct={addProduct} showModalWindow={showModalWindow} />
    );

    const file = new File(['test'], 'test.png', { type: 'image/png' });

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
    fireEvent.click(screen.getByTestId('button'));

    waitFor(() => {
      const cardTitle = screen.getByText('SlawaProduct');
      expect(cardTitle).toBeInTheDocument();
      expect(addProduct).toHaveBeenCalledTimes(1);
      expect(showModalWindow).toHaveBeenCalledTimes(2);
    });
  });

  it('should form reset', async () => {
    const { getByTestId } = render(
      <Form addProduct={addProduct} showModalWindow={showModalWindow} />
    );

    fireEvent.change(getByTestId('name-input'), { target: { value: 'SlawaProduct' } });
    fireEvent.change(getByTestId('description-input'), {
      target: { value: 'Product product product' },
    });

    fireEvent.click(screen.getByTestId('resetBtn'));

    waitFor(() => {
      expect(getByTestId('name-input')).toHaveValue('');
      expect(getByTestId('description-input')).toHaveValue('');
    });
  });
});
