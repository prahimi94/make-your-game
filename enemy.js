import { groundTop } from './platform.js';
import { platformImageHeight } from './platform.js';
import { scrollOffset } from './playerMovement.js';

export let enemies = []
let enemyIndex = 0

class Enemy {
    constructor(x, endX, index){
        this.position = {
            y: groundTop - platformImageHeight,
            start: {
                x: x,
            },
            current: {
                x: x,
            },
            end: {
                x: endX,
            }
        }
        this.movementDirection = 'right'
        this.width = 50
        this.height = 50
        this.velocity = {
            x: 1
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
        this.div.style.left = this.position.current.x + "px";
        // this.div.style.top = window.innerHeight - 10 + "px";
        this.div.style.top = this.position.y + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
    }

    updatePosition() {
        if(this.movementDirection == 'right' && this.position.current.x >= this.position.start.x && this.position.current.x < this.position.end.x){
            this.position.current.x += this.velocity.x
        } else if(this.movementDirection == 'right' && this.position.current.x == this.position.end.x){
            this.movementDirection = 'left'
        } else if(this.movementDirection == 'left' && this.position.current.x > this.position.start.x){
            this.position.current.x -= this.velocity.x
        } else if (this.movementDirection == 'left' && this.position.current.x == this.position.start.x) {
            this.movementDirection = 'right'
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
    enemyIndex = 0
    setInterval(() => {
        // Check the number of visible enemies
        const visibleEnemies = enemies.filter(enemy => 
            enemy.position.current.x >= scrollOffset && enemy.position.current.x <= scrollOffset + window.innerWidth
        ).length

        // If the number of visible enemies is below the threshold, create new enemies
        if (visibleEnemies < 5) {
            const enemySpacing = window.innerWidth / 5; // Adjust the number of enemies per screen width
            for (let i = 0; i < 5 - visibleEnemies; i++) {
                const randomOffset = Math.round(Math.random()) * enemySpacing; // Add randomness to the enemy position
                const x = scrollOffset + i * enemySpacing + randomOffset;
                const endX = x + 200;
                const enemy = new Enemy(x, endX, enemyIndex++);
                enemy.draw();
                enemies.push(enemy);
            }
        }

        // Ensure enemies do not move in parallel
        enemies.forEach((enemy, index) => {
            if (index % 2 === 0) {
                enemy.velocity.x = 1;
            } else {
                enemy.velocity.x = 2;
            }
        });
    }, 2000)
}

const animateEnemyMovement = () => {
    enemies.forEach((enemy, index) => {
        enemy.updatePosition()
        // Remove enemies that move off-screen
        if (enemy.position.current.x < scrollOffset || enemy.position.current.x > scrollOffset + window.innerWidth) {
            document.body.removeChild(enemy.div)
            enemies.splice(index, 1)
        }
    })

    requestAnimationFrame(animateEnemyMovement)
}

animateEnemyMovement()