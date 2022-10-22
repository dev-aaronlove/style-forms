import React from "react";
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
      maxLength: 19 //includes spaces between groups of numbers
    }
  }

  handleInputData = (e) => {
    this.setState((prevState) => ({ //when updates inputData, doesn't replace entire object with single value, rather updates the entire object
      cardData: {
        ...prevState.cardData,
        [e.target.name]: e.target.value
      }, 
    }));
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