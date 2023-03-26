import { RefObject } from 'react';

export function resetInputRefForm(
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
  if (productName.current) productName.current.value = '';
  if (description.current) description.current.value = '';
  if (addedDate.current) addedDate.current.value = '';
  if (category.current) category.current.value = '';
  if (price.current) price.current.value = '';
  if (count.current) count.current.value = '';
  if (available.current) available.current.checked = false;
  if (unavailable.current) unavailable.current.checked = false;
  if (consent.current) consent.current.checked = false;
  if (picture.current) picture.current.value = '';
}
