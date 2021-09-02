let tiles = []
let images = []
let flipSound;
let firstCard;
let isMouseClickEnabled = true;

const numRows = 4
const numColumns = 3

const mcardWidth = 100
const mcardHeight = 150

const borderMargin = 40;
const betweenCardsMargin = 10;


// load images and sounds before setup 
function preload() {
  let i = 1
  // load same number of images as cards into array
  while (images.length < numRows * numColumns) {
    let image = new cardImage("images/" + i + ".png", i);
    images.push(image);
    images.push(image);
    i++;
  }
  // load sounds
  soundFormats("ogg");
  flipSound = loadSound("sounds/flip");
}

function setup() {
  createCanvas(520, 550, WEBGL);
  rectMode(CENTER);
  angleMode(DEGREES);
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numColumns; j++) {
      let randomImage = images.splice(images.length * Math.random() | 0, 1)[0];
      tiles.push(new Card(i * mcardWidth + i * betweenCardsMargin + borderMargin, j * mcardHeight + j * betweenCardsMargin + borderMargin, randomImage));
    }
  }
}

function draw() {
  background(220);
  tiles.forEach(tile => tile.render());
}

function mouseClicked() {
  if (isMouseClickEnabled) {
    tiles.forEach(tile => {
      if ((mouseX > tile.x && mouseX < tile.x + mcardWidth) && mouseY > tile.y && mouseY < tile.y + mcardHeight) {
        if (tile.isEnabled && !tile.faceUp) { // flip only unrevealed cards
          flipSound.play();
          tile.turn();
          if (!firstCard) {
            firstCard = tile;
          }
          else { // second card flipped
            if (firstCard.id === tile.id) { // it's a match
              firstCard.isEnabled = tile.isEnabled = false;  // disable the cards so they're not clickable anymore
              firstCard = null; // reset
            }
            else {
              isMouseClickEnabled = false; // prevent the user from clicking any other cards
              setTimeout(() => {
                firstCard.turn();
                tile.turn();
                firstCard = null // reset
                isMouseClickEnabled = true;
              }, 1000)
            }
          }
        }
      }
    })
  }
}