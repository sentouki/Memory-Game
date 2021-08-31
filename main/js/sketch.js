let tiles = []

const numRows = 4
const numColumns = 3

const mcardWidth = 100
const mcardHeight = 150


// basic card class which represents card with two sides
class Card {
  constructor(x,y, upperSideColor=[93,81,124],downSideColor=[60,60,60], stroke=[255,255,255]) {
    this.x = x;
    this.y = y;
    this.upColor = upperSideColor;
    this.downColor = downSideColor;
    this.stroke = stroke;
    this.faceUp = false;
    this.rot = 0;
  }
  render() {
    push();
    // moving the top left card in the top left corner because of "rectMode(CENTER)"
    translate(((-width/2)+mcardWidth/2)+this.x,((-height/2)+mcardHeight/2)+this.y, 0);
    fill(this.upColor);
    stroke(this.stroke);
    // rotateY(-millis()/500);
    // upper side
    if (this.faceUp){
      if (this.rot < 180) {
        this.rot += 5;
      }
      rotateY(this.rot);
      if (this.rot < 90 && this.rot > 0) {
        this.y -= 0.6;
      }
      else if (this.rot > 90 && this.rot < 180) {
        this.y += 0.6;
      }
    }
    else {
      if (this.rot > 0) {
        this.rot -= 5;
      }
      rotateY(-this.rot);
      if (this.rot < 90 && this.rot > 0) {
        this.y += 0.6;
      }
      else if (this.rot > 90 && this.rot < 180) {
        this.y -= 0.6;
      }
    }
    rect(0,0,mcardWidth, mcardHeight);
    // down side
    fill(this.downColor);
    translate(0,0,-1);
    rect(0,0,mcardWidth, mcardHeight);
    pop();
  }
  turn() {
    this.faceUp = !this.faceUp;
  }
}

const testCard = new Card(0,0);

class MemoryCard {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.faceUp = false
  }

}


function setup() {
  createCanvas(520, 550, WEBGL);
  rectMode(CENTER);
  angleMode(DEGREES);
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numColumns; j++) {
      tiles.push(new Card(i * mcardWidth + i*10+40, j * mcardHeight + j*10+40));
    }
  }
}

function draw() {
  background(220);
  tiles.forEach( tile => tile.render());
}

function mouseClicked() {
  //console.log(mouseX,mouseY);
  tiles.forEach(tile => {
    console.log(tile.x, tile.y)
    if ((mouseX > tile.x && mouseX < tile.x + 100) && mouseY > tile.y && mouseY < tile.y + 150)  {
        console.log("Yeehaw:" + tile.x)
      tile.turn();
        }
  })
}