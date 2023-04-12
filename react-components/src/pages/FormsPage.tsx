import { PersonForm } from '../date/types_date';
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Form } from '../components/Form';
import { CardForm } from '../components/CardForm';

export function FormsPage() {
  const [persons, setPersons] = useState<PersonForm[]>([]);
  const [isActive, setIsActive] = useState(false);

  const addPerson = (person: PersonForm) => {
    setPersons((prevPersons) => [...prevPersons, person]);
  };

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
            <Form addPerson={addPerson} showModalWindow={showModalWindow} />
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
