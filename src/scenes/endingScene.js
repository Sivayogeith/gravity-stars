import { buttonColor, textColor } from "../game";

class EndingScene extends Phaser.Scene {
  constructor() {
    super("endingScene");
  }

  preload() {
    this.nearRocket = false

    this.load.image(
      "ending-background",
      "/ending-background.png"
    );
    this.load.image("moon", "/moon.png");
    this.load.image("rocket", "/rocket.png");
    this.load.image("flag", "/flag.png");
  }

  startTitle() {
    this.scene.stop("endingScene");
    this.scene.start("titleScene");
  }

  create() {
    this.add.image(500, 450, "ending-background");

    this.add.text(125, 150, "Moon successfully conquered!", {
      fill: textColor,
      fontSize: "45px",
    });
    this.add
      .text(
        175,
        225,

        `A impressed Dennis Hope hands you the moon's papers and his rocket, but now the U.S. government is coming for it- Part 2 is yet to come.`,
        {
          fill: textColor,
          fontSize: "20px",
        }
      )
      .setWordWrapWidth(600);

    this.moon = this.physics.add.staticImage(450, 675, "moon");
    this.rocket = this.physics.add.staticImage(325, 422, "rocket");
    this.flag = this.physics.add.staticImage(575, 425, "flag");

    this.add.text(275, 650, "Press G at the rocket to leave!", {
      fill: textColor,
      fontSize: "20px",
    });

    this.player = this.physics.add.sprite(500, 425, "dude");

    this.player.setBounce(0.8);
    this.player.setCollideWorldBounds(true);

    this.player.body.setGravityY(50);

    this.physics.add.collider(this.player, this.moon);
  }

  update() {
    if(this.physics.overlapCirc(325, 422, 10).length > 0){
        this.nearRocket = true
    } else { this.nearRocket = false }

    this.cursors = this.input.keyboard.createCursorKeys();
    this.optionCursors = this.input.keyboard.addKeys("G");

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-80 * 7);

      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(80 * 7);

      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play("turn");
    }

    if(this.optionCursors.G.isDown && this.nearRocket){
        this.scene.stop("endingScene")
        this.scene.start("titleScene")
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-120 * 3);
    }

    if (this.cursors.down.isDown && !this.player.body.touching.down) {
      this.player.setVelocityY(120 * 3);
    }
  }
}

export default EndingScene;
