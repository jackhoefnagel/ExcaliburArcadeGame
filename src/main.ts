import { Engine, Loader, Physics } from "excalibur";
import { Resources } from "./resources";
import { GameScene } from "./gamescene";
import { ReadyScreen } from "./readyscreen";


class Game extends Engine {

  constructor() {
    super({ width: 1440, height: 900 });

    //this.debug.transform.showAll = true
    //this.showDebug(true);

    Physics.useRealisticPhysics()
  }

  initialize() {

    const gameScene = new GameScene()
    this.addScene('game', gameScene)
    const readyScreen = new ReadyScreen()
    this.addScene('ready', readyScreen)
    this.goToScene('ready')

    

    const loader = new Loader([Resources.BG, Resources.Sword, Resources.Armadillo, Resources.Jackalope, Resources.Lives, Resources.Ready, Resources.PlayerWins]);
    this.start(loader);    
  }

}

export const game = new Game();
game.initialize();