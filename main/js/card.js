const rotateSpeed = 5
const rotateLevitation = 0.6

// basic card class which represents card with two sides
class Card {
  constructor(x, y, downSideImage, upperSideColor = [93, 81, 124], stroke = [255, 255, 255]) {
    this.x = x;
    this.y = y;
    this.downSideImage = downSideImage;
    this.upColor = upperSideColor;
    // this.downColor = downSideColor;
    this.stroke = stroke;
    this.faceUp = false;
    this.rot = 0;
  }
  render() {
    push();
    // moving the top left card in the top left corner because of "rectMode(CENTER)"
    translate(((-width / 2) + mcardWidth / 2) + this.x, ((-height / 2) + mcardHeight / 2) + this.y, 0);
    this.rotateCard(this.faceUp);

    // upper side
    fill(this.upColor);
    stroke(this.stroke);
    rect(0, 0, mcardWidth, mcardHeight);

    // down side
    translate(0, 0, -1);
    texture(this.downSideImage)
    // fix the borders caused by making the down side smaller
    noStroke()
    rect(0, 0, mcardWidth - 10, mcardHeight / 1.5);
    pop();
  }
  turn() {
    this.faceUp = !this.faceUp;
  }
  rotateCard(faceUp) {
    if (faceUp) {
      if (this.rot < 180) {
        this.rot += rotateSpeed;
      }
      rotateY(this.rot);
      if (this.rot < 90 && this.rot > 0) {
        this.y -= rotateLevitation;
      }
      else if (this.rot > 90 && this.rot < 180) {
        this.y += rotateLevitation;
      }
    }
    else {
      if (this.rot > 0) {
        this.rot -= rotateSpeed;
      }
      rotateY(-this.rot);
      if (this.rot < 90 && this.rot > 0) {
        this.y += rotateLevitation;
      }
      else if (this.rot > 90 && this.rot < 180) {
        this.y -= rotateLevitation;
      }
    }
  }
}