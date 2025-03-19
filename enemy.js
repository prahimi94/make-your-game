import { groundTop } from './platform.js';
import { platformImageHeight, platformImageWidth } from './platform.js';
import { scrollOffset } from './playerMovement.js';

export let enemies = []
let enemyIndex = 0

class Enemy {
    constructor({x, endX, index, velocityX = 1, movementDirection = 'right'}){
        this.position = {
            y: groundTop - platformImageHeight,
            x: x,
            startX: x,
            endX: endX
        }
        this.movementDirection = movementDirection
        this.width = 50
        this.height = 50
        this.velocity = {
            x: velocityX
        }

        this.index = index
        this.div = document.createElement('div')
        this.div.setAttribute("id", `enemy${index}`)
        this.div.setAttribute("class", `enemy`)
        // this.div.style.backgroundImage = `url(image/mushroom.svg)`
        this.div.style.backgroundImage = `url(image/carnivorous-plant.png)`
        this.div.style.backgroundSize = 'cover'
        this.div.style.position = "absolute"; // Ensure the div is positioned
        document.body.appendChild(this.div)
    }

    draw() {
        this.div.style.left = this.position.x + "px";
        // this.div.style.top = window.innerHeight - 10 + "px";
        this.div.style.top = this.position.y + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
    }

    updatePosition() {
        if(this.movementDirection == 'right' && this.position.x >= this.position.startX && this.position.x < this.position.endX){
            this.position.x += Math.abs(this.velocity.x) // just move foreward
        } else if(this.movementDirection == 'right' && this.position.x >= this.position.endX){
            this.movementDirection = 'left'
        } else if(this.movementDirection == 'left' && this.position.x > this.position.startX){
            this.position.x -= Math.abs(this.velocity.x) // just move backward
        } else if (this.movementDirection == 'left' && this.position.x <= this.position.startX) {
            this.movementDirection = 'right'
        }
        this.draw()
    }

    scrollEnemy(velocity, scrollDirection = 'left') {
        if(scrollDirection == 'left'){
            this.position.startX -= velocity
            this.position.endX -= velocity
            this.position.x -= velocity
        } else { 
            this.position.startX += velocity
            this.position.endX += velocity
            this.position.x += velocity
        }
        this.draw()
    }
}

export const initEnemies = () => {
    const oldEnemyDivs = document.getElementsByClassName('enemy')
    while (oldEnemyDivs.length > 0) {
        oldEnemyDivs[0].parentNode.removeChild(oldEnemyDivs[0])
    }

    enemies = []

    // let rightOfLastEnemy = 0
    // for (let enemyIndex = 0; enemyIndex < 5; enemyIndex++) {
    //     const x = scrollOffset + i * enemySpacing + randomOffset;
    //     const endX = x + 200;
    //     const enemy = new Enemy(x, endX, enemyIndex++);

    //     // Ensure enemies do not move in parallel
    //     if (enemyIndex % 2 == 0) { 
    //         enemy.velocity.x = 2;
    //     }
        
    //     enemy.draw();
    //     enemies.push(enemy);
    // }

    
    enemies.push(
        // دشمن‌های متحرک بین سکوها و زمین
        new Enemy({x: 200, endX: 400, index: 0}),
        new Enemy({x: 750, endX: 950, index: 1}),
        new Enemy({x: 1300, endX: 1500, index: 2}),
        new Enemy({x: 1700, endX: 1900, index: 3}),
        new Enemy({x: 2600, endX: 2800, index: 4}),
        new Enemy({x: 3800, endX: 4050, index: 5}),
        new Enemy({x: 3850, endX: 4100, index: 6}),
    );
    
    enemies.forEach((enemy, index) => {
        if (index % 2 == 0) {
            enemy.velocity.x = 2
        } else {
            enemy.velocity.x = 1
        }
        enemy.draw()
    });
}

const animateEnemyMovement = () => {
    enemies.forEach((enemy, index) => {
        enemy.updatePosition()
        // Remove enemies that move off-screen
        
        // if (enemy.position.x < scrollOffset || enemy.position.x > scrollOffset + window.innerWidth) {
        //     document.body.removeChild(enemy.div)
        //     enemies.splice(index, 1)
        // }
    })

    requestAnimationFrame(animateEnemyMovement)
}

animateEnemyMovement()