import { ProductForm } from '../date/types_date';
import React, { Component, RefObject, ChangeEvent } from 'react';

interface FormProps {
  addProduct: (product: ProductForm) => void;
  showModalWindow: () => void;
}

interface FormState {
  pictureUrl?: string;
}

export class Form extends Component<FormProps, FormState> {
  productNameRef: RefObject<HTMLInputElement>;
  descriptionRef: RefObject<HTMLTextAreaElement>;
  addedDateRef: RefObject<HTMLInputElement>;
  categoryRef: RefObject<HTMLSelectElement>;
  availableRef: RefObject<HTMLInputElement>;
  unavailableRef: RefObject<HTMLInputElement>;
  priceRef: RefObject<HTMLInputElement>;
  countRef: RefObject<HTMLInputElement>;
  consentRef: RefObject<HTMLInputElement>;
  pictureRef: RefObject<HTMLInputElement>;

  constructor(props: FormProps) {
    super(props);

    this.productNameRef = React.createRef();
    this.descriptionRef = React.createRef();
    this.addedDateRef = React.createRef();
    this.categoryRef = React.createRef();
    this.availableRef = React.createRef();
    this.unavailableRef = React.createRef();
    this.priceRef = React.createRef();
    this.countRef = React.createRef();
    this.consentRef = React.createRef();
    this.pictureRef = React.createRef();

    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  handleSubmitForm(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const titleValue = this.productNameRef.current?.value || '';
    const descriptionValue = this.descriptionRef.current?.value || '';
    const dateValue = this.addedDateRef.current?.value || '';
    const categoryValue = this.categoryRef.current?.value || '';
    const availableChek = this.availableRef.current?.checked;
    const availableValue = this.availableRef.current?.value || '';
    const unavailableValue = this.unavailableRef.current?.value || '';
    const priceValue = this.priceRef.current?.value || '';
    const countValue = this.countRef.current?.value || '';
    const consentValue = this.consentRef.current?.value || '';

    let imageValueUrl;
    if (this.pictureRef.current?.files !== undefined && this.pictureRef.current?.files) {
      imageValueUrl = URL.createObjectURL(this.pictureRef.current?.files[0]);
    }

    const product = {
      title: titleValue,
      description: descriptionValue,
      date: dateValue,
      category: categoryValue,
      presence: availableChek ? availableValue : unavailableValue,
      price: priceValue,
      count: countValue,
      consent: consentValue,
      image: imageValueUrl,
    };
    console.log(product);

    this.props.addProduct(product);
    this.props.showModalWindow();
    setTimeout(() => {
      this.props.showModalWindow();
    }, 1000);

    if (this.productNameRef.current) this.productNameRef.current.value = '';
    if (this.descriptionRef.current) this.descriptionRef.current.value = '';
    if (this.addedDateRef.current) this.addedDateRef.current.value = '';
    if (this.categoryRef.current) this.categoryRef.current.value = '';
    if (this.priceRef.current) this.priceRef.current.value = '';
    if (this.countRef.current) this.countRef.current.value = '';
    if (this.availableRef.current) this.availableRef.current.checked = false;
    if (this.unavailableRef.current) this.unavailableRef.current.checked = false;
    if (this.consentRef.current) this.consentRef.current.checked = false;
    if (this.pictureRef.current) this.pictureRef.current.value = '';
  }
  render() {
    return (
      <form className="wrapper_form" onSubmit={this.handleSubmitForm}>
        <div className="forms_div">
          <p className="forms_div-title">Name of product</p>
          <input type="text" ref={this.productNameRef} />
        </div>

        <div className="forms_div-column">
          <p className="forms_div-title">Description of product</p>
          <textarea ref={this.descriptionRef} cols={40} rows={2} />
        </div>

        <div className="forms_div">
          <div className="forms_div form-price">
            <p className="forms_div-title">Price</p>
            <input type="number" ref={this.priceRef} />
          </div>

          <div className="forms_div form-count">
            <p className="forms_div-title">Count</p>
            <input type="number" ref={this.countRef} />
          </div>
        </div>

        <div className="forms_div">
          <p className="forms_div-title">Date of added product</p>
          <input type="date" ref={this.addedDateRef} />
        </div>

        <div className="forms_div">
          <p className="forms_div-title">Select product category</p>
          <select name="category" ref={this.categoryRef} defaultValue="">
            <option value="">--Select category--</option>
            <option value="men's clothing">Men&#x60;s clothing</option>
            <option value="women's clothing">Women&#x60;s clothing</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="another category">Another category</option>
          </select>
        </div>
        <div className="forms_div-column">
          <p className="forms_div-title">Product availability</p>
          <div className="wrapper_radios">
            <div>
              <p>available</p>
              <input type="radio" name="availability" value="available" ref={this.availableRef} />
            </div>
            <div>
              <p>unavailable</p>
              <input
                type="radio"
                name="availability"
                value="unavailable"
                ref={this.unavailableRef}
              />
            </div>
          </div>
        </div>

        <div className="forms_div">
          <p>I consent to the processing of product data</p>
          <input
            type="checkbox"
            name="gender"
            value="true"
            ref={this.consentRef}
            defaultChecked={false}
          />
        </div>

        <div className="forms_div-column">
          <p className="forms_div-title">Upload picture</p>
          <input type="file" accept="image/*" ref={this.pictureRef} />
        </div>
        <input type="submit" className="btnForm" value="Create product" />
      </form>
    );
  }
}
