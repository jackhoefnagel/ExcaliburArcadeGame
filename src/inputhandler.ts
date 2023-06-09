import { Actor, Engine, Input } from "excalibur";
import { Arcade } from "arcade-game"

export class InputHandler extends Actor {

    arcade
    joystickListener

    p0Horizontal = 0
    p0Vertical = 0
    p1Horizontal = 0
    p1Vertical = 0

    p0leftPressed = false
    p0rightPressed = false
    p0upPressed = false
    p0downPressed = false

    p1leftPressed = false
    p1rightPressed = false
    p1upPressed = false
    p1downPressed = false

    constructor() {
        super()
        this.arcade = new Arcade(this, false, true)
        this.joystickListener = (e: CustomEvent) => this.joyStickFound(e)

        // Joystick 1
        document.addEventListener("joystick0up", () => {
            this.p0upPressed = true;
            this.p0downPressed = false;
        })
        document.addEventListener("joystick0down", () => {
            this.p0upPressed = false;
            this.p0downPressed = true;
        })
        document.addEventListener("joystick0left", () => {
            this.p0leftPressed = true;
            this.p0rightPressed = false;
        })
        document.addEventListener("joystick0right", () => {
            this.p0leftPressed = false;
            this.p0rightPressed = true;
        })
        document.addEventListener("joystick0neutral", () => {
            this.p0upPressed = false;
            this.p0downPressed = false;
            this.p0leftPressed = false;
            this.p0rightPressed = false;
        });

        // Joystick 2
        document.addEventListener("joystick1up", () => {
            this.p1upPressed = true;
            this.p1downPressed = false;
        })
        document.addEventListener("joystick1down", () => {
            this.p1upPressed = false;
            this.p1downPressed = true;
        })
        document.addEventListener("joystick1left", () => {
            this.p1leftPressed = true;
            this.p1rightPressed = false;
        })
        document.addEventListener("joystick1right", () => {
            this.p1leftPressed = false;
            this.p1rightPressed = true;
        })
        document.addEventListener("joystick1neutral", () => {
            this.p1upPressed = false;
            this.p1downPressed = false;
            this.p1leftPressed = false;
            this.p1rightPressed = false;
        });
    }

    joyStickFound(e: CustomEvent) {
        let joystick = this.arcade.Joysticks[e.detail]

        // debug, this shows you the names of the buttons when they are pressed
        for (const buttonEvent of joystick.ButtonEvents) {
            document.addEventListener(buttonEvent, () => console.log(buttonEvent))
        }
    }

    onPreUpdate(_engine: Engine, _delta: number): void {
        for (let joystick of this.arcade.Joysticks) {
            joystick.update()
        }

        this.processJoystickInput()
        this.processKeyboardInput(_engine)

        
    }

    processJoystickInput(){
        // Player1
        if (this.p0downPressed) this.p0Vertical = 1
        else if (this.p0upPressed) this.p0Vertical = -1
        else if (!this.p0downPressed && !this.p0upPressed) this.p0Vertical = 0

        if (this.p0leftPressed) this.p0Horizontal = -1
        else if (this.p0rightPressed) this.p0Horizontal = 1
        else if (!this.p0leftPressed && !this.p0rightPressed) this.p0Horizontal = 0

        // Player2
        if (this.p1downPressed) this.p1Vertical = 1
        else if (this.p1upPressed) this.p1Vertical = -1
        else if (!this.p1downPressed && !this.p1upPressed) this.p1Vertical = 0

        if (this.p1leftPressed) this.p1Horizontal = -1
        else if (this.p1rightPressed) this.p1Horizontal = 1
        else if (!this.p1leftPressed && !this.p1rightPressed) this.p1Horizontal = 0
    }

    processKeyboardInput(engine: Engine){
        // Player 1
        if (engine.input.keyboard.isHeld(Input.Keys.W)) {
            this.p0Vertical = -1
            this.p0downPressed = true
            this.p0upPressed = false
          }
          else if (engine.input.keyboard.isHeld(Input.Keys.S)) {
            this.p0Vertical = 1
            this.p0downPressed = false
            this.p0upPressed = true
          }
          else{
            this.p0Vertical = 0
            this.p0downPressed = false
            this.p0upPressed = false
          }

          if (engine.input.keyboard.isHeld(Input.Keys.A)) {
            this.p0Horizontal = -1
            this.p0leftPressed = true
            this.p0rightPressed = false
          }
          else if (engine.input.keyboard.isHeld(Input.Keys.D)) {
            this.p0Horizontal = 1
            this.p0leftPressed = false
            this.p0rightPressed = true
          }
          else{
            this.p0Horizontal = 0
            this.p0leftPressed = false
            this.p0rightPressed = false
          }

          // Player2
          if (engine.input.keyboard.isHeld(Input.Keys.Up)) {
            this.p1Vertical = -1
            this.p1downPressed = true
            this.p1upPressed = false
          }
          else if (engine.input.keyboard.isHeld(Input.Keys.Down)) {
            this.p1Vertical = 1
            this.p1downPressed = false
            this.p1upPressed = true
          }
          else {
            this.p1Vertical = 0
            this.p1downPressed = false
            this.p1upPressed = false
          }

          if (engine.input.keyboard.isHeld(Input.Keys.Left)) {
            this.p1Horizontal = -1
            this.p1leftPressed = true
            this.p1rightPressed = false
          }
          else if (engine.input.keyboard.isHeld(Input.Keys.Right)) {
            this.p1Horizontal = 1
            this.p1leftPressed = false
            this.p1rightPressed = true
          }
          else{
            this.p1Horizontal = 0
            this.p1leftPressed = false
            this.p1rightPressed = false
          }
    }
}