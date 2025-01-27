import { modes, loadScore, saveScore, textColor, meteorsToBeat } from "../game";

class GameScene extends Phaser.Scene {
  constructor() {
    super("gameScene");
  }

  init(data) {
    this.mode = data.mode;
    this.velocityDelta = data.mode;
  }

  preload() {
    this.hasWon = false;
    this.collectedStars = 0;
    this.secondsLeft = modes[this.velocityDelta][1];

    this.load.image("sky", "/night-sky.png");
    this.load.image("platform", "/platform.png");
    this.load.image("ground", "/ground.png");
    this.load.image("star", "/star.png");
    this.load.animation("animationJson", "/data/animations.json");
    this.load.spritesheet("dude", "/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });

    this.score = loadScore();
  }

  cursorCreate() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.optionCursors = this.input.keyboard.addKeys("P,R");

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-80 * (this.velocityDelta + 4));

      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(80 * (this.velocityDelta + 4));

      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play("turn");
    }

    // Y: one: 120, two: 240, 3: 360, 4: 480
    // X: one: 400, two: 480, 3: 560, 4: 640

    if (this.cursors.space.isDown) {
      if (this.collectedStars >= 4) {
        this.player.setDrag(25 * this.collectedStars);
      } else {
        this.player.setDrag(125 - 25 * this.velocityDelta);
      }
    }

    if (this.cursors.space.isUp) {
      this.player.setDrag(0);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-120 * this.velocityDelta);
    }

    if (this.cursors.down.isDown && !this.player.body.touching.down) {
      this.player.setVelocityY(120 * this.velocityDelta);
    }

    if (this.optionCursors.P.isDown) {
      this.scene.pause("gameScene");
      this.scene.launch("pauseScene");
    }

    if (this.optionCursors.R.isDown) {
      this.scene.restart();
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true);

    this.collectedStars += 1;
    this.scoreText.setText("Stars: " + this.collectedStars);

    if (this.collectedStars == 15) this.won();
  }

  won() {
    this.score[this.mode][0]++;
    saveScore(this.score);

    this.hasWon = true;
    this.timedEvent.paused = true;
    this.titleButton.setText("Finish!");
    this.scoreText.setText("Planet's Gravity Restored!");
    this.player.body.setGravityY(300);

    this.velocityDelta = 3;
  }

  reset() {
    if (this.collectedStars !== 15) {
      this.score[this.mode][1]++;
      saveScore(this.score);

      this.scene.stop("gameScene");
      this.scene.start("meteorResultScene", {
        won: false,
        secondsLeft: 0,
        starsLeft: 15 - this.collectedStars,
        mode: this.mode,
      });
    }
  }

  create() {
    this.add.image(450, 550, "sky");

    const reset = this.add.text(900, 915, "Reset", {
      fill: textColor,
      fontSize: "20px",
    });
    reset.depth = 10;
    reset.setInteractive();
    reset.on("pointerdown", () => this.scene.restart());

    this.titleButton = this.add.text(775, 915, "Title", {
      fill: textColor,
      fontSize: "20px",
    });
    this.titleButton.depth = 10;
    this.titleButton.setInteractive();
    this.titleButton.on("pointerdown", () => {
      if (!this.hasWon) {
        this.scene.stop("gameScene");
        this.scene.start("titleScene");
      } else {
        if (this.mode == 4 && meteorsToBeat(this.score).length == 0) {
          this.scene.stop("gameScene");
          this.scene.start("endingScene");
        } else {
          this.scene.stop("gameScene");
          this.scene.start("meteorResultScene", {
            won: true,
            secondsLeft: this.secondsLeft,
            starsLeft: 0,
            mode: this.mode,
          });
        }
      }
    });

    this.level = this.add.text(
      10,
      915,
      modes[this.velocityDelta][0] + " Level!",
      {
        fill: textColor,
        fontSize: "20px",
      }
    );
    this.level.depth = 10;

    // Platforms!
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(500, 925, "ground");

    this.platforms.create(600, 750, "platform");
    this.platforms.create(50, 550, "platform");
    this.platforms.create(850, 325, "platform");
    this.platforms.create(1050, 100, "platform");
    // End

    // Player!
    this.player = this.physics.add.sprite(100, 650, "dude");

    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);

    this.player.body.setGravityY(-300);

    this.physics.add.collider(this.player, this.platforms, () =>
      this.reset(this.player)
    );
    // End

    // Stars!
    this.stars = this.physics.add.group({
      key: "star",
      repeat: 14,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    // this.stars.children.iterate(function (child) {
    //   child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
    // });

    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.stars, this.ground);
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this
    );

    this.scoreText = this.add.text(16, 16, "Stars: 0", {
      fontSize: "32px",
      fill: textColor,
      backgroundColor: "#060d29",
    });

    this.scoreText.setPadding(10);
    // End

    // Timer
    this.timedEvent = this.time.delayedCall(
      modes[this.velocityDelta][1],
      this.reset,
      [],
      this
    );

    this.timer = this.add.text(375, 915, "You have: ", {
      fontSize: "20px",
      fill: "#ff5338",
    });
    // End
  }

  update() {
    this.cursorCreate();
    if (!this.hasWon) {
      this.secondsLeft = this.timedEvent.getRemainingSeconds().toFixed(0);
      this.timer.setText(
        `You have: ${this.timedEvent.getRemainingSeconds().toFixed(0)} seconds`
      );
    }
  }
}

export default GameScene;
