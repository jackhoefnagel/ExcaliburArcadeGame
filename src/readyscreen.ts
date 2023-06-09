import { Engine, Input, Scene } from "excalibur";
import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";
import { InputHandler } from "./inputhandler";

export class ReadyScreen extends Scene{

    inputHandler

    constructor(){
        super()
        this.inputHandler = new InputHandler()
    }

    onInitialize(_engine: Engine): void {
        const bg = new Actor()
        bg.graphics.use(Resources.Ready.toSprite())
        bg.anchor = new Vector(0,0)
        bg.pos = new Vector(0,0)
        this.add(bg)

        this.add(this.inputHandler)
    }

    onPreUpdate(engine: Engine, _delta: number): void {
        if (this.inputHandler.p0Horizontal != 0 || 
            this.inputHandler.p0Vertical != 0 || 
            this.inputHandler.p1Horizontal != 0 || 
            this.inputHandler.p1Vertical != 0
            ){
                engine.goToScene('game')
        }
    }
}