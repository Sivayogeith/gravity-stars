class GameScene extends Phaser.Scene {
  constructor() {
    super("gameScene");
  }

  init(data) {
    this.velocityDelta = data.mode;
  }

  preload() {
    this.collected_stars = 0;

    this.load.image("sky", "/night-sky.png");
    this.load.image("platform", "/platform.png");
    this.load.image("ground", "/ground.png");
    this.load.image("star", "/star.png");
    this.load.spritesheet("dude", "/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  animationsCreate() {
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  cursorCreate() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.velocityCursors = this.input.keyboard.addKeys("ONE,TWO,THREE,FOUR");
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
      if (this.collected_stars >= 4) {
        this.player.setDrag(25 * this.collected_stars);
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
  }

  collectStar(player, star) {
    star.disableBody(true, true);

    this.collected_stars += 1;
    this.scoreText.setText("Stars: " + this.collected_stars);

    if (this.collected_stars == 15) {
      this.titleButton.setText("Finish to Title!")
      this.titleButton.x = 650
  }
  }

  reset(player) {
    if (this.collected_stars !== 15) {
      this.scene.restart();
    }
  }

  create() {
    this.add.image(450, 550, "sky");

    const reset = this.add.text(900, 915, "Reset", {
      fill: "#fff",
      fontSize: "20px",
    });
    reset.depth = 10;
    reset.setInteractive();
    reset.on("pointerdown", () => this.scene.restart());

    this.titleButton = this.add.text(775, 915, "Title", {
      fill: "#fff",
      fontSize: "20px",
    });
    this.titleButton.depth = 10;
    this.titleButton.setInteractive();
    this.titleButton.on("pointerdown", () => {
      this.scene.stop("gameScene");
      this.scene.start("titleScene");
    });

    // Platforms!
    this.platforms = this.physics.add.staticGroup();
    this.ground = this.physics.add.staticGroup();

    this.ground.create(500, 925, "ground")

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

    // this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.ground, () =>
      this.reset(this.player)
    );
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
      fill: "#fff",
    });
    // End
    this.animationsCreate();
  }

  update() {
    this.cursorCreate();
  }
}

export default GameScene;
