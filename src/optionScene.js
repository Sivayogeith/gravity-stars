import {
  loadScore,
  loadSave,
  setSave,
  clearSave,
} from "./game";

class OptionsScene extends Phaser.Scene {
  constructor() {
    super("optionsScene");
  }

  preload() {
    this.load.image("background", "/gravity-stars/background.png");
    this.score = loadScore();
    this.saveFile = loadSave();
  }

  back() {
    this.scene.stop("optionsScene");
    this.scene.start("titleScene");
  }

  create() {
    const bg = this.add.image(450, 550, "background");
    this.add.text(350, 250, "Options and Stats!", {
      fontSize: "32px",
    });

    this.add.text(350, 350, `Stats:`, {
      fill: "#fff",
      fontSize: "25px",
    });

    this.recordText = `
    Easy: Won: ${this.score[1][0]}, Died: ${this.score[1][1]}

    Normal: Won: ${this.score[2][0]}, Died: ${this.score[2][1]}
    
    Hard: Won: ${this.score[3][0]}, Died: ${this.score[3][1]}
    
    Impossible: Won: ${this.score[4][0]}, Died: ${this.score[4][1]}`;

    const record = this.add.text(350, 375, this.recordText, {
      fill: "#fff",
      fontSize: "20px",
    });

    this.add.text(350, 600, `Options:`, {
      fill: "#fff",
      fontSize: "25px",
    });

    this.add
      .text(375, 650, `Clear Save`, {
        fill: "#5399f5",
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
            record.setText(this.recordText);
          }
        }
      });

    this.add
      .text(550, 650, `Copy and Enter Save`, {
        fill: "#5399f5",
        fontSize: "20px",
      })
      .setInteractive()
      .on("pointerdown", () => {
        const save = prompt("Please enter your save file!", this.saveFile);
        if (save) {
          setSave(save);

          this.saveFile = loadSave();
          this.score = loadScore();
          record.setText(this.recordText);
        }
      });

    const title = this.add.text(10, 915, "Title", {
      fill: "#fff",
      fontSize: "20px",
    });
    title.setInteractive();
    title.on("pointerdown", () => this.back());
  }
}

export default OptionsScene;
