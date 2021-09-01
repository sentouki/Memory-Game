let tiles = []
let images = []
let flipSound;

const numRows = 4
const numColumns = 3

const mcardWidth = 100
const mcardHeight = 150


// load images and sounds before setup 
function preload() {
  let i = 1
  // load same number of images as cards into array
  while (images.length < numRows * numColumns) {
    let image = loadImage("images/" + i + ".png")
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
      tiles.push(new Card(i * mcardWidth + i * 10 + 40, j * mcardHeight + j * 10 + 40, randomImage));
    }
  }
}

function draw() {
  background(220);
  tiles.forEach(tile => tile.render());
}

function mouseClicked() {
  tiles.forEach(tile => {
    if ((mouseX > tile.x && mouseX < tile.x + 100) && mouseY > tile.y && mouseY < tile.y + 150) {
      flipSound.play();
      tile.turn();
    }
  })
}