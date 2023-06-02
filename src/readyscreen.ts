import { Engine, Input, Scene } from "excalibur";
import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";

export class ReadyScreen extends Scene{

    onInitialize(_engine: Engine): void {
        const bg = new Actor()
        bg.graphics.use(Resources.Ready.toSprite())
        bg.anchor = new Vector(0,0)
        bg.pos = new Vector(0,0)
        this.add(bg)
    }

    onPreUpdate(engine: Engine, _delta: number): void {
        if (engine.input.keyboard.wasPressed(Input.Keys.Up) || 
            engine.input.keyboard.wasPressed(Input.Keys.Down) ||
            engine.input.keyboard.wasPressed(Input.Keys.Left) || 
            engine.input.keyboard.wasPressed(Input.Keys.Right) ||
            engine.input.keyboard.wasPressed(Input.Keys.W) ||
            engine.input.keyboard.wasPressed(Input.Keys.S) ||
            engine.input.keyboard.wasPressed(Input.Keys.A) ||
            engine.input.keyboard.wasPressed(Input.Keys.D)) {
                engine.goToScene('game')
        }
    }
}