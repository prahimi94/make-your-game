const gravity = 0.5
import { platforms } from './platform.js';

export let player

class Player {
    constructor(){
        this.position = {
            x: 20,
            y: 20
        }
        this.width = 100
        this.height = 100
        this.velocity = {
            x: 0,
            y: 1
        }
        
        this.div = document.createElement('div')
        this.div.setAttribute("id", "mainPlayer")
        // this.div.style.backgroundColor = "red"
        // div.playerDiv.backgroundImage = `url(${mario})`;
        // this.div.style.backgroundImage = `url(image/mario.jpg)`
        // this.div.style.backgroundImage = `url(image/mario-49314.png)`
        this.div.style.backgroundImage = `url(image/runnig-mario.gif)`
        this.div.style.backgroundSize = 'cover'
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
            if (
                this.position.x + this.width > platform.position.x &&   // Player's right side is within platform's left side
                this.position.x < platform.position.x + platform.width &&   // Player's left side is within platform's right side
                this.position.y + this.height <= platform.position.y &&   // Player's bottom is above platform
                this.position.y + this.height + this.velocity.y >= platform.position.y  // Player will land on platform
            ) {  
                console.log('collision detected');
                this.position.y = platform.position.y - this.height;  // Place player on top of platform
                this.velocity.y = 0;  // Stop falling
                onPlatform = true;
            }
        });
    
        if (!onPlatform) {
            this.velocity.y += gravity;  // Apply gravity only when not on a platform
        } else {
            this.velocity.y = 0;  // Stop falling
        }
    
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.draw();
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