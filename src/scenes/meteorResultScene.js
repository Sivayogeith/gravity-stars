import { buttonColor, textColor } from "../game";

class MeteorResultScene extends Phaser.Scene {
  constructor() {
    super("meteorResultScene");
  }

  init(data) {
    this.won = data.won;
    this.secondsLeft = data.secondsLeft;
    this.starsLeft = data.starsLeft;
    this.mode = data.mode;
  }

  startTitle() {
    this.scene.stop("meteorResultScene");
    this.scene.start("titleScene");
  }

  startNewGame() {
      this.scene.stop("meteorResultScene");
      this.scene.start("gameScene", {
        mode: this.won ? this.mode + 1 : this.mode,
      });
  }

  create() {
    this.add.image(450, 550, "background");

    this.add.text(350, 350, this.won ? "YOU WON!" : "You lost :P", {
      fill: textColor,
      fontSize: "45px",
    });

    this.add
      .text(375, 425, "Title", {
        fill: buttonColor,
        fontSize: "20px",
      })
      .setInteractive()
      .on("pointerdown", () => this.startTitle());

    this.add
      .text(475, 425, this.won ? "Next Meteor" : "Play Again", {
        fill: buttonColor,
        fontSize: "20px",
      })
      .setInteractive()
      .on("pointerdown", () => this.startNewGame());

    this.add.text(
      375,
      475,
      this.won
        ? `with JUST ${this.secondsLeft} seconds left!`
        : `you had ${this.starsLeft} stars to collect.`,
      {
        fill: textColor,
        fontSize: "20px",
      }
    );
  }
}

export default MeteorResultScene;
