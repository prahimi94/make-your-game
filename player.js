const gravity = 0.5
import { platforms, groundTop, platformImageHeight } from './platform.js';
import { init } from './index.js';
// import { enemies } from './enemy.js';
// import { collisionChecker } from './collisionCheck.js';

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
            if (platform.type === 'ground') { 
                if (this.position.x + this.width > platform.position.x &&   // Player's right side is within platform's left side
                    this.position.x < platform.position.x + platform.width &&   // Player's left side is within platform's right side
                    this.position.y + this.height <= platform.position.y &&   // Player's bottom is above platform
                    this.position.y + this.height + this.velocity.y >= platform.position.y  // Player will land on platform
                ){  
                    console.log('collision detected');
                    this.position.y = platform.position.y - this.height;  // Place player on top of platform
                    this.velocity.y = 0;  // Stop falling
                    onPlatform = true;
                    this.isJumping = false;  // Reset the jump flag
                    this.jumpCount = 0;  // Reset the jump count
                    // Check if player hits the bottom of the platform
                }
            } else if (platform.type === 'platform') {
                if (this.position.x + this.width > platform.position.x &&   // Player's right side is within platform's left side
                    this.position.x < platform.position.x + platform.width &&   // Player's left side is within platform's right side
                    this.position.y + this.height <= platform.position.y &&   // Player's bottom is above platform
                    this.position.y + this.height + this.velocity.y >= platform.position.y  // Player will land on platform
                ){  
                    console.log('collision detected');
                    this.position.y = platform.position.y - this.height;  // Place player on top of platform
                    this.velocity.y = 0;  // Stop falling
                    onPlatform = true;
                    this.isJumping = false;  // Reset the jump flag
                    this.jumpCount = 0;  // Reset the jump count
                    // Check if player hits the bottom of the platform
                }

                if ( 
                    this.position.y <= platform.position.y + platformImageHeight &&
                    this.position.y - this.velocity.y > platform.position.y + platformImageHeight && // Player was below last frame
                    this.position.x + this.width > platform.position.x && // Within platform X range
                    this.position.x < platform.position.x + platform.width &&
                    this.velocity.y < 0 // Only detect if moving upward
                ) {
                    this.position.y = platform.position.y + platformImageHeight; // Prevent passing through
                    this.velocity.y = 2; // Give downward force after hitting
                }
            } else if (platform.type === 'pipe') {
                if ( 
                    this.position.y <= platform.position.y + platformImageHeight &&
                    this.position.y - this.velocity.y > platform.position.y + platformImageHeight && // Player was below last frame
                    this.position.x + this.width > platform.position.x && // Within platform X range
                    this.position.x < platform.position.x + platform.width &&
                    this.velocity.y < 0 // Only detect if moving upward
                ) {
                    this.position.y = platform.position.y + platformImageHeight; // Prevent passing through
                    this.velocity.y = 2; // Give downward force after hitting
                }

                if (
                    this.position.x + this.width > platform.position.x && // Player's right side is within platform's left side
                    this.position.x < platform.position.x + platform.width && // Player's left side is within platform's right side
                    this.position.y + this.height > platform.position.y && // Player's bottom is below platform's top
                    this.position.y < platform.position.y + platform.height // Player's top is above platform's bottom
                ) {
                    this.position.x = platform.position.x + platform.width; // Place player to the right of the platform
                    this.velocity.x = 0; // Stop horizontal movement
                } else if (
                    this.position.x < platform.position.x + platform.width && // Player's left side is within platform's right side
                    this.position.x + this.width > platform.position.x && // Player's right side is within platform's left side
                    this.position.x + this.width + this.velocity.x >= platform.position.x && // Player will hit the left side of the platform
                    this.position.y + this.height > platform.position.y && // Player's bottom is below platform's top
                    this.position.y < platform.position.y + platform.height // Player's top is above platform's bottom
                ) {
                    this.position.x = platform.position.x - this.width; // Place player to the left of the platform
                    this.velocity.x = 0; // Stop horizontal movement
                } else if (
                    this.position.x < platform.position.x + platform.width && // Player's left side is within platform's right side
                    this.position.x + this.velocity.x <= platform.position.x + platform.width && // Player will hit the right side of the platform
                    this.position.y + this.height > platform.position.y && // Player's bottom is below platform's top
                    this.position.y < platform.position.y + platform.height // Player's top is above platform's bottom
                ) {
                    this.position.x = platform.position.x + platform.width; // Place player to the right of the platform
                    this.velocity.x = 0; // Stop horizontal movement
                }
            }
        });
        
        // enemies.forEach((enemy) => {
        //     if (
        //         collisionChecker(this, enemy, false)
        //     ) {  
        //         console.log('collision with enemy detected');
        //     }
        // })
        
        if (!onPlatform) {
            this.velocity.y += gravity;  // Apply gravity only when not on a platform
        } else {
            this.velocity.y = 0;  // Stop falling
        }
        
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        
        // Check if player falls into a death pit
        // if (this.position.y > groundTop) {
        //     console.log('Player fell into a pit');
        //     console.log("this.position.y")
        //     console.log(this.position.y)
        //     console.log("groundTop")
        //     console.log(groundTop)
        //     console.log("this.height")
        //     console.log(this.height)
        //     this.remainingLives -= 1;
        //     if (this.remainingLives > 0) {
        //         // Reset player position
        //         this.position = {
        //             x: 20,
        //             y: groundTop - 100
        //         };
        //         this.velocity = {
        //             x: 0,
        //             y: 1
        //         };
        //     } else {
        //         alert('Game Over');
        //         init(); // Restart the game
        //     }
        // }
        
        this.draw();
    }

   jump() {
        if (this.jumpCount < this.maxJumps) {
            this.velocity.y = -10; 
            this.isJumping = true;
        }
    }
}

export const initPlayer = () => {
    const oldPlayerDiv = document.getElementById('mainPlayer')
    if(oldPlayerDiv){
        document.body.removeChild(oldPlayerDiv)
    }
    
    player = new Player()
    player.draw()
}