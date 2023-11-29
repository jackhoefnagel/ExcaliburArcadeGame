import { CollisionType, DegreeOfFreedom, Engine, Scene, SceneActivationContext } from "excalibur";
import { Actor, Physics, Timer, Vector, randomIntInRange } from "excalibur";
import { Resources } from "./resources";
import { Spawncell } from "./spawncell";
import { Player } from "./player";
import { PlayerWins } from "./playerwins";
import { Enemy } from "./enemy";
import { InputHandler } from "./inputhandler";
//import { EnemyWalk } from "./enemywalk";

export class GameScene extends Scene {

    isPlaying = true
    spawnTimer: Timer

    topcells: Spawncell[]
    leftcells: Spawncell[]
    rightcells: Spawncell[]
    bottomcells: Spawncell[]

    gamemusic = Resources.GameMusic

    inputHandler
        

    constructor() {
        super();

        this.topcells = []
        this.leftcells = []
        this.rightcells = []
        this.bottomcells = []

        this.spawnTimer = new Timer({
            fcn: () => this.spawnWave(),
            repeats: true,
            interval: 1500
        })

        this.inputHandler = new InputHandler();

        Physics.useRealisticPhysics()
    }

    onInitialize(_engine: Engine): void {
        this.add(this.spawnTimer)
        this.gamemusic.loop = true
    }

    onActivate(_context: SceneActivationContext<unknown>): void {
        this.gamemusic.loop = true
        this.gamemusic.play()

        this.isPlaying = true

        this.generateCells()

        this.spawnTimer.reset()
        this.spawnTimer.start()

        this.add(this.inputHandler)

        const bg = new Actor()
        bg.graphics.use(Resources.BG.toSprite())
        bg.anchor = new Vector(0, 0)
        bg.pos = new Vector(0, 0)
        this.add(bg)

        const player1 = new Player(1, this, this.inputHandler)
        player1.pos = new Vector(_context.engine.screen.halfDrawWidth - 100, _context.engine.screen.halfDrawHeight)
        this.add(player1)

        const player2 = new Player(2, this, this.inputHandler)
        player2.pos = new Vector(_context.engine.screen.halfDrawWidth + 100, _context.engine.screen.halfDrawHeight)
        this.add(player2)

    }

    onDeactivate(_context: SceneActivationContext<undefined>): void {
        console.log(this.actors)

        this.gamemusic.pause()

        this.actors.forEach(element => {
            element.kill()
        });
    }

    gameOver(playerID: number) {

        this.actors.forEach(element => {
            if (element instanceof Enemy) {
                element.kill()
            }
        });

        if (this.isPlaying) {
            this.spawnTimer.stop()
            const playerWins = new PlayerWins(3 - playerID)
            playerWins.pos = new Vector(this.engine.screen.drawWidth / 2, this.engine.screen.drawHeight / 2)
            this.add(playerWins)
            this.isPlaying = false

            const sceneTimer = new Timer({
                fcn: () => this.engine.goToScene('ready'),
                repeats: false,
                interval: 3000
            })
            this.add(sceneTimer)
            sceneTimer.start()
        }
    }

    spawnWave() {
        this.bottomcells[randomIntInRange(0, 4)].spawnEnemy()
        this.topcells[randomIntInRange(0, 4)].spawnEnemy()
        this.leftcells[randomIntInRange(0, 4)].spawnEnemy()
        this.rightcells[randomIntInRange(0, 4)].spawnEnemy()
    }


    generateCells() {
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 7; j++) {
                if (i % 0 == 0 || i % 6 == 0 || j % 0 == 0 || j % 6 == 0) {
                    if (!(i == 0 && j == 0) &&
                        !(i == 0 && j == 6) &&
                        !(i == 6 && j == 0) &&
                        !(i == 6 && j == 6)) {

                        let cell = new Spawncell();
                        this.add(cell)
                        cell.pos = new Vector(i * 206, j * 129)

                        if (i == 0 && j != 0) { cell.setDirection('right'); this.leftcells.push(cell); }
                        else if (i == 6 && j != 0) { cell.setDirection('left'); this.rightcells.push(cell); }
                        else if (i != 0 && j == 0) { cell.setDirection('down'); this.topcells.push(cell); }
                        else if (i != 0 && j == 6) { cell.setDirection('up'); this.bottomcells.push(cell); }
                    }
                }

            }
        }
    }

}