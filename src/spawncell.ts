import { Actor, CollisionType, Vector } from "excalibur";
import { Enemy } from "./enemy";

export class Spawncell extends Actor {

    thisCellDirection:string // left, right, down or up

    constructor(){
        super({
            width:205,
            height:127,
            anchor: new Vector(0,0)
        })
        
        this.thisCellDirection = ''
        this.body.collisionType = CollisionType.Fixed
    }

    setDirection(cellDirection:string){
        this.thisCellDirection = cellDirection        
    }

    spawnEnemy(){
        let enemy = new Enemy(this)
        enemy.pos = this.pos.add( new Vector(this.width/2,this.height/2) )
        enemy.setDirection(this.thisCellDirection)
        this.scene.add(enemy)
    }
}