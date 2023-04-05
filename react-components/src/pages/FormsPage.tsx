import { ProductForm } from '../date/types_date';
import React, { useState } from 'react';
import { Form } from '../components/Form';
import { CardForm } from '../components/CardForm';

export function FormsPage() {
  const [products, setProducts] = useState<ProductForm[]>([]);
  const [isActive, setIsActive] = useState(false);

  const addProduct = (product: ProductForm) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const showModalWindow = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  return (
    <div className="container_formpage">
      <div className="container_form-block">
        <h3 data-testid="formpage-formtitle">Form for creating and adding a product</h3>
        <Form addProduct={addProduct} showModalWindow={showModalWindow} />
      </div>
      <div className="container_createdCrads">
        <h3 data-testid="formpage-cardsformtitle">Created and added products</h3>
        <div data-testid="containerCards" className="wrapper_cardList">
          {products.map((product, index) => (
            <CardForm key={index} product={product} />
          ))}
        </div>
      </div>
      <div className={`modalWindow${isActive ? ' active' : ''}`} data-testid="show-modal-button">
        <p>Data saved, card created</p>
      </div>
    </div>
  );
}
