import { groundTop, platforms, platformImageHeight } from './platform.js';

const mainGame = document.getElementById('game-container')
export const coinImageWidth = 30
export const coinImageHeight = 30
// export const groundTop = mainGame.offsetHeight  + mainGame.offsetTop  - coinImageHeight

class Coin {
    constructor({x, y, index, platform}) {
        this.position = {
            x,
            y
        }
        this.width = coinImageWidth
        this.height = coinImageHeight
        this.index = index
        this.platform = platform; // Reference to the platform the coin belongs to
        // this.div = document.createElement('div')
        // this.div.setAttribute("id", `coin${index}`)
        // this.div.setAttribute("class", `coin`)

        this.div = document.getElementById(`coin${index}`)
        // this.div.style.position = "absolute"; 
        // document.body.appendChild(this.div)
    }

    draw() {
        // this.div.style.left = this.position.x + "px";
        // this.div.style.top = this.position.y + "px";
        this.div.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
        // this.div.style.backgroundImage = `url(image/BrxG.gif)`; // Update with your coin image
        // this.div.style.backgroundSize = 'contain';
        // this.div.style.backgroundRepeat = 'round';
    }


    scrollCoin(velocity) {
        // Coins should move along with the platform's X position
        this.position.x -= velocity;  // Move the coin in sync with the platform's X movement
        // this.div.style.left = this.position.x + "px"
        this.div.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
    }
}
 

export let coins = [];

export const initCoins = () => {
    coins = [];

    const oldcoinDivs = document.getElementsByClassName('coin');
    for (let i = 0; i < oldcoinDivs.length; i++) {
        let coin = oldcoinDivs[i];
        if (window.getComputedStyle(coin).display === "none") {
            coin.style.display = "block";
        }
    }
    
    // const platformHeightAboveGround = 30;
    // platforms.forEach((platform, platformIndex) => {
    //     const numCoins = Math.floor(platform.width / (30 + 20));  // Coin spacing logic
    //     let lastCoinX = platform.position.x;

    //     for (let i = 0; i < numCoins; i++) {
    //         const randomGap = Math.random() * 50 + 50;  // Random horizontal gap
    //         lastCoinX += randomGap;

    //         if (lastCoinX > platform.position.x + platform.width) break;

    //         coins.push(new Coin({
    //             x: lastCoinX,
    //             y: platform.position.y - platformHeightAboveGround,
    //             index: coins.length,
    //             platform: platform // Reference the platform for each coin
    //         }));
    //     }
    // });


    coins.push(
        new Coin({x: 140, y: groundTop - 160, index: 0}),
        new Coin({x: 400, y: groundTop - platformImageHeight, index: 1}),
        new Coin({x: 685, y: groundTop - 130, index: 2}),
        new Coin({x: 980, y: groundTop - platformImageHeight, index: 3}),
        new Coin({x: 1235, y: groundTop - 160, index: 4}),
        new Coin({x: 1430, y: groundTop - platformImageHeight, index: 5}),
        new Coin({x: 1480, y: groundTop - 290, index: 6}),
        new Coin({x: 1800, y: groundTop - platformImageHeight, index: 7}),
        new Coin({x: 2415, y: groundTop - platformImageHeight, index: 8}),
        new Coin({x: 2600, y: groundTop - 350, index: 9}),
        new Coin({x: 3010, y: groundTop - platformImageHeight - 50, index: 10}),
        new Coin({x: 3060, y: groundTop - (platformImageHeight * 2) - 50, index: 11}),
        new Coin({x: 3110, y: groundTop - (platformImageHeight * 3) - 50, index: 12}),
        new Coin({x: 3160, y: groundTop - (platformImageHeight * 4) - 50, index: 13}),
        new Coin({x: 3210, y: groundTop - platformImageHeight, index: 14}),
        new Coin({x: 3260, y: groundTop - platformImageHeight, index: 15}),
        new Coin({x: 3900, y: groundTop - platformImageHeight, index: 16}),
        new Coin({x: 3950, y: groundTop - platformImageHeight, index: 17}),
    );

    // console.log('Coins initialized');
    // console.log(coins);
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
    // console.log('Coin collected!');
};

// Update the coins position (scroll with platform)

