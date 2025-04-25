const myModule = (() => {
  'use strict';
  // Variables
  let deck = [], playersPoints = [];
  const types = ["C", "D", "H", "S"],
    figures = ["A", "J", "Q", "K"],
    //Referencias HTML
    btnGetCard = document.querySelector('#btnGetCard'),
    btnStop = document.querySelector('#btnStop'),
    divCardsPlayers = document.querySelectorAll('.divCards'),
    smallPoints = document.querySelectorAll('small');

  //Inicializar el juego
  const startGame = (numPlayers = 2) => {
    deck = createDeck();
    playersPoints = [];
    for (let i = 0; i < numPlayers; i++) {
      playersPoints.push(0);
    }
    smallPoints.forEach(elem => elem.innerText = 0);
    divCardsPlayers.forEach(elem => elem.innerHTML = '');
    btnGetCard.disabled = false;
    btnStop.disabled = false;
  }

  //Crea nueva baraja
  const createDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let type of types) {
        deck.push(i + type);
      }
    }
    for (let fig of figures) {
      for (let type of types) {
        deck.push(fig + type);
      }
    }
    return _.shuffle(deck);
  };

  //Pedir carta
  const getCard = () => {
    if (deck.length === 0) {
      throw "Deck sin cartas";
    }
    return deck.pop();
  };
  //Valor de la carta
  const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    console.log(value);
    return (isNaN(value)) ? (value === 'A') ? 11 : 10 : value * 1;
  };

  const sumPlayerPoints = (card, turn) => {
    playersPoints[turn] += cardValue(card);
    smallPoints[turn].innerText = playersPoints[turn];
    return playersPoints[turn];
  }

  const createCardElement = (card, turn) => {
    const imgCard = document.createElement('img');
    imgCard.src = `assets/cartas/${card}.png`;
    imgCard.classList.add('card');
    divCardsPlayers[turn].append(imgCard);
  }

  const chooseWinner = () => {
    const [playerPoints, dealerPoints] = playersPoints;
    setTimeout(() => {
      if (dealerPoints === playerPoints) {
        console.warn('Empate!');
      } else if (playerPoints > 21) {
        console.warn('Dealer Gana!');
      } else if (dealerPoints > 21) {
        console.warn('Ganaste!');
      } else {
        alert('Dealer Gana!')
      }
    }, 100);
  }

  //turn del dealer
  const dealerTurn = (playerPoints) => {
    let dealerPoints = 0;
    do {
      const card = getCard();
      dealerPoints = sumPlayerPoints(card, playersPoints.length - 1);
      createCardElement(card, playersPoints.length - 1);
    } while ((dealerPoints < playerPoints) && (playerPoints <= 21));
    chooseWinner();
  };

  //Eventos
  btnGetCard.addEventListener('click', () => {
    const card = getCard(),
      playerPoints = sumPlayerPoints(card, 0);
    createCardElement(card, 0);

    if (playerPoints > 21) {
      console.warn('Perdiste');
      btnGetCard.disabled = true;
      btnStop.disabled = true;
      dealerTurn(playerPoints);
    } else if (playerPoints === 21) {
      console.warn('21, genial!');
      btnGetCard.disabled = true;
      btnStop.disabled = true;
      dealerTurn(playerPoints);
    }
  });
  btnStop.addEventListener('click', () => {
    btnGetCard.disabled = true;
    btnStop.disabled = true;
    dealerTurn(playersPoints[0]);
  });
  return {
    newGame: startGame
  };
})();