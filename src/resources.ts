import { ImageSource, Sound } from "excalibur";
import sword from "./images/sword.png"; // for parcelv2 this is configured in the .parcelrc
import bg from "./images/background.png";
import ready from "./images/getready_keyboard.png";
import armadillo from "./images/armadillo_anim.png";
import jackalope from "./images/jackalope_run.png";
import lives from "./images/livessprites.png";
import playerwins from "./images/playerwins.png";
import hitsound from "./audio/hithurt.wav"
import gameoversound from "./audio/gameover.wav"
import gamemusic from "./audio/gamemusic.wav"

let Resources = {
  Sword: new ImageSource(sword),
  BG: new ImageSource(bg),
  Armadillo: new ImageSource(armadillo),
  Jackalope: new ImageSource(jackalope),
  Lives: new ImageSource(lives),
  Ready: new ImageSource(ready),
  PlayerWins: new ImageSource(playerwins),
  AudioHit: new Sound(hitsound),
  AudioGameOver: new Sound(gameoversound),
  GameMusic: new Sound(gamemusic)
};

export { Resources };