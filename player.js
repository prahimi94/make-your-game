const gravity = 0.5
import { platforms, groundTop } from './platform.js';
import { init } from './index.js';
import { enemies } from './enemy.js';
import { collitedFromTop, collitedFromBottom, collitedFromLeft, collitedFromRight } from './collisionCheck.js';

export let player

class Player {
    constructor(){
        this.position = {
            x: 20,
            y: 20
        }
        this.width = 40
        this.height = 60
        this.velocity = {
            x: 0,
            y: 1
        }
        this.remainingLives = 3
        
        this.div = document.createElement('div')
        this.div.setAttribute("id", "mainPlayer")
        // this.div.style.backgroundColor = "red"
        // div.playerDiv.backgroundImage = `url(${mario})`;
        // this.div.style.backgroundImage = `url(image/mario.jpg)`
        // this.div.style.backgroundImage = `url(image/mario-49314.png)`
        // this.div.style.backgroundImage = `url(image/mario.png)`
        this.div.style.backgroundImage = `url(image/runnig-mario.gif)`
        this.div.style.backgroundSize = 'cover';
        this.div.style.position = "absolute"; // Ensure the div is positioned
        document.body.appendChild(this.div)
    }
    
    draw() {
        this.div.style.left = this.position.x + "px";
        this.div.style.top = this.position.y + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
    }
    
    updatePosition() {
        let onPlatform = false;

        platforms.forEach((platform) => {
            const platformTop = platform.position.y;
            const platformBottom = platform.position.y + platform.height;
            const platformLeft = platform.position.x;
            const platformRight = platform.position.x + platform.width;

            if (collitedFromTop(this, platform)) {  
                this.position.y = platformTop - this.height;  // Place player on top of platform
                this.velocity.y = 0;  // Stop falling
                onPlatform = true;
                this.isJumping = false;  // Reset the jump flag
                this.jumpCount = 0;  // Reset the jump count
                // Check if player hits the bottom of the platform
            } else if (collitedFromBottom(this, platform)) { // Reset the jump count
                // Check if player hits the bottom of the platform
                this.position.y = platformBottom; // Prevent passing through
                this.velocity.y = 2; // Give downward force after hitting
            } else if (collitedFromLeft(this, platform)) {
                this.position.x = platformLeft - this.width; // Place player to the left of the platform
                this.velocity.x = 0; // Stop horizontal movement
             } else if (collitedFromRight(this, platform)) {
                this.position.x = platformRight; // Place player to the right of the platform
                this.velocity.x = 0; // Stop horizontal movement
            }
            
        });
        
        enemies.forEach((enemy) => {
            // const enemyTop = enemy.position.y;
            // const enemyBottom = enemy.position.y + enemy.height;
            // const enemyLeft = enemy.position.x;
            // const enemyRight = enemy.position.x + enemy.width;

            // if (collitedFromTop(this, enemy)) {  
            //     this.position.y = platformTop - this.height;  // Place player on top of platform
            //     this.velocity.y = 0;  // Stop falling
            //     onPlatform = true;
            //     this.isJumping = false;  // Reset the jump flag
            //     this.jumpCount = 0;  // Reset the jump count
            //     // Check if player hits the bottom of the platform
            // } else if (collitedFromBottom(this, platform)) { // Reset the jump count
            //     // Check if player hits the bottom of the platform
            //     this.position.y = platformBottom; // Prevent passing through
            //     this.velocity.y = 2; // Give downward force after hitting
            // } else
             if (collitedFromLeft(this, enemy) || collitedFromRight(this, enemy)) {
                this.decreseLive();
            }
        })
        
        if (!onPlatform) {
            this.velocity.y += gravity;  // Apply gravity only when not on a platform
        } else {
            this.velocity.y = 0;  // Stop falling
        }
        
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        
        // Check if player falls into a death pit
        if (this.position.y > groundTop) {
            this.decreseLive();
        }
        
        this.draw();
    }

    decreseLive() {
        this.remainingLives--;
        console.log('Remaining lives: ', this.remainingLives);
        if (this.remainingLives > 0) {
            // Reset player position
            this.position = {
                x: this.position.x - 200,
                y: groundTop - 100
            };
            this.velocity = {
                x: 0,
                y: 1
            };
        } else {
            alert('Game Over');
            init(); // Restart the game
        }
    }

//    jump() {
//         if (this.jumpCount < this.maxJumps) {
//             this.velocity.y = -10; 
//             this.isJumping = true;
//         }
//     }
}

export const initPlayer = () => {
    const oldPlayerDiv = document.getElementById('mainPlayer')
    if(oldPlayerDiv){
        document.body.removeChild(oldPlayerDiv)
    }
    
    player = new Player()
    player.draw()
}