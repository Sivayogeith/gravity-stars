import GameScene from './gameScene.js';
import OptionsScene from './optionScene.js';
import TitleScene from './titleScene.js';

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
game.scene.add('optionsScene', OptionsScene)

game.scene.start('titleScene')

export const modes = {
  1: "Easy",
  2: "Normal",
  3: "Hard",
  4: "Impossible"
}

export const DEFAULT_SCORE = {
  1: [0, 0],
  2: [0, 0],
  3: [0, 0],
  4: [0, 0],
}

export const saveScore = (score) => {
  setSave(Buffer.from(JSON.stringify(score)).toString("base64"));
};

export const loadScore = () => {
  let score;
  if (!loadSave()) {
    score = DEFAULT_SCORE;
    saveScore(score)
  } else {
    score = JSON.parse(Buffer.from(loadSave(), "base64").toString());
  }
  return score;
};

export const clearSave = () => {
  saveScore(DEFAULT_SCORE);
};

export const loadSave = () => {
  return localStorage.getItem("saveFile");
};

export const setSave = (save) => {
  localStorage.setItem("saveFile", save);
};