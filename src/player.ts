import { Actor, CollisionType, Engine, Vector, Input, DegreeOfFreedom, CollisionStartEvent, SpriteSheet, AnimationStrategy, range, Animation } from "excalibur";
import { Resources } from "./resources";
import { Enemy } from "./enemy";
import { Lives } from "./lives";
import { GameScene } from "./gamescene";

export class Player extends Actor {

  thisPlayerID = 0
  movespeed = 3
  idleAnim: Animation
  runAnim: Animation
  dieAnim: Animation
  winAnim: Animation
  spriteSheet: SpriteSheet
  graphicsScale = 8
  playerRunning = false
  lastDirectionX = 1
  damageTimeout = 0
  lives = 5
  livesGraphics
  playerScene: GameScene
  

  constructor(playerID: number, thisScene: GameScene) {
    super({
      radius: 40
    });

    this.playerScene = thisScene

    this.livesGraphics = new Lives(playerID)
    this.addChild(this.livesGraphics)
    this.livesGraphics.pos = new Vector(0, 60)

    this.thisPlayerID = playerID

    this.body.collisionType = CollisionType.Active
    this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
    this.body.friction = 0
    this.body.bounciness = 1

    this.spriteSheet = SpriteSheet.fromImageSource({
      image: Resources.Jackalope,
      grid: {
        rows: 4,
        columns: 4,
        spriteWidth: 32,
        spriteHeight: 20
      }
    });

    this.idleAnim = Animation.fromSpriteSheet(this.spriteSheet, range(0, 0), 150);
    this.idleAnim.scale = new Vector(this.graphicsScale, this.graphicsScale)
    this.idleAnim.strategy = AnimationStrategy.Loop

    this.runAnim = Animation.fromSpriteSheet(this.spriteSheet, range(0, 4), 75);
    this.runAnim.scale = new Vector(this.graphicsScale, this.graphicsScale)
    this.runAnim.strategy = AnimationStrategy.Loop

    this.dieAnim = Animation.fromSpriteSheet(this.spriteSheet, range(5, 7), 150);
    this.dieAnim.scale = new Vector(this.graphicsScale, this.graphicsScale)
    this.dieAnim.strategy = AnimationStrategy.Freeze

    this.winAnim = Animation.fromSpriteSheet(this.spriteSheet, range(10, 18), 150);
    this.winAnim.scale = new Vector(this.graphicsScale, this.graphicsScale)
    this.winAnim.strategy = AnimationStrategy.End

    this.graphics.anchor = new Vector(0.6,0.5)
  }

  onInitialize(_engine: Engine): void {

    this.graphics.use(this.idleAnim)
    this.graphics.offset = new Vector(20, -40)
    // if (this.thisPlayerID == 1) spr.tint = Color.Red
    // if (this.thisPlayerID == 2) playerSprite.tint = Color.Blue    

    this.on('collisionstart', (event) => this.handleCollision(event))


  }

  handleCollision(event: CollisionStartEvent) {
    if (event.other instanceof Enemy) {
      if (this.damageTimeout <= 0) {
        this.getDamage()
        let hitSound = Resources.AudioHit
        hitSound.play()
      }
    }
  }

  getDamage() {
    this.lives--
    if(this.lives > 0){
      this.actions.blink(50, 50, 20);
      this.damageTimeout = 2000;
      console.log('player' + this.thisPlayerID + " lives: " + this.lives)
    }
    if (this.lives <= 0) this.playerDeath()
    this.livesGraphics.modifyLives(this.lives)
  }

  playerDeath() {
    // first a death animation
    // then go to game over scene
    console.log('player' + this.thisPlayerID + " dies!")
    this.removeChild(this.livesGraphics)
    this.graphics.use(this.dieAnim)
    this.vel = new Vector(0,0)
    
    this.playerScene.gameOver(this.thisPlayerID)
  }

  playerWin(){
    this.graphics.use(this.winAnim)
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    if(this.lives>0){
      this.processControls(_engine, _delta)
      if (this.damageTimeout > 0) this.damageTimeout -= _delta
    }

  }

  processControls(engine: Engine, _delta: number) {
    let xspeed = 0
    let yspeed = 0

    if (this.thisPlayerID == 1) {
      if (engine.input.keyboard.isHeld(Input.Keys.W)) {
        yspeed = -1
      }
      if (engine.input.keyboard.isHeld(Input.Keys.S)) {
        yspeed = 1
      }
      if (engine.input.keyboard.isHeld(Input.Keys.A)) {
        xspeed = -1.6
      }
      if (engine.input.keyboard.isHeld(Input.Keys.D)) {
        xspeed = 1.6
      }
    }
    else if (this.thisPlayerID == 2) {
      if (engine.input.keyboard.isHeld(Input.Keys.Up)) {
        yspeed = -1
      }
      if (engine.input.keyboard.isHeld(Input.Keys.Down)) {
        yspeed = 1
      }
      if (engine.input.keyboard.isHeld(Input.Keys.Left)) {
        xspeed = -1.6
      }
      if (engine.input.keyboard.isHeld(Input.Keys.Right)) {
        xspeed = 1.6
      }
    }

    this.vel = this.vel.add(new Vector(xspeed * _delta * this.movespeed, yspeed * _delta * this.movespeed))
    this.vel = this.vel.scale(new Vector(0.95, 0.95))

    this.handleAnimations(xspeed, yspeed)
  }

  handleAnimations(xspeed: number, yspeed: number) {

    if (Math.abs(xspeed) > 0) this.lastDirectionX = xspeed

    if (this.lastDirectionX < 0 && this.runAnim.flipHorizontal == false) {
      this.runAnim.flipHorizontal = true;
      this.idleAnim.flipHorizontal = true;
    }
    else if (this.lastDirectionX > 1 && this.runAnim.flipHorizontal == true) {
      this.runAnim.flipHorizontal = false;
      this.idleAnim.flipHorizontal = false;
    }

    if (xspeed == 0 && yspeed == 0 && this.playerRunning == true) {
      this.playerRunning = false
      this.graphics.use(this.idleAnim)
    }
    else if (Math.abs(xspeed) > 0 || Math.abs(yspeed) > 0 && this.playerRunning == false) {
      this.playerRunning = true
      this.graphics.use(this.runAnim)
    }
  }
}
