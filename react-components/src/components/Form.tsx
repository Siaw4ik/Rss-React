import { FormState, FormProps } from '../date/types_date';
import React, { Component, RefObject, ChangeEvent } from 'react';
import { resetInputRefForm } from './resetInputRefForm';
import { validateForms } from './ValidateForm';

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

    this.state = {
      titleError: '',
      descriptionError: '',
      dateError: '',
      categoryError: '',
      presenceError: '',
      priceError: '',
      countError: '',
      consentError: '',
      imageError: '',
    };
  }

  validateForm = () => {
    const errors = validateForms(
      this.productNameRef,
      this.descriptionRef,
      this.addedDateRef,
      this.categoryRef,
      this.availableRef,
      this.unavailableRef,
      this.priceRef,
      this.countRef,
      this.consentRef,
      this.pictureRef
    );

    const {
      titleError,
      descriptionError,
      dateError,
      countError,
      priceError,
      categoryError,
      presenceError,
      consentError,
      imageError,
    } = errors;

    this.setState({
      titleError,
      descriptionError,
      dateError,
      countError,
      priceError,
      categoryError,
      presenceError,
      consentError,
      imageError,
    });
    return (
      !titleError &&
      !descriptionError &&
      !dateError &&
      !countError &&
      !priceError &&
      !categoryError &&
      !presenceError &&
      !consentError &&
      !imageError
    );
  };

  handleSubmitForm(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!this.validateForm()) {
      return;
    }

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

    this.props.addProduct(product);
    this.props.showModalWindow();
    setTimeout(() => {
      this.props.showModalWindow();
    }, 2000);

    this.handleClickReset();
  }

  handleClickReset = () => {
    resetInputRefForm(
      this.productNameRef,
      this.descriptionRef,
      this.addedDateRef,
      this.categoryRef,
      this.availableRef,
      this.unavailableRef,
      this.priceRef,
      this.countRef,
      this.consentRef,
      this.pictureRef
    );
  };

  render() {
    return (
      <form className="wrapper_form" onSubmit={this.handleSubmitForm} data-testid="form">
        <div className="forms_div">
          <p className="forms_div-title">Name of product</p>
          <input data-testid="name-input" type="text" ref={this.productNameRef} />
          {this.state.titleError && <span className="error">{this.state.titleError}</span>}
        </div>

        <div className="forms_div-column">
          <p className="forms_div-title">Description of product</p>
          <textarea data-testid="description-input" ref={this.descriptionRef} cols={40} rows={2} />
          {this.state.descriptionError && (
            <span className="error">{this.state.descriptionError}</span>
          )}
        </div>

        <div className="forms_div">
          <div className="forms_div form-price">
            <p className="forms_div-title">Price</p>
            <input data-testid="price-input" type="number" ref={this.priceRef} />
            {this.state.priceError && <span className="error">{this.state.priceError}</span>}
          </div>

          <div className="forms_div form-count">
            <p className="forms_div-title">Count</p>
            <input data-testid="count-input" type="number" ref={this.countRef} />
            {this.state.countError && <span className="error">{this.state.countError}</span>}
          </div>
        </div>

        <div className="forms_div">
          <p className="forms_div-title">Date of added product</p>
          <input data-testid="date-input" type="date" ref={this.addedDateRef} lang="en" />
          {this.state.dateError && <span className="error">{this.state.dateError}</span>}
        </div>

        <div className="forms_div">
          <p className="forms_div-title">Select product category</p>
          <select
            data-testid="category-select"
            name="category"
            ref={this.categoryRef}
            defaultValue=""
          >
            <option value="">--Select category--</option>
            <option value="men's clothing">Men&#x60;s clothing</option>
            <option value="women's clothing">Women&#x60;s clothing</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="another category">Another category</option>
          </select>
          {this.state.categoryError && <span className="error">{this.state.categoryError}</span>}
        </div>

        <div className="forms_div-column">
          <p className="forms_div-title">Product availability</p>
          <div className="wrapper_radios">
            <div>
              <p>available</p>
              <input
                data-testid="presence-radio1"
                type="radio"
                name="availability"
                value="available"
                ref={this.availableRef}
              />
            </div>
            <div>
              <p>unavailable</p>
              <input
                type="radio"
                name="availability"
                value="unavailable"
                data-testid="presence-radio2"
                ref={this.unavailableRef}
              />
            </div>
          </div>
          {this.state.presenceError && <span className="error">{this.state.presenceError}</span>}
        </div>

        <div className="forms_div-column">
          <p className="forms_div-title">Upload picture</p>
          <input data-testid="image-input" type="file" accept="image/*" ref={this.pictureRef} />
          {this.state.imageError && <span className="error">{this.state.imageError}</span>}
        </div>

        <div className="forms_div">
          <p className="forms_div-title">I consent to the processing of product data</p>
          <input
            type="checkbox"
            name="gender"
            value="true"
            data-testid="consent-check"
            ref={this.consentRef}
            defaultChecked={false}
          />
          {this.state.consentError && <span className="error">{this.state.consentError}</span>}
        </div>
        <div className="forms_div buttons">
          <div className="resetBtn" onClick={this.handleClickReset}>
            Reset
          </div>
          <button /* type="submit" */ data-testid="button" className="btnForm">
            Create product
          </button>
        </div>
      </form>
    );
  }
}
