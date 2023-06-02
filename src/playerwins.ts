import { Actor, Animation, AnimationStrategy, SpriteSheet, range} from "excalibur";
import { Resources } from "./resources";

export class PlayerWins extends Actor {

    p1Wins:Animation
    p2Wins:Animation

    constructor(playerID:Number){
        super()

        const spritesheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerWins,
            grid: {
                rows: 2,
                columns: 1,
                spriteWidth: 1205,
                spriteHeight: 116
              }
        })

        this.p1Wins = Animation.fromSpriteSheet(spritesheet, range(0, 0), 150);
        this.p1Wins.strategy = AnimationStrategy.Loop

        this.p2Wins = Animation.fromSpriteSheet(spritesheet, range(1, 1), 150);
        this.p2Wins.strategy = AnimationStrategy.Loop

        if(playerID == 1) this.graphics.use(this.p1Wins)
        if(playerID == 2) this.graphics.use(this.p2Wins)

        this.graphics.opacity = 0.5
    }

    
}