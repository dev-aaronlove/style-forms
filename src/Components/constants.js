import VISA_ICON from './assets/visa.png'; //capital syntax tells me it's a constant
import AMERICAN_EXPRESS_ICON from './assets/amex.png';
import MASTER_CARD_ICON from './assets/masterCard.png';
import DISCOVER_ICON from './assets/discover.png';

//create RegEx patterns
/* 
  /[1-9]/ --> any num 1-9, 1 digit
  /\d/ --> any num 0-9, 1 digit
  ' ' --> only a space
*/
export const OTHER_CARDS = [ 
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const CARD = [
  'VISA',
  'MASTERCARD',
  'AMERICANEXPRESS',
  'DISCOVER'
];

export const CARD_ICON = { //maybe want to update icon down the road. Easy to scale
  VISA: VISA_ICON,
  MASTERCARD: MASTER_CARD_ICON,
  AMERICAEXPRESS: AMERICAN_EXPRESS_ICON,
  DISCOVER: DISCOVER_ICON,
}