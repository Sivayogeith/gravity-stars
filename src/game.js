import GameScene from "./scenes/gameScene.js";
import OptionsScene from "./scenes/optionScene.js";
import PauseScene from "./scenes/pauseScene.js";
import StoryScene from "./scenes/storyScene.js";
import TitleScene from "./scenes/titleScene.js";
import MeteorResultScene from "./scenes/meteorResultScene.js";
import EndingScene from "./scenes/endingScene.js";

const config = {
  type: Phaser.AUTO,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1000,
    height: 949,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);

game.scene.add("gameScene", GameScene);
game.scene.add("titleScene", TitleScene);
game.scene.add("optionsScene", OptionsScene);
game.scene.add("storyScene", StoryScene);
game.scene.add("meteorResultScene", MeteorResultScene);
game.scene.add("pauseScene", PauseScene);
game.scene.add("endingScene", EndingScene);

game.scene.start("titleScene");

export const modes = {
  1: ["Small", 35000],
  2: ["Medium", 30000],
  3: ["Large", 25000],
  4: ["Giant", 20000],
};

export const DEFAULT_SCORE = {
  1: [0, 0],
  2: [0, 0],
  3: [0, 0],
  4: [0, 0],
};

export const saveScore = (score) => {
  setSave(Buffer.from(JSON.stringify(score)).toString("base64"));
};

export const loadScore = () => {
  let score;
  if (!loadSave()) {
    score = DEFAULT_SCORE;
    saveScore(score);
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

export const meteorsToBeat = (score) =>
  Object.entries(score)
    .filter(([key, meteor]) => meteor[0] === 0)
    .map(([key]) => key);

export const buttonColor = "#5399f5";
export const textColor = "#fff";
