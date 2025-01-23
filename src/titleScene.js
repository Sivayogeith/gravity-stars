import { loadScore } from "./game";

class TitleScene extends Phaser.Scene {
  constructor() {
    super("titleScene");
    this.score = loadScore();
  }

  preload() {
    this.load.image("background", "/gravity-stars/background.png");
  }

  startGame(mode) {
    this.scene.stop("titleScene");
    this.scene.start("gameScene", { mode: mode });
  }

  startOptions(){
    this.scene.stop("titleScene");
    this.scene.start("optionsScene");
  }

  create() {
    const bg = this.add.image(450, 550, "background");

    const text = this.add.text(400, 250, "Gravity Stars!", {
      fontSize: "32px",
    });

    const easy = this.add.text(325, 350, "Easy!", { fill: "#5399f5" });
    easy.setInteractive();
    easy.on("pointerdown", () => this.startGame(1));

    const normal = this.add.text(425, 350, "Normal!", { fill: "#5399f5" });
    normal.setInteractive();
    normal.on("pointerdown", () => this.startGame(2));

    const hard = this.add.text(550, 350, "Hard!", { fill: "#5399f5" });
    hard.setInteractive();
    hard.on("pointerdown", () => this.startGame(3));

    const impossible = this.add.text(650, 350, "Impossible!", {
      fill: "#5399f5",
    });
    impossible.setInteractive();
    impossible.on("pointerdown", () => this.startGame(4));

    const desc = this.add.text(
      250,
      400,
      "You are a purple dude with a jetpack.\nDo NOT touch the ground; Collect all stars to win!\n\nEach level increases the speed and decreases braking power.\nEvery star you collect gives you more braking power.\n\nArrow Keys - control\nSpace - brakes\n\nStory: Your planet's gravity is reversed,\nyou need to save your planet quickly by collecting all the stars!",
      { fill: "#fff" }
    );

    const options = this.add.text(10, 915, "Options and Stats", {
      fill: "#fff",
      fontSize: "20px",
    });
    options.setInteractive();
    options.on("pointerdown", () => this.startOptions());
  }
}

export default TitleScene;
