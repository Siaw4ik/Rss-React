import { RefObject } from 'react';

/* export function validateTitle(productName: RefObject<HTMLInputElement>) {
  let titleErrorValue = '';
  const titleValue = productName.current?.value || '';
  if (titleValue === '') {
    titleErrorValue = 'Enter a value in the field';
  } else if (titleValue[0] !== titleValue[0].toUpperCase()) {
    titleErrorValue = 'Value must start with a capital letter';
  }
  return titleErrorValue;
} */

export function validateForms(
  productName: RefObject<HTMLInputElement>,
  description: RefObject<HTMLTextAreaElement>,
  addedDate: RefObject<HTMLInputElement>,
  category: RefObject<HTMLSelectElement>,
  available: RefObject<HTMLInputElement>,
  unavailable: RefObject<HTMLInputElement>,
  price: RefObject<HTMLInputElement>,
  count: RefObject<HTMLInputElement>,
  consent: RefObject<HTMLInputElement>,
  picture: RefObject<HTMLInputElement>
) {
  let titleErrorValue = '';
  let descriptionErrorValue = '';
  let dateErrorValue = '';
  let countErrorValue = '';
  let priceErrorValue = '';
  let categoryErrorValue = '';
  let presenceErrorValue = '';
  let consentErrorValue = '';
  let imageErrorValue = '';

  const titleValue = productName.current?.value || '';
  const descriptionValue = description.current?.value || '';
  const dateValue = addedDate.current?.value || '';
  const categoryValue = category.current?.value || '';
  const availableChek = available.current?.checked;
  const unavailableCheck = unavailable.current?.checked;
  const priceValue = price.current?.value || '';
  const countValue = count.current?.value || '';
  const consentCheck = consent.current?.checked;

  if (titleValue === '') {
    titleErrorValue = 'Enter a value in the field';
  } else if (titleValue[0] !== titleValue[0].toUpperCase()) {
    titleErrorValue = 'Value must start with a capital letter';
  }

  if (descriptionValue === '') {
    descriptionErrorValue = 'Enter a value in the field';
  } else if (descriptionValue.split(' ').length < 3) {
    descriptionErrorValue = 'Value must be at least 3 words';
  }

  if (dateValue === '') {
    dateErrorValue = 'Enter a value in the field';
  } else if (dateValue.split('-')[0] !== String(new Date().getFullYear())) {
    dateErrorValue = 'You entered the wrong year';
  }

  if (countValue === '') {
    countErrorValue = 'Enter a value in the field';
  }

  if (priceValue === '') {
    priceErrorValue = 'Enter a value in the field';
  }

  if (categoryValue === '') {
    categoryErrorValue = 'Сhoose a value in the field';
  }

  if (!availableChek && !unavailableCheck) {
    presenceErrorValue = 'Сhoose one of the values';
  }

  if (!consentCheck) {
    consentErrorValue = 'The product will not be added until you give permission';
  }

  if (!picture.current?.files?.[0]) {
    imageErrorValue = 'Upload a picture';
  }

  return {
    titleError: titleErrorValue,
    descriptionError: descriptionErrorValue,
    dateError: dateErrorValue,
    countError: countErrorValue,
    priceError: priceErrorValue,
    categoryError: categoryErrorValue,
    presenceError: presenceErrorValue,
    consentError: consentErrorValue,
    imageError: imageErrorValue,
  };
}
