import { FormProps } from '../date/types_date';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type ProductforForm = {
  name: string;
  description: string;
  price: number;
  count: number;
  date: string;
  category: string;
  availability: string;
  consent: string;
  image: FileList;
};

export function Form({ addProduct, showModalWindow }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<ProductforForm>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const onSubmit = (data: ProductforForm) => {
    console.log(data);
    const product = {
      title: data.name,
      description: data.description,
      date: data.date,
      category: data.category,
      presence: data.availability,
      count: data.count,
      price: data.price,
      consent: data.consent,
      image: URL.createObjectURL(data.image[0]),
    };
    console.log(product);
    addProduct(product);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      showModalWindow();
      setTimeout(() => {
        showModalWindow();
      }, 2000);
    }
  }, [isSubmitSuccessful, reset, showModalWindow]);

  return (
    <form className="wrapper_form" onSubmit={handleSubmit(onSubmit)} data-testid="form">
      <div className="forms_div">
        <p className="forms_div-title">Name of product</p>
        <input
          data-testid="name-input"
          type="text"
          {...register('name', {
            required: 'Enter a value in the field',
            validate: (value) =>
              value[0] === value[0].toUpperCase() || 'Value must start with a capital letter',
          })}
        />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>

      <div className="forms_div-column">
        <p className="forms_div-title">Description of product</p>
        <textarea
          data-testid="description-input"
          {...register('description', {
            required: 'Enter a value in the field',
            validate: (value) => value.split(' ').length > 2 || 'Value must be at least 3 words',
          })}
          cols={40}
          rows={2}
        />
        {errors.description && <span className="error">{errors.description.message}</span>}
      </div>

      <div className="forms_div">
        <div className="forms_div form-price">
          <p className="forms_div-title">Price</p>
          <input
            data-testid="price-input"
            type="number"
            {...register('price', { required: 'Enter a value in the field' })}
          />
          <span className="error">{errors.price && errors.price.message}</span>
        </div>

        <div className="forms_div form-count">
          <p className="forms_div-title">Count</p>
          <input
            data-testid="count-input"
            type="number"
            {...register('count', { required: 'Enter a value in the field' })}
          />
          <span className="error">{errors.count && errors.count.message}</span>
        </div>
      </div>

      <div className="forms_div">
        <p className="forms_div-title">Date of added product</p>
        <input
          data-testid="date-input"
          type="date"
          {...register('date', {
            required: 'Enter a value in the field',
            validate: (value) =>
              value.split('-')[0] === String(new Date().getFullYear()) ||
              'You entered the wrong year',
          })}
        />
        <span className="error">{errors.date && errors.date.message}</span>
      </div>

      <div className="forms_div">
        <p className="forms_div-title">Select product category</p>
        <select
          data-testid="category-select"
          defaultValue=""
          {...register('category', { required: 'Сhoose a value in the field' })}
        >
          <option value="">--Select category--</option>
          <option value="men's clothing">Men&#x60;s clothing</option>
          <option value="women's clothing">Women&#x60;s clothing</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="another category">Another category</option>
        </select>
        <span className="error">{errors.category && errors.category.message}</span>
      </div>

      <div className="forms_div-column">
        <p className="forms_div-title">Product availability</p>
        <div className="wrapper_radios">
          <div>
            <p>available</p>
            <input
              data-testid="presence-radio1"
              type="radio"
              value="available"
              {...register('availability', { required: 'Сhoose one of the values' })}
            />
          </div>
          <div>
            <p>unavailable</p>
            <input
              type="radio"
              value="unavailable"
              data-testid="presence-radio2"
              {...register('availability', { required: 'Сhoose one of the values' })}
            />
          </div>
        </div>
        <span className="error">{errors.availability && errors.availability.message}</span>
      </div>

      <div className="forms_div-column">
        <p className="forms_div-title">Upload picture</p>
        <input
          data-testid="image-input"
          type="file"
          accept="image/*"
          {...register('image', { required: 'Upload a picture' })}
        />
        <span className="error">{errors.image && errors.image.message}</span>
      </div>

      <div className="forms_div">
        <p className="forms_div-title">I consent to the processing of product data</p>
        <input
          type="checkbox"
          value="true"
          data-testid="consent-check"
          defaultChecked={false}
          {...register('consent', {
            required: 'The product will not be added until you give permission',
          })}
        />
        <span className="error">{errors.consent && errors.consent.message}</span>
      </div>
      <div className="forms_div buttons">
        <div className="resetBtn" onClick={() => reset()}>
          Reset
        </div>
        <button data-testid="button" className="btnForm">
          Create product
        </button>
      </div>
    </form>
  );
}
