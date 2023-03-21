import React, { Component } from 'react';

export class FormsPage extends Component {
  render() {
    return (
      <div className="container_formpage">
        <div className="container_form-block">
          <h3>Form for creating and adding a product</h3>
          <div className="wrapper_form"></div>
        </div>
        <div className="container_createdCrads">
          <h3>Created and added products</h3>
          <div className="wrapper_cardList"></div>
        </div>
      </div>
    );
  }
}
