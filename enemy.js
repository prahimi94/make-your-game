import { stateManager } from './stateManager.js';
import { groundTop } from './platform.js';
import { platformImageHeight } from './platform.js';

export let enemies = []

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
        this.div = document.getElementById(`enemy${index}`)
    }

    draw() {
        this.div.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
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
    const oldEnemyDivs = document.getElementsByClassName('enemy');
    for (let i = 0; i < oldEnemyDivs.length; i++) {
        let enemy = oldEnemyDivs[i];
        if (window.getComputedStyle(enemy).display === "none") {
            enemy.style.display = "block";
        }
    }

    enemies = []
    
    enemies.push(
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
    if (stateManager !== undefined && stateManager.getState() === 'running') {
        enemies.forEach((enemy, index) => {
            enemy.updatePosition()
        })
    }

    requestAnimationFrame(animateEnemyMovement)
}

animateEnemyMovement()