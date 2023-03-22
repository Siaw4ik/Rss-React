import { ProductForm } from '../date/types_date';
import React, { Component, RefObject, ChangeEvent } from 'react';

interface FormProps {
  addProduct: (product: ProductForm) => void;
  showModalWindow: () => void;
}

interface FormState {
  pictureUrl: string;
}

export class Form extends Component<FormProps, FormState> {
  productNameRef: RefObject<HTMLInputElement>;
  descriptionRef: RefObject<HTMLTextAreaElement>;
  addedDateRef: RefObject<HTMLInputElement>;
  categoryRef: RefObject<HTMLSelectElement>;
  availabilityRef: RefObject<HTMLInputElement>;
  priceRef: RefObject<HTMLInputElement>;
  countRef: RefObject<HTMLInputElement>;
  pictureRef: RefObject<HTMLInputElement>;

  constructor(props: FormProps) {
    super(props);

    this.productNameRef = React.createRef();
    this.descriptionRef = React.createRef();
    this.addedDateRef = React.createRef();
    this.categoryRef = React.createRef();
    this.availabilityRef = React.createRef();
    this.priceRef = React.createRef();
    this.countRef = React.createRef();
    this.pictureRef = React.createRef();

    this.state = {
      pictureUrl: '',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handlePictureChange = () => {
    if (this.pictureRef.current?.files) {
      const file = this.pictureRef.current?.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        if (reader.result) {
          this.setState({ pictureUrl: reader.result as string });
        }
      };
    }
  };

  handleClick = () => {
    const product = {
      title: this.productNameRef.current?.value || 'value not set',
      description: this.descriptionRef.current?.value || 'value not set',
      date: this.addedDateRef.current?.value || 'value not set',
      category: this.categoryRef.current?.value || 'value not set',
      presence: this.availabilityRef.current?.value || 'value not set',
      price: this.priceRef.current?.value || 'value not set',
      count: this.countRef.current?.value || 'value not set',
      image: this.state.pictureUrl,
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
    if (this.categoryRef.current) this.categoryRef.current.value = "men's clothing";
    if (this.availabilityRef.current) this.availabilityRef.current.value = 'available';
    if (this.priceRef.current) this.priceRef.current.value = '';
    if (this.countRef.current) this.countRef.current.value = '';
    if (this.pictureRef.current) this.pictureRef.current.value = '';
    this.setState({ pictureUrl: '' });
  };

  render() {
    return (
      <div className="wrapper_form">
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
          <select name="category" ref={this.categoryRef}>
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
              <input
                type="radio"
                name="availability"
                value="available"
                defaultChecked
                ref={this.availabilityRef}
              />
            </div>
            <div>
              <p>unavailable</p>
              <input
                type="radio"
                name="availability"
                value="unavailable"
                ref={this.availabilityRef}
              />
            </div>
          </div>
        </div>

        <div className="forms_div-column">
          <p className="forms_div-title">Upload picture</p>
          <input
            type="file"
            accept="image/*"
            ref={this.pictureRef}
            onChange={this.handlePictureChange}
          />
        </div>
        <div className="btnForm" onClick={this.handleClick}>
          Create product
        </div>
      </div>
    );
  }
}
