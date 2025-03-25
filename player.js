const gravity = 0.5
import { playSound } from './sound.js';
import { coins } from './coin.js';
import { showGameOverMenu } from './menu.js';
import { platforms, groundTop } from './platform.js';
import { enemies } from './enemy.js';
import { collidedFromTop, collidedFromBottom, collidedFromLeft, collidedFromRight, collidedWithCoin } from './collisionCheck.js';
import { scrollBackground } from './Background/scrollBackground.js';
import { updateLivesCount, updateScoreCount, updateCoinsCount } from './scoreBoard.js';
import { resetGame } from './stateManager.js';

export let player
let leftScrollLimit = 0

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
        this.coins = 0
        this.distanceTravelled = 20
        this.score = 0
        this.jumpCount = 0
        this.maxJumps = 3
        this.isJumping = false;
        
        this.div = document.getElementById(`mainPlayer`)
    }
    
    draw() {
        this.div.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
    }
    
    updatePosition() {
        let onPlatform = false;
        const movementDirection = this.velocity.x >= 0 ? 'right' : 'left'
        const scrollDirection = movementDirection == 'right' ? 'left' : 'right' // Scroll the background in the opposite direction of the player

        platforms.forEach((platform) => {
            const platformTop = platform.position.y;
            const platformBottom = platform.position.y + platform.height;
            const platformLeft = platform.position.x;
            const platformRight = platform.position.x + platform.width;

            if (collidedFromTop(this, platform)) {  
                this.position.y = platformTop - this.height;  // Place player on top of platform
                this.velocity.y = 0;  // Stop falling
                onPlatform = true;
                if(!this.isJumping) {
                    this.jumpCount = 0;  // Reset the jump count
                }
                // Check if player hits the bottom of the platform
            } else if (collidedFromBottom(this, platform)) { // Reset the jump count
                // Check if player hits the bottom of the platform
                this.position.y = platformBottom; // Prevent passing through
                this.velocity.y = 2; // Give downward force after hitting
            } else if (collidedFromLeft(this, platform) && movementDirection == 'right') {
                this.velocity.x = 0; // Stop horizontal movement
             } else if (collidedFromRight(this, platform) && movementDirection == 'left') {
                this.velocity.x = 0; // Stop horizontal movement
            }
            
        });

        coins.forEach((coin) => {
            if (collidedWithCoin(this, coin) && coin.div.style.display !== 'none') {
                this.coins++;
                updateCoinsCount(this.coins);
                this.score += 100
                updateScoreCount(this.score)
                        
                coin.div.style.display = 'none';
                playSound('coin');
            }
        });

        
        if(!this.div.classList.contains("blinking")) {
            enemies.forEach((enemy) => {
                if(enemy.div.style.display !== 'none') {
                    if (collidedFromLeft(this, enemy) || collidedFromRight(this, enemy)) {
                        // console.log('collided with enemy')
                        playSound('marioOof');
                        this.decreseLive('enemy');
                    } else if (collidedFromTop(this, enemy)) {
                        playSound('yeahoo');
                        this.score += 200
                        updateScoreCount(this.score)
                        enemy.div.style.display = 'none';
                    }
                }  
            })
        }
        
        if (!onPlatform) {
            this.velocity.y += gravity;  // Apply gravity only when not on a platform
        } else {
            this.velocity.y = 0;  // Stop falling
        }
        
        if(movementDirection == 'right') {
            this.distanceTravelled += this.velocity.x; // Increase the distance travelled by the player if player is moving right
            this.score += this.velocity.x / 5
            updateScoreCount(this.score)


            if(this.position.x >= window.innerWidth / 2){ // Scroll the background and platforms instead of the player
                scrollBackground(Math.floor(this.velocity.x) / 2, scrollDirection) //Scroll the background at half the speed of the player to create a parallax effect
                platforms.forEach((platform) => {
                    platform.scrollPlatform(this.velocity.x, scrollDirection) // Scroll the platforms with the player speed to simulate the player moving
                })

                enemies.forEach((enemy) => {
                    enemy.scrollEnemy(this.velocity.x, scrollDirection) // Scroll the platforms with the player speed to simulate the player moving
                })
                
                coins.forEach((coin) => {
                    coin.scrollCoin(this.velocity.x)
                })
             
             } else {
                this.position.x += this.velocity.x;
            }

            if (this.position.x >= window.innerWidth) { //Limit the player from scrolling off the screen from the left
                leftScrollLimit += this.velocity.x
            }
        } else if(movementDirection == 'left' && this.position.x >= leftScrollLimit){
                this.distanceTravelled += this.velocity.x; // Decrease the distance travelled by the player if player is trying to move left and is allowed to move left
                this.score += this.velocity.x / 5
                updateScoreCount(this.score)
                
                this.position.x += this.velocity.x;
        } 
        
        this.position.y += this.velocity.y;
        
        // Check if player falls into a death pit
        if (this.position.y > groundTop) {
            playSound('falling')
            this.decreseLive('falling');
        }
                
        this.draw();
    }

    jump() {
         if (this.jumpCount < this.maxJumps) {
             this.jumpCount++;
             this.velocity.y = -10; 
             this.isJumping = true;
         }
     }

    decreseLive(cause) {
        this.remainingLives--;
        updateLivesCount(this.remainingLives);

        if (this.remainingLives > 0) {
            playSound('death');
            this.blinkElement();
            if(cause == 'enemy') {
                this.position = {
                    x: this.position.x,
                    y: groundTop - 200
                };
            } else {
                this.distanceTravelled -= 100
                // this.score -= 100 / 5
                // updateScoreCount(this.score)
                this.position = {
                    x: this.position.x - 100,
                    y: groundTop - 200
                };
            }
            
            this.velocity = {
                x: 0,
                y: 1
            };
        } else {
            playSound('gameOver');
            resetGame();
            // showInitialMenu();

            setTimeout(() => {
                showGameOverMenu('game-over', player.score);
            }, 100);
            return;
            // init(); // Restart the game
        }
    }

    blinkElement() {
        this.div.classList.add("blinking"); // add blinking class for animation

        setTimeout(() => {
            this.div.classList.remove("blinking"); // remove blinking class after 3 seconds
        }, 3000);
    }
}

export const initPlayer = () => {
    player = new Player()
    player.draw()
}