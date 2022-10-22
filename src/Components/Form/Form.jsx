import React from "react";
import { OTHER_CARDS } from "../constants"; //import consts from constants.js
import InputBase from "../InputBase/InputBase";
import './Form.css';

const initialCard = { //easier to scale
  card: '',
  cardHolder: '',
  expiry: '',
  cvc: '',
}

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      cardData: initialCard,
      maxLength: OTHER_CARDS.length, //includes spaces between groups of numbers
      error: {},
      cardType: null,
    }
  }

  findDebitCardType = (cardNumber) => {
    const regexPattern = {
      MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/, 
      VISA: /^4[0-9]{2,}$/,
      AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    };
    for (const card in regexPattern) if (cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) return card;
    return '';
  }

  handleValidations = (type, value) => {
    switch(type) {
      case 'card':
        this.setState({ cardType: this.findDebitCardType(value) });
        //setState cardType or error message
        break;
      case 'cardHolder':
        //check spaces and numbers
        //setState or error
        break;
      case 'expiry':
        //check date format
        //setState or error
        break;
      case 'cvc':
        //check min length
        //setState or error
        break;
      default:
        break;
    }
  }

  handleBlur = (e) => this.handleValidations(e.target.name, e.target.value);

  handleInputData = (e) => {
    if (e.target.name === 'card') {
      let mask = e.target.value.split(' ').join('');
      if (mask.length) {
        mask = mask.match(new RegExp('.{1,4}', 'g')).join(' ');
        this.setState((prevState) => ({ //Update cardData with new values, while keeping old values.
          cardData: {
            ...prevState.cardData,
            [e.target.name]: mask //mask creates spaces between every 4 numbers
          }, 
        }));
      } else {
        this.setState((prevState) => ({ //Update cardData with new values, while keeping old values
          cardData: {
            ...prevState.cardData,
            [e.target.name]: '' //allows to delete all card numbers
          }, 
        }));
      }
    } else {
      this.setState((prevState) => ({
        cardData: {
          ...prevState.cardData,
          [e.target.name]: e.target.value //update other values in cardData
        }, 
      }));
    }
  }

  render() {

    const inputData = [
      {label: 'Card Number', name: 'card', type: 'text'},
      {label: 'CardHolder\'s Name', name: 'cardHolder', type: 'text'},
      {label: 'Expiry Date (MM/YY)', name: 'expiry', type: 'text'},
      {label: 'Security Code', name: 'cvc', type: 'text'},
    ];

    return(
      <div>
        <h1>Add New Card</h1>
        <form>
          {inputData.length ? inputData.map((item) => ( //check to make sure inputData isn't null, otherwise doesn't run
            <InputBase 
              placholder={item.label}
              type={item.type}
              value={this.state.cardData && this.state.cardData[item.name]} //this.state.cardData && is like a safeguard making sure that cardData exists
              onChange={this.handleInputData}
              autoComplete="off"
              maxLength={this.state.maxLength}
              name={item.name}
              onBlur={this.handleBlur} //onBlur is a built-in event on input tag when user clicks off of input
            />
          )) : null} 
          <div className="btn-wrapper">
            <InputBase type="submit" value="Add Card" />
          </div>
        </form>
      </div>
    )
  }
}

export default Form;