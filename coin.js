import { platforms } from './platform.js';
export const coinImageWidth = 30
export const coinImageHeight = 30
export const groundTop = mainGame.offsetHeight  + mainGame.offsetTop  - coinImageHeight

class Coin {
    constructor({x, y, index, width = coinImageWidth, height = coinImageHeight}){
        this.position = {
            x,
            y
        }
       
        this.width = width
        this.height = height
        this.index = index
        this.div = document.createElement('div')
        this.div.setAttribute("id", `coin${index}`)
        this.div.setAttribute("class", `coin`)
        this.div.style.position = "absolute"; 
        document.body.appendChild(this.div)
    }
    
    draw() {
        this.div.style.left = this.position.x + "px";
        this.div.style.top = this.position.y + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.backgroundImage = `url(image/BrxG.png)`;
        this.div.style.backgroundSize = 'contain';
        this.div.style.backgroundRepeat = 'round';
       
        }
    

    scrollcoin(velocity, scrollDirection = 'left') {
        if(scrollDirection == 'left'){
            this.position.x -= velocity
        } else { 
            this.position.x += velocity
        }
        this.div.style.left = this.position.x + "px"
    }
}


export let coins = [];

export const initcoins = () => {
    coins = []

    const oldcoinDivs = document.getElementsByClassName('coin')
    while (oldcoinDivs.length > 0) {
        oldcoinDivs[0].parentNode.removeChild(oldcoinDivs[0])
    }


    coins = []; // Reset coins array

    let rightOfLastcoin = 0;  // Starting position for the first coin
    const platformHeightAboveGround = 30; // Fixed vertical offset for coins above platform

    // Loop through the platforms and add coins
    platforms.forEach((platform, platformIndex) => {
        // Determine how many coins should fit on the current platform
        const numCoins = Math.floor(platform.width / (coinImageWidth + 20)); // 20px is the minimum padding between coins

        // Randomize coin placements across the platform width
        let lastCoinX = platform.position.x;

        // Add coins with random spacing within the platform width
        for (let i = 0; i < numCoins; i++) {
            // Random horizontal gap between 50px and 100px from the last coin
            const randomGap = Math.random() * 50 + 50; // Range from 50px to 100px gap
            lastCoinX += randomGap;

            // If the coin would be placed beyond the platform's width, stop placing coins
            if (lastCoinX > platform.position.x + platform.width) break;

            // Create coin and place it above the platform
            coins.push(new Coin({
                x: lastCoinX,
                y: platform.position.y - platformHeightAboveGround, // Position coin above the platform
                index: coins.length,
            }));
        }
    });

 
    coins.forEach((coin) => {
        coin.draw();
    });
}