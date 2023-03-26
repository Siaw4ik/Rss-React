import { render } from '@testing-library/react';
import React from 'react';
import { createRef } from 'react';
import { resetInputRefForm } from '../../components/resetInputRefForm';

describe('resetInputRefForm', () => {
  it('should reset all input and select fields', () => {
    const productNameRef = createRef<HTMLInputElement>();
    const descriptionRef = createRef<HTMLTextAreaElement>();
    const addedDateRef = createRef<HTMLInputElement>();
    const categoryRef = createRef<HTMLSelectElement>();
    const availableRef = createRef<HTMLInputElement>();
    const unavailableRef = createRef<HTMLInputElement>();
    const priceRef = createRef<HTMLInputElement>();
    const countRef = createRef<HTMLInputElement>();
    const consentRef = createRef<HTMLInputElement>();
    const pictureRef = createRef<HTMLInputElement>();

    render(
      <div>
        <input ref={productNameRef} type="text" defaultValue="Product Name" />
        <textarea ref={descriptionRef} defaultValue="Product Description" />
        <input ref={addedDateRef} type="date" defaultValue="2022-01-01" />
        <select ref={categoryRef} defaultValue="Category">
          <option value="Category">Category</option>
        </select>
        <input ref={availableRef} type="radio" name="availability" value="available" />
        <input ref={unavailableRef} type="radio" name="availability" value="unavailable" />
        <input ref={priceRef} type="text" defaultValue="10.99" />
        <input ref={countRef} type="number" defaultValue="1" />
        <input ref={consentRef} type="checkbox" />
        <input ref={pictureRef} type="file" />
      </div>
    );

    resetInputRefForm(
      productNameRef,
      descriptionRef,
      addedDateRef,
      categoryRef,
      availableRef,
      unavailableRef,
      priceRef,
      countRef,
      consentRef,
      pictureRef
    );

    expect(productNameRef.current?.value).toBe('');
    expect(descriptionRef.current?.value).toBe('');
    expect(addedDateRef.current?.value).toBe('');
    expect(categoryRef.current?.value).toBe('');
    expect(availableRef.current?.checked).toBe(false);
    expect(unavailableRef.current?.checked).toBe(false);
    expect(priceRef.current?.value).toBe('');
    expect(countRef.current?.value).toBe('');
    expect(consentRef.current?.checked).toBe(false);
    expect(pictureRef.current?.value).toBe('');
  });
});
