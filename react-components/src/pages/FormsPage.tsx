import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Form } from '../components/Form';
import { CardForm } from '../components/CardForm';
import { RootState } from 'store';
import { useSelector } from 'react-redux';

export function FormsPage() {
  const [isActive, setIsActive] = useState(false);
  const persons = useSelector((state: RootState) => state.form.persons);

  const showModalWindow = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  return (
    <div className="container">
      <Header />
      <main className="main">
        <div className="container_formpage">
          <div className="container_form-block">
            <h3 data-testid="formpage-formtitle">Form for creating and adding a product</h3>
            <Form showModalWindow={showModalWindow} />
          </div>
          <div className="container_createdCrads">
            <h3 data-testid="formpage-cardsformtitle">Created and added products</h3>
            <div data-testid="containerCards" className="wrapper_cardList">
              {persons.map((product, index) => (
                <CardForm key={index} person={product} />
              ))}
            </div>
          </div>
          <div
            className={`modalWindow${isActive ? ' active' : ''}`}
            data-testid="show-modal-button"
          >
            <p>Data saved, card created</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
