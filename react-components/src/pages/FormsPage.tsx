import { ProductForm, FormPageProps, FormPageState } from '../date/types_date';
import React, { Component } from 'react';
import { Form } from '../components/Form';
import { CardForm } from '../components/CardForm';

export class FormsPage extends Component<FormPageProps, FormPageState> {
  constructor(props: FormPageProps) {
    super(props);

    this.state = {
      products: [],
      isActive: false,
    };
  }

  addProduct = (product: ProductForm) => {
    this.setState((prevState) => ({
      products: [...prevState.products, product],
    }));
  };

  showModalWindow = () => {
    const isActive = !this.state.isActive;
    this.setState({ isActive });
  };

  render() {
    const toggleClass = this.state.isActive ? ' active' : '';
    return (
      <div className="container_formpage">
        <div className="container_form-block">
          <h3 data-testid="formpage-formtitle">Form for creating and adding a product</h3>
          <Form addProduct={this.addProduct} showModalWindow={this.showModalWindow} />
        </div>
        <div className="container_createdCrads">
          <h3 data-testid="formpage-cardsformtitle">Created and added products</h3>
          <div className="wrapper_cardList">
            {this.state.products.map((product, index) => (
              <CardForm key={index} product={product} />
            ))}
          </div>
        </div>
        <div className={`modalWindow${toggleClass}`} data-testid="show-modal-button">
          <p>Data saved, card created</p>
        </div>
      </div>
    );
  }
}
