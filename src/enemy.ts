import { Actor, CollisionType, Engine, DegreeOfFreedom, SpriteSheet, range, Animation, Vector, AnimationStrategy } from "excalibur";
import { Spawncell } from "./spawncell";
import { Resources } from "./resources";

export class Enemy extends Actor {

    thisSpawnFactory: Spawncell
    movespeed = .5
    direction = ''
    waitTimer = 0
    waitTime = 1000

    startAnim:Animation
    rollAnim:Animation    

    constructor(spawnFactory: Spawncell) {
        super({
            radius: 40
        });

        this.thisSpawnFactory = spawnFactory
        this.body.collisionType = CollisionType.Fixed
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
        this.body.friction = 0

        this.on('exitviewport', () => this.kill())

        const runSheet = SpriteSheet.fromImageSource({
            image: Resources.Armadillo,
            grid: {
                rows: 5,
                columns: 8,
                spriteWidth: 320,
                spriteHeight: 320
            }
        });

        this.startAnim = Animation.fromSpriteSheet(runSheet, range(17, 23), 150);
        this.startAnim.scale = new Vector(0.8,0.8)
        this.startAnim.strategy = AnimationStrategy.End

        this.rollAnim = Animation.fromSpriteSheet(runSheet, range(29, 35), 50);
        this.rollAnim.scale = new Vector(0.8,0.8)

        this.startAnim.events.on('end',()=>{ this.graphics.use(this.rollAnim) })
    }

    onInitialize(_engine: Engine): void {
        
        this.graphics.use(this.startAnim)
        this.graphics.offset = new Vector(10,-80)
    }

    setDirection(newDirection: string) {
        this.direction = newDirection   
        if(newDirection == 'left'){
            this.rollAnim.flipHorizontal = true     
            this.startAnim.flipHorizontal = true     
        }
    }

    onPreUpdate(_engine: Engine, _delta: number): void {

        this.waitTimer += _delta

        if (this.direction != '' && this.waitTimer > this.waitTime) {
            switch (this.direction) {
                case 'left':
                    this.pos.x -= this.movespeed * _delta
                    break;
                case 'right':
                    this.pos.x += this.movespeed * _delta
                    break;
                case 'up':
                    this.pos.y -= this.movespeed * _delta
                    break;
                case 'down':
                    this.pos.y += this.movespeed * _delta
                    break;

                default:
                    break;
            }
        }

    }
}