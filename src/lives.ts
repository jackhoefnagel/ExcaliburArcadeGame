import { Actor, Engine, SpriteSheet, range, Animation } from "excalibur";
import { Resources } from "./resources";

export class Lives extends Actor {

    playerID = 0

    p1_5:Animation
    p1_4:Animation
    p1_3:Animation
    p1_2:Animation
    p1_1:Animation
    p2_5:Animation
    p2_4:Animation
    p2_3:Animation
    p2_2:Animation
    p2_1:Animation

    constructor(newPlayerID:number){
        super()

        this.playerID = newPlayerID

        const spritesheet = SpriteSheet.fromImageSource({
            image: Resources.Lives,
            grid: {
                rows: 10,
                columns: 1,
                spriteWidth: 169,
                spriteHeight: 31
            }})

            this.p1_5 = Animation.fromSpriteSheet(spritesheet, range(0, 0), 150);
            this.p1_4 = Animation.fromSpriteSheet(spritesheet, range(1, 1), 150);
            this.p1_3 = Animation.fromSpriteSheet(spritesheet, range(2, 2), 150);
            this.p1_2 = Animation.fromSpriteSheet(spritesheet, range(3, 3), 150);
            this.p1_1 = Animation.fromSpriteSheet(spritesheet, range(4, 4), 150);

            this.p2_5 = Animation.fromSpriteSheet(spritesheet, range(5, 5), 150);
            this.p2_4 = Animation.fromSpriteSheet(spritesheet, range(6, 6), 150);
            this.p2_3 = Animation.fromSpriteSheet(spritesheet, range(7, 7), 150);
            this.p2_2 = Animation.fromSpriteSheet(spritesheet, range(8, 8), 150);
            this.p2_1 = Animation.fromSpriteSheet(spritesheet, range(9, 9), 150);

            if(this.playerID == 1){
                this.graphics.use(this.p1_5)
            }
            else if(this.playerID == 2){
                this.graphics.use(this.p2_5)
            }
    }

    modifyLives(newLivesAmount:Number){
        if(this.playerID == 1){
            if(newLivesAmount == 5) this.graphics.use(this.p1_5)
            if(newLivesAmount == 4) this.graphics.use(this.p1_4)
            if(newLivesAmount == 3) this.graphics.use(this.p1_3)
            if(newLivesAmount == 2) this.graphics.use(this.p1_2)
            if(newLivesAmount == 1) this.graphics.use(this.p1_1)
        }
        if(this.playerID == 2){
            if(newLivesAmount == 5) this.graphics.use(this.p2_5)
            if(newLivesAmount == 4) this.graphics.use(this.p2_4)
            if(newLivesAmount == 3) this.graphics.use(this.p2_3)
            if(newLivesAmount == 2) this.graphics.use(this.p2_2)
            if(newLivesAmount == 1) this.graphics.use(this.p2_1)
        }
    }

    onInitialize(_engine: Engine): void {
        //this.graphics.use(Resources.Lives.toSprite())
        
    }
}