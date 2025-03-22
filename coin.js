import { platforms } from './platform.js';
const mainGame = document.getElementById('game-container')
export const coinImageWidth = 30
export const coinImageHeight = 30
export const groundTop = mainGame.offsetHeight  + mainGame.offsetTop  - coinImageHeight

class Coin {
    constructor({x, y, index, width = coinImageWidth, height = coinImageHeight, platform}) {
        this.position = {
            x,
            y
        }
        this.width = width
        this.height = height
        this.index = index
        this.platform = platform; // Reference to the platform the coin belongs to
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
        this.div.style.backgroundImage = `url(image/BrxG.gif)`; // Update with your coin image
        this.div.style.backgroundSize = 'contain';
        this.div.style.backgroundRepeat = 'round';
    }


     scrollCoin(velocity) {
        // Coins should move along with the platform's X position
        this.position.x -= velocity;  // Move the coin in sync with the platform's X movement
        this.div.style.left = this.position.x + "px"
}
}
 

export let coins = [];

export const initCoins = () => {
    coins = [];

    const oldcoinDivs = document.getElementsByClassName('coin');
    while (oldcoinDivs.length > 0) {
        oldcoinDivs[0].parentNode.removeChild(oldcoinDivs[0]);
    }

    let  rightOfLastCoin = 0;
    const platformHeightAboveGround = 30;

    platforms.forEach((platform, platformIndex) => {
        const numCoins = Math.floor(platform.width / (30 + 20));  // Coin spacing logic
        let lastCoinX = platform.position.x;

        for (let i = 0; i < numCoins; i++) {
            const randomGap = Math.random() * 50 + 50;  // Random horizontal gap
            lastCoinX += randomGap;

            if (lastCoinX > platform.position.x + platform.width) break;

            coins.push(new Coin({
                x: lastCoinX,
                y: platform.position.y - platformHeightAboveGround,
                index: coins.length,
                platform: platform // Reference the platform for each coin
            }));
        }
    });

    coins.forEach((coin) => {
        coin.draw();
    });
};


export const collectCoin = (coin) => {
    // Play sound (if you have a sound file)
    //coin.div.classList.add('coin-collected-animation');
// setTimeout(() => {
        coin.div.remove(); // Remove the coin's DOM element
    // }, 500); // Delay for animation or sound effect
    const coinIndex = coins.indexOf(Coin);
    if (coinIndex > -1) {
        coins.splice(coinIndex, 1); // Remove the coin from the coins array
    }

    player.score += 10; // Add points to the player's score or update the game state
    console.log('Coin collected!');
};

// Update the coins position (scroll with platform)

