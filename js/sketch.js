let images = []
let cards = []
let flipSound;
let firstCard;
let isMouseClickEnabled = true;
let isRestartEnabled = true;

const canvasWidth = 550;
const canvasHeight = 590;
const canvasBackground = '#90CCF4'

const numRows = 4
const numColumns = 3

const mcardWidth = 110
const mcardHeight = 160

const borderMargin = 40;
const betweenCardsMargin = 10;

let numOfMatchedCards = 0;
let score = 100;
let highScore = getHighscore() ? getHighscore() : 0;

const numOfImages = 19; // number of images in images/animals directory


// load images and sounds before setup 
function preload() {
  for (let i = 1; i <= numOfImages; i++) {
    let image = loadImage(`images/animals/${i}.png`);
    images.push(image);
  }
  // load sounds
  soundFormats("ogg");
  flipSound = loadSound("sounds/flip");
}

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight, WEBGL);
  // add canvas as child to div to control its position easier 
  canvas.parent("sketch")
  rectMode(CENTER);
  angleMode(DEGREES);
  shuffleCards();
  // display initial values of the score and amount of matched cards
  updateScore(score)
  updateNumOfMatchedCards(numOfMatchedCards)
  updateHighscore(highScore)
}

function draw() {
  background(canvasBackground);
  cards.forEach(tile => tile.render());
}

function mouseClicked() {
  if (isMouseClickEnabled && !modalOpen) {
    cards.forEach(tile => {
      if ((mouseX > tile.x && mouseX < tile.x + mcardWidth) && mouseY > tile.y && mouseY < tile.y + mcardHeight) {
        if (!tile.faceUp) { // flip only unrevealed cards
          flipSound.play();
          tile.turn();
          if (!firstCard) {
            firstCard = tile;
          }
          else { // second card flipped
            if (firstCard.id === tile.id) { // it's a match
              firstCard = null; // reset
              numOfMatchedCards++;
              updateNumOfMatchedCards(numOfMatchedCards);
              if (numOfMatchedCards === (numRows * numColumns) / 2) {
                if (score > highScore) {
                  highScore = score;
                  saveHighscore(score);
                }
                openModal();
              }
            }
            else {
              isMouseClickEnabled = isRestartEnabled = false; // prevent the user from clicking any other cards or restart the game which might cause a glitch
              setTimeout(() => {
                firstCard.turn();
                tile.turn();
                firstCard = null // reset
                isMouseClickEnabled = isRestartEnabled = true;
              }, 1000)
              score -= 10;
              updateScore(score)
            }
          }
        }
      }
    })
  }
}

function shuffleCards() {
  cards = []  // reset
  images.sort(() => Math.random() - 0.5) // shuffle the images
  for (let i = 0; i < (numRows*numColumns)/2; i++) {
    cards.push(new Card(images[i], i))
    cards.push(new Card(images[i], i))
  }
  cards.sort(() => Math.random() - 0.5) // shuffle the cards
  let index = 0
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numColumns; j++) {
      cards[index].setCoords(i * mcardWidth + i * betweenCardsMargin + borderMargin, j * mcardHeight + j * betweenCardsMargin + borderMargin);
      index++;
    }
  }
}

function restartGame() {
  if (isRestartEnabled) {
    isRestartEnabled = isMouseClickEnabled = false
    cards.forEach(tile => {
      tile.faceUp = false;
    })
    setTimeout(()=>{    // delay for the flip animation
      shuffleCards()
      score = 100
      numOfMatchedCards = 0
      firstCard = null
      updateScore(score)
      updateNumOfMatchedCards(numOfMatchedCards)
      isRestartEnabled = isMouseClickEnabled = true
    }, 500)
  }
}