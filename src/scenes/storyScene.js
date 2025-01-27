import { buttonColor, textColor } from "../game";

class StoryScene extends Phaser.Scene {
  constructor() {
    super("storyScene");
  }

  back() {
    this.scene.stop("storyScene");
    this.scene.start("titleScene");
  }

  startOptions() {
    this.scene.stop("storyScene");
    this.scene.start("optionsScene");
  }

  create() {
    this.add.image(450, 550, "background");

    this.add.text(400, 250, "Storyline!", {
      fontSize: "32px",
    });

    this.add
      .text(
        250,
        350,
        `Your friend's grandfather Dennis Hope is looking for a successor to his moon, as your friend doesn't care he came to you.\n\nTo be a great successor you need to take care when a gravity defying meteor hits the moon. Four of them is about to hit your planet; collect all the stars to reset the gravity to save your planet but do it QUICKLY.\n\nYou need save your planet against Small, Medium, Large, Giant meteors. For each meteor, the time and braking power decreases and your speed increases.\n\nProve your self to conquer the MOON!`,
        { fill: textColor }
      )
      .setWordWrapWidth(600);

    this.add.text(10, 915, "Options and Stats", {
      fill: buttonColor,
      fontSize: "20px",
    }).setInteractive().on("pointerdown", () => this.startOptions());

    this.add.text(915, 915, "Title", {
      fill: buttonColor,
      fontSize: "20px",
    }).setInteractive().on("pointerdown", () => this.back());
  }
}

export default StoryScene;
