import { FormProps } from '../date/types_date';
import React from 'react';
import { useForm } from 'react-hook-form';
import { PersonForm } from '../date/types_date';
import { useDispatch } from 'react-redux';
import { addPerson } from '../redux/features/formSlice';

export function Form({ showModalWindow }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PersonForm>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
  const dispatch = useDispatch();

  const onSubmit = (data: PersonForm) => {
    const person = {
      name: data.name,
      date: data.date,
      gender: data.gender,
      species: data.species,
      status: data.status,
      consent: data.consent,
      location: data.location,
      imageUrl: data.imageUpload ? URL.createObjectURL(data.imageUpload[0]) : '',
    };

    dispatch(addPerson(person));
    reset();
    showModalWindow();
    setTimeout(() => {
      showModalWindow();
    }, 2000);
  };

  return (
    <form className="wrapper_form" onSubmit={handleSubmit(onSubmit)} data-testid="form">
      <div className="forms_div">
        <p className="forms_div-title">Name</p>
        <input
          data-testid="name-input"
          type="text"
          {...register('name', {
            required: 'Enter a value in the field',
            validate: (value) =>
              value[0] === value[0].toUpperCase() || 'Value must start with a capital letter',
          })}
        />
        {errors.name && (
          <span className="error" role="alert">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="forms_div">
        <p className="forms_div-title">Species</p>
        <select
          data-testid="category-select"
          defaultValue=""
          {...register('species', { required: 'Сhoose a value in the field' })}
        >
          <option value="">--Select species--</option>
          <option value="Alien">Alien</option>
          <option value="Animal">Animal</option>
          <option value="Disease">Disease</option>
          <option value="Fish">Fish</option>
          <option value="Human">Human</option>
          <option value="Humanoid">Humanoid</option>
          <option value="Human with giant head">Human with giant head</option>
          <option value="Mythological Creature">Mythological Creature</option>
          <option value="Poopybutthole">Poopybutthole</option>
          <option value="Robot">Robot</option>
          <option value="Unknown">Unknown</option>
        </select>
        {errors.species && (
          <span className="error" role="alert">
            {errors.species.message}
          </span>
        )}
      </div>

      <div className="forms_div">
        <p className="forms_div-title">Status</p>
        <select
          defaultValue=""
          {...register('status', { required: 'Сhoose a value in the field' })}
        >
          <option value="">--Select status--</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="Unknown">Unknown</option>
        </select>
        {errors.status && (
          <span className="error" role="alert">
            {errors.status.message}
          </span>
        )}
      </div>

      <div className="forms_div">
        <p className="forms_div-title">Location</p>
        <input
          type="text"
          {...register('location', {
            required: 'Enter a value in the field',
          })}
        />
        {errors.location && (
          <span className="error" role="alert">
            {errors.location.message}
          </span>
        )}
      </div>

      <div className="forms_div-column">
        <p className="forms_div-title">Gender</p>
        <div className="wrapper_radios">
          <div>
            <p>Male</p>
            <input
              data-testid="presence-radio1"
              type="radio"
              value="Male"
              {...register('gender', { required: 'Сhoose one of the values' })}
            />
          </div>
          <div>
            <p>Female</p>
            <input
              type="radio"
              value="Female"
              data-testid="presence-radio2"
              {...register('gender', { required: 'Сhoose one of the values' })}
            />
          </div>
        </div>
        {errors.gender && (
          <span className="error" role="alert">
            {errors.gender.message}
          </span>
        )}
      </div>

      <div className="forms_div">
        <p className="forms_div-title">Date of person created</p>
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
        {errors.date && (
          <span className="error" role="alert">
            {errors.date.message}
          </span>
        )}
      </div>

      <div className="forms_div-column">
        <p className="forms_div-title">Upload picture</p>
        <input
          data-testid="image-input"
          type="file"
          accept="image/*"
          {...register('imageUpload', { required: 'Upload a picture' })}
        />
        {errors.imageUpload && (
          <span className="error" role="alert">
            {errors.imageUpload.message}
          </span>
        )}
      </div>

      <div className="forms_div">
        <p className="forms_div-title">I consent to the processing data</p>
        <input
          type="checkbox"
          value="true"
          data-testid="consent-check"
          defaultChecked={false}
          {...register('consent', {
            required: 'Consent must be given',
          })}
        />
        {errors.consent && (
          <span className="error" role="alert">
            {errors.consent.message}
          </span>
        )}
      </div>
      <div className="forms_div buttons">
        <div data-testid="resetBtn" className="resetBtn" onClick={() => reset()}>
          Reset
        </div>
        <button data-testid="button" className="btnForm">
          Create product
        </button>
      </div>
    </form>
  );
}
