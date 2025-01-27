import { buttonColor, textColor } from "../game";

class PauseScene extends Phaser.Scene {
  constructor() {
    super("pauseScene");
  }

  back() {
    this.scene.stop("pauseScene");
    this.scene.start("gameScene");
  }

  create() {
    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;

    this.add.image(450, 550, "background");

    this.add
      .text(screenCenterX, screenCenterY - 30, "Paused!", {
        fill: textColor,
        fontSize: "50px",
      })
      .setOrigin(0.5);

    this.add
      .text(screenCenterX - 20, screenCenterY + 30, "Back", {
        fill: buttonColor,
        fontSize: "32px",
      })
      .setInteractive()
      .on("pointerdown", () => this.back())
      .setOrigin(0.5);
  }
}

export default PauseScene;
