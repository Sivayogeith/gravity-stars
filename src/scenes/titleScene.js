import { loadScore, modes, buttonColor, textColor } from "../game";

class TitleScene extends Phaser.Scene {
  constructor() {
    super("titleScene");
  }

  preload() {
    this.score = loadScore();
    this.load.image("background", "/background.png");
    this.load.audio("theme", "/theme_full.ogg");
  }

  startGame(mode) {
    this.scene.stop("titleScene");
    this.scene.start("gameScene", { mode: mode });
  }

  startOptions() {
    this.scene.stop("titleScene");
    this.scene.start("optionsScene");
  }

  startStoryline() {
    this.scene.stop("titleScene");
    this.scene.start("storyScene");
  }

  create() {
    if (!this.sound.get("theme") && !this.sound.isPlaying("theme")) {
      this.music = this.sound.play("theme", { loop: true });
    }

    this.add.image(450, 550, "background");

    this.add.text(400, 250, "Gravity Stars!", {
      fontSize: "32px",
    });

    const positions = [325, 425, 550, 650];

    positions.forEach((x, index) => {
      let disabled = false;
      if (index + 1 !== 1) {
        if (this.score[index][0] == 0) {
          disabled = true;
        }
      }

      const color = disabled ? "#8a929c" : buttonColor;
      this.add
        .text(x, 350, `${modes[index + 1][0]}!`, { fill: color })
        .setInteractive()
        .on("pointerdown", () => {
          if (!disabled) {
            this.startGame(index + 1);
          }
        });
    });

    this.add
      .text(
        250,
        400,
        "You are a purple dude with a jetpack.\nDo NOT touch the ground; Collect all stars to win that meteor! Finish all meteors to conquer the MOON!\n\nEach meteor increases the speed and decreases braking power.\nEvery star you collect gives you more braking power.\n\nArrow Keys - Control\nSpace - Brakes\nP - Pause\nR - Reset\n\n\nCredits:\n  Game Author and Art - themeowingsage\n  Music - Flo\n  Player Art - Phaser",
        { fill: textColor }
      )
      .setWordWrapWidth(600);

    const options = this.add.text(10, 915, "Options and Stats", {
      fill: buttonColor,
      fontSize: "20px",
    });
    options.setInteractive();
    options.on("pointerdown", () => this.startOptions());

    const story = this.add.text(875, 915, "Storyline", {
      fill: buttonColor,
      fontSize: "20px",
    });
    story.setInteractive();
    story.on("pointerdown", () => this.startStoryline());
  }
}

export default TitleScene;
