/**
 * C = Clubs (Tréboles)
 * D = Diamons (Diamantes)
 * H = Hearts (Corazones)
 * S = Spades (Espadas)
 */
let deck = [], playerPoints = 0, dealerPoints = 0;
const types = ["C", "D", "H", "S"];
const figures = ["A", "J", "Q", "K"];

//Referencias HTML
const btnGetCard = document.querySelector('#btnGetCard');
const btnNewGame = document.querySelector('#btnNewGame');
const btnStop = document.querySelector('#btnStop');
const divPlayerCards = document.querySelector('#player-cards');
const divDealerCards = document.querySelector('#dealer-cards');
const smalls = document.querySelectorAll('small');

//Crea nueva baraja
const createDeck = () => {
  for (let j = 2; j <= 10; j++) {
    for (let type of types) {
      deck.push(j + type);
    }
  }
  for (let fig of figures) {
    for (let type of types) {
      deck.push(fig + type);
    }
  }
  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};
createDeck();

//Pedir nueva carta
const getCard = () => {
  if (deck.length === 0) {
    throw "Deck sin cartas";
  }
  const card = deck.pop();
  return card;
};
//getCard();
const cardValue = (card) => {
  const value = card.substring(0, card.length - 1);
  return ( isNaN( value ) ) ? ( value === 'A' ) ? 11 : 10 : value * 1;
};

//Turno del dealer
const dealerTurn = (playerPoints) => {
  do{
    const card = getCard();
    dealerPoints += cardValue(card);
    smalls[1].innerText = dealerPoints;
    const imgCard = document.createElement('img');
    imgCard.src = `assets/cartas/${card}.png`;
    imgCard.classList.add('card');
    divDealerCards.append(imgCard);
    if(playerPoints > 21) break;
  } while((dealerPoints < playerPoints) && (playerPoints <= 21));
  setTimeout(() => {
    if (playerPoints > 21) {
      console.warn('Perdiste');
    } else if (dealerPoints === playerPoints) {
      console.warn('Empate!');
    } else if (dealerPoints > 21) {
      console.warn('Ganaste!');
    } else {
      console.warn('Perdiste!');
    }
    btnNewGame.disabled = false;
  },100);
};

//Eventos
btnGetCard.addEventListener('click', () => {
  const card = getCard();
  playerPoints += cardValue(card);
  smalls[0].innerText = playerPoints;
  const imgCard = document.createElement('img');
  imgCard.src = `assets/cartas/${card}.png`;
  imgCard.classList.add('card');
  divPlayerCards.append(imgCard);

  if (playerPoints > 21) {
    console.warn('Perdiste');
    btnGetCard.disabled = true;
    btnStop.disabled = true;
    btnNewGame.disabled = false;
  } else if (playerPoints === 21) {
    btnGetCard.disabled = true;
    btnStop.disabled = true;
    btnNewGame.disabled = false;
    dealerTurn(playerPoints);
  }
});
btnStop.addEventListener('click', () => {
  btnGetCard.disabled = true;
  btnStop.disabled = true;
  dealerTurn(playerPoints);
});

btnNewGame.addEventListener('click', () => {
  console.clear();
  console.log('Iniciando nuevo juego');
  deck = [];
  deck = createDeck();
  playerPoints = 0;
  dealerPoints = 0;
  smalls[0].innerText = 0;
  smalls[1].innerText = 0;
  divPlayerCards.innerHTML = '';
  divDealerCards.innerHTML = '';
  btnGetCard.disabled = false;
  btnStop.disabled = false;
});