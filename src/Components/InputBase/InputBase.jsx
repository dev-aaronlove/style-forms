import React from "react";
import './InputBase.css';
import { CARD, CARD_ICON } from '../constants';

const InputBase = ({errorM, error, cardType, isCard, ...props}) => ( //() not {} for components
  <label>
    <input className="input-root" {...props} />
    {errorM && <div className="error">{errorM}</div>}
    {(!error || !error.cardError) && isCard && CARD.includes(cardType) && (
      <img 
        style={{
          position: "absolute",
          top: "5px",
          right: "10px",
          width: "50px",
          height: "33px"
        }}
        src={CARD_ICON[cardType]}
        alt="card" 
      />
    )}
  </label>
)

export default InputBase;