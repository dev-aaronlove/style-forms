import React from "react";
import { OTHER_CARDS } from "../constants"; //import consts from constants.js
import InputBase from "../InputBase/InputBase";
import { cardExpireValidation, cardNumberValidation, cvcValidation, onlyTextValidation } from "../validations";
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
    let errorText;
    switch(type) {
      case 'card':
        errorText = cardNumberValidation(value);
        this.setState((prevState) => ({ //prevState holds the state's current values
          cardType: this.findDebitCardType(value),
          error: {
            ...prevState.error, //TODO: WHY NEED ... IF ONLY HAS ONE PREVSTATE.ERROR??
            cardError: errorText, //dynamically adding cardError key to error object in state
          },
        }));
        break;
      case 'cardHolder':
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({ error: { ...prevState.error, cardHolderError: errorText }}));
        break;
      case 'expiry':
        errorText = cardExpireValidation(value);
        this.setState((prevState) => ({ error: { ...prevState.error, expiryError: errorText }}));
        break;
      case 'cvc':
        errorText = cvcValidation(3, value);
        this.setState((prevState) => ({ error: { ...prevState.error, cvcError: errorText }}));
        break;
      default:
        break;
    }
  }

  // handleBlur = (e) => this.handleValidations(e.target.name, e.target.value);
  handleBlur = ({target: {name, value}}) => this.handleValidations(name, value);
  //can do the same destructuring in handleInputData
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

  checkErrorBeforeSave = () => {
    const { cardData } = this.state;
    let errorValue = {};
    let isError = false;
    Object.keys(cardData).forEach((val) => {
      if (!cardData[val].length) {
        errorValue = { ...errorValue, [`${val}Error`]: 'Required' };
        isError = true;
      }
    });
    this.setState({ error: errorValue });
  }

  handleAddCard = (e) => {
    e.preventDefault();
    const errorCheck = this.checkErrorBeforeSave();
    if (!errorCheck) {
      this.setState({
        cardData: initialCard,
        cardType: null,
      })
    }
  }

  render() {
    const { cardData, error, cardType, maxLength } = this.state;

    const inputData = [
      {label: 'Card Number', name: 'card', type: 'text', error: 'cardError'},
      {label: 'CardHolder\'s Name', name: 'cardHolder', type: 'text', error: 'cardHolderError'},
      {label: 'Expiry Date (MM/YY)', name: 'expiry', type: 'text', error: 'expiryError'},
      {label: 'Security Code', name: 'cvc', type: 'text', error: 'cvcError'},
    ];

    return(
      <div>
        <h1>Add New Card</h1>
        <form onSubmit={this.handleAddCard}>
          {inputData.length ? inputData.map((item) => ( //check to make sure inputData isn't null, otherwise doesn't run
            <InputBase 
              placholder={item.label}
              type={item.type}
              value={cardData && cardData[item.name]} //this.state.cardData && is like a safeguard making sure that cardData exists
              onChange={this.handleInputData}
              autoComplete="off"
              maxLength={maxLength}
              name={item.name}
              onBlur={this.handleBlur} //onBlur is a built-in event on input tag when user clicks off of input
              error={error}
              cardType={cardType}
              isCard={item.name === 'card'}
              errorM={
                (error
                && error[item.error]
                && error[item.error].length > 1)
                ? error[item.error]
                : null
              }
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