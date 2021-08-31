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
      this.rotateCard(this.faceUp);
      fill(this.upColor);
      stroke(this.stroke);
      // rotateY(-millis()/500);
      // upper side
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
    rotateCard(faceUp) {
      if (faceUp){
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