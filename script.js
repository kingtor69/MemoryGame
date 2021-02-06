const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let clickCount = 0;
let matchedPairs = 0;
let cardOver = false;
let cardsUp = 0;
let firstFlippedColor;
let flippedColor;
let flippedId;
let match = false;
const cardIDs = [];
let cardID = 0;
let flippedFirst;
let flippedSecond;

const clickDisplay = document.querySelector('#click-counter');
const matchDisplay = document.querySelector('#matches');
clickDisplay.innerText = clickCount;
matchDisplay.innerText = matchedPairs;

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement(`div`);
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    newDiv.id = `cardNumber${cardID}`;
    gameContainer.append(newDiv);
    cardID++;
  }
}

function handleCardClick(event) {
  function flipCard() {
    if (!event.target.classList.contains("done")) {
      flippedColor = event.target.classList;
    
      if (!event.target.style.backgroundColor) {
        event.target.style.backgroundColor = flippedColor;
        flippedColorStr = flippedColor[0];
        flippedId = `#${event.target.id}`;
        clickCount++;
        cardsUp++;
      } else {
        event.target.style.backgroundColor = null;
        flippedColor = null;
        cardsUp = 0;
      }
      clickDisplay.innerText = clickCount;
    }
  };

  function checkIt() {
    if (!!flippedColor) {
      if (flippedColor.value === firstFlippedColor.value) {
        matchedPairs++;
        if (matchedPairs === 5) {
          document.body.innerHTML += `<h3>Congratulations! You won in ${clickCount} flips. Refresh page to play again.</h3>`;
        }
        matchDisplay.innerText = matchedPairs;
        cardsUp = 0;
        flippedFirst.classList.add('matched');
      }
      else {
        setTimeout(function(){
          flippedFirst.style.backgroundColor = null;
          flippedSecond.style.backgroundColor = null;
          cardsUp = 0;
        }, 1000);
      }
  
    }
  }

  if (cardsUp === 0) {
    flipCard();
  } else if (cardsUp === 1) {
    firstFlippedColor = flippedColor;
    firstFlippedId = flippedId;
    flippedFirst = gameContainer.querySelector(firstFlippedId);
    flipCard();
    flippedSecond = gameContainer.querySelector(flippedId);
    checkIt ();
  } else if (cardsUp === 2) {
    flippedFirst.style.backgroundColor = null;
    flippedSecond.style.backgroundColor = null;
    cardsUp = 0;
    flipCard();
  };
}
  
document.addEventListener('DOMContentLoaded', function () {
  createDivsForColors(shuffledColors);
});
