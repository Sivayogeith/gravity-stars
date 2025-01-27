import {
  loadScore,
  loadSave,
  setSave,
  clearSave,
  buttonColor,
  textColor,
} from "../game";

class OptionsScene extends Phaser.Scene {
  constructor() {
    super("optionsScene");
  }

  preload() {
    this.load.image("background", "/background.png");
    this.score = loadScore();
    this.saveFile = loadSave();
  }

  back() {
    this.scene.stop("optionsScene");
    this.scene.start("titleScene");
  }

  startStoryline() {
    this.scene.stop("titleScene");
    this.scene.start("storyScene");
  }

  updateRecord() {
    this.record.setText(`
    Easy: Won: ${this.score[1][0]}, Died: ${this.score[1][1]}

    Normal: Won: ${this.score[2][0]}, Died: ${this.score[2][1]}
    
    Hard: Won: ${this.score[3][0]}, Died: ${this.score[3][1]}
    
    Impossible: Won: ${this.score[4][0]}, Died: ${this.score[4][1]}`);
  }

  create() {
    this.add.image(450, 550, "background");
    this.add.text(350, 250, "Options and Stats!", {
      fontSize: "32px",
    });

    this.add.text(350, 350, `Stats:`, {
      fill: textColor,
      fontSize: "25px",
    });

    this.recordText = `
    Easy: Won: ${this.score[1][0]}, Died: ${this.score[1][1]}

    Normal: Won: ${this.score[2][0]}, Died: ${this.score[2][1]}
    
    Hard: Won: ${this.score[3][0]}, Died: ${this.score[3][1]}
    
    Impossible: Won: ${this.score[4][0]}, Died: ${this.score[4][1]}`;

    this.record = this.add.text(350, 375, this.recordText, {
      fill: textColor,
      fontSize: "20px",
    });

    this.add.text(350, 600, `Options:`, {
      fill: textColor,
      fontSize: "25px",
    });

    this.add
      .text(375, 650, `Clear Save`, {
        fill: buttonColor,
        fontSize: "20px",
      })
      .setInteractive()
      .on("pointerdown", () => {
        const warn = confirm("Do you REALLY want to clear your save?");
        if (warn) {
          const lastwarn = confirm(
            "Last chance, wiping your save irreversible!"
          );
          if (lastwarn) {
            clearSave();

            this.saveFile = loadSave();
            this.score = loadScore();
            this.updateRecord();
          }
        }
      });

    this.add
      .text(550, 650, `Copy and Enter Save`, {
        fill: buttonColor,
        fontSize: "20px",
      })
      .setInteractive()
      .on("pointerdown", () => {
        const save = prompt("Please enter your save file!", this.saveFile);
        if (save) {
          setSave(save);

          this.saveFile = loadSave();
          this.score = loadScore();
          this.updateRecord();
        }
      });

    this.add
      .text(375, 700, `Toggle Music`, {
        fill: buttonColor,
        fontSize: "20px",
      })
      .setInteractive()
      .on("pointerdown", () => {
        if (this.sound.isPlaying("theme")) {
          this.sound.pauseAll();
        } else {
          this.sound.resumeAll();
        }
      });

    const story = this.add.text(875, 915, "Storyline", {
      fill: buttonColor,
      fontSize: "20px",
    });
    story.setInteractive();
    story.on("pointerdown", () => this.startStoryline());

    const title = this.add.text(10, 915, "Title", {
      fill: buttonColor,
      fontSize: "20px",
    });
    title.setInteractive();
    title.on("pointerdown", () => this.back());
  }
}

export default OptionsScene;
