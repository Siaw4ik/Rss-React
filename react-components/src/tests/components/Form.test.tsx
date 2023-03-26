global.URL.createObjectURL = jest.fn();
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Form } from '../../components/Form';

describe('Form Page', () => {
  jest.useFakeTimers();
  const addProduct = jest.fn();
  const showModalWindow = jest.fn();
  test('submitting the form calls the addProduct and showModalWindow functions', async () => {
    const { getByTestId } = render(
      <Form addProduct={addProduct} showModalWindow={showModalWindow} />
    );
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const url = URL.createObjectURL(file);

    fireEvent.change(getByTestId('name-input'), { target: { value: 'Product' } });
    fireEvent.change(getByTestId('description-input'), {
      target: { value: 'Product product product' },
    });
    fireEvent.change(getByTestId('price-input'), { target: { value: '10' } });
    fireEvent.change(getByTestId('count-input'), { target: { value: '5' } });
    fireEvent.change(getByTestId('category-select'), { target: { value: 'jewelery' } });
    fireEvent.click(getByTestId('presence-radio1'), { target: { checked: true } });
    fireEvent.change(getByTestId('date-input'), { target: { value: '2023-03-26' } });
    fireEvent.change(getByTestId('consent-check'), { target: { checked: true } });
    fireEvent.change(getByTestId('image-input'), { target: { files: [file] } });
    fireEvent.submit(getByTestId('form'));

    expect(addProduct).toHaveBeenCalledWith({
      title: 'Product',
      description: 'Product product product',
      date: '2023-03-26',
      category: 'jewelery',
      presence: 'available',
      price: '10',
      count: '5',
      consent: 'true',
      image: url,
    });
    await waitFor(() => expect(showModalWindow).toHaveBeenCalledTimes(1));

    jest.advanceTimersByTime(2000);

    await waitFor(() => expect(showModalWindow).toHaveBeenCalledTimes(2));
  });
});
