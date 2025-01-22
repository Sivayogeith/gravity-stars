import GameScene from '/src/gameScene.js';
import TitleScene from '/src/titleScene.js';

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 950,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);

game.scene.add('gameScene', GameScene)
game.scene.add('titleScene', TitleScene)

game.scene.start('titleScene')