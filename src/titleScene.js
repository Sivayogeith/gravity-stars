class TitleScene extends Phaser.Scene {
  constructor() {
    super('titleScene');
  }

  preload() {
    this.load.image("background", "/assets/background.png");
  }

  startGame(mode) {
	this.scene.stop("titleScene")
    this.scene.start("gameScene", { mode: mode });
  }

  create() {
    const bg = this.add.image(450, 550, "background");

    const text = this.add.text(400, 350, "Gravity Stars!", {
      fontSize: "32px",
    });

    const easy = this.add.text(325, 450, "Easy!", { fill: "#5399f5" });
    easy.setInteractive();
    easy.on("pointerdown", () => this.startGame(1));

    const medium = this.add.text(425, 450, "Medium!", { fill: "#5399f5" });
    medium.setInteractive();
    medium.on("pointerdown", () => this.startGame(2));

    const hard = this.add.text(550, 450, "Hard!", { fill: "#5399f5" });
    hard.setInteractive();
    hard.on("pointerdown", () => this.startGame(3));

    const impossible = this.add.text(650, 450, "Impossible!", {
      fill: "#5399f5",
    });
    impossible.setInteractive();
    impossible.on("pointerdown", () => this.startGame(4));

	const desc = this.add.text(250, 500, "You are a purple dude with a jetpack.\nDo NOT touch the ground; Collect all stars to win!\n\nEach level increases the speed and decreases braking power.\nEvery star you collect gives you more braking power.\n\nArrow Keys - control\nSpace - breaking", {fill: "#fff"})
  }
}

export default TitleScene;
