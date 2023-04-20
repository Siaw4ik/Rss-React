global.URL.createObjectURL = jest.fn();
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Form } from '../../components/Form';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { addPerson } from '../../redux/features/formSlice';

describe('Form Page', () => {
  const addProduct = jest.fn();
  const showModalWindow = jest.fn();
  const mockDispatch = jest.spyOn(store, 'dispatch');
  it('submitting the form calls the addProduct and showModalWindow functions', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Form showModalWindow={showModalWindow} />
      </Provider>
    );

    const file = new File(['test'], 'test.png', { type: 'image/png' });

    fireEvent.change(getByTestId('name-input'), { target: { value: 'SlawaProduct' } });
    fireEvent.change(getByTestId('species-select'), { target: { value: 'Animal' } });
    fireEvent.change(getByTestId('status-select'), { target: { value: 'Alive' } });
    fireEvent.change(getByTestId('location-input'), { target: { value: 'planet' } });
    fireEvent.click(getByTestId('gender-radio1'));
    fireEvent.change(getByTestId('date-input'), { target: { value: '2023-03-26' } });
    fireEvent.change(getByTestId('image-input'), { target: { files: [file] } });
    fireEvent.click(getByTestId('consent-check'));
    fireEvent.click(getByTestId('button'));

    const mockPersonForm = {
      name: 'SlawaProduct',
      species: 'Animal',
      date: '2023-03-26',
      status: 'Alive',
      gender: 'Male',
      location: 'planet',
      consent: 'true',
      imageUrl: URL.createObjectURL(file),
    };

    waitFor(() => {
      const cardTitle = screen.getByText('SlawaProduct');
      expect(cardTitle).toBeInTheDocument();
      expect(addProduct).toHaveBeenCalledTimes(1);
      expect(showModalWindow).toHaveBeenCalledTimes(2);

      expect(mockDispatch).toHaveBeenCalledWith(addPerson(mockPersonForm));
      expect(getByTestId('card')).toBeInTheDocument();

      expect(getByTestId('name-input')).toHaveValue('');
      expect(getByTestId('location-input')).toHaveValue('');
      expect(getByTestId('date-input')).toHaveValue('');
    });
  });

  it('should form reset', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Form showModalWindow={showModalWindow} />
      </Provider>
    );

    fireEvent.change(getByTestId('name-input'), { target: { value: 'SlawaProduct' } });
    fireEvent.change(getByTestId('location-input'), { target: { value: 'planet' } });

    fireEvent.click(screen.getByTestId('resetBtn'));

    waitFor(() => {
      expect(getByTestId('name-input')).toHaveValue('');
      expect(getByTestId('location-input')).toHaveValue('');
    });
  });
});
