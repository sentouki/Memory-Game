let tiles = []
let images = []
let flipSound;
let firstCard;
let isMouseClickEnabled = true;

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
    let canvas = createCanvas(canvasWidth, canvasHeight, WEBGL);
    // add canvas as child to div to control its position easier 
    canvas.parent("sketch")
    rectMode(CENTER);
    angleMode(DEGREES);
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {
            let randomImage = images.splice(images.length * Math.random() | 0, 1)[0];
            tiles.push(new Card(i * mcardWidth + i * betweenCardsMargin + borderMargin, j * mcardHeight + j * betweenCardsMargin + borderMargin, randomImage));
        }
    }
    // display initial values of the score and amount of matched cards
    updateScore(score)
    updateHighscore(highScore)
    updateNumOfMatchedCards(numOfMatchedCards)
}

function draw() {
    background(canvasBackground);
    tiles.forEach(tile => tile.render());
    if (numOfMatchedCards == 6) {
        if (score > highScore) {
            saveHighscore(score);
        }
        updateHighscore(highScore);
    }
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
                            numOfMatchedCards++;
                            console.log("numOfMatchedCards: ", numOfMatchedCards)
                            updateNumOfMatchedCards(numOfMatchedCards);
                        }
                        else {
                            isMouseClickEnabled = false; // prevent the user from clicking any other cards
                            setTimeout(() => {
                                firstCard.turn();
                                tile.turn();
                                firstCard = null // reset
                                isMouseClickEnabled = true;
                            }, 1000)
                            score -= 10;
                            console.log("initialScore: ", score)
                            updateScore(score > 0 ? score : 0)
                        }
                    }
                }
            }
        })
    }
}