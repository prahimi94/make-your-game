import { groundTop, platformImageHeight } from './platform.js';

export const coinImageWidth = 30
export const coinImageHeight = 30

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

        this.div = document.getElementById(`coin${index}`)
    }

    draw() {
        this.div.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
    }


    scrollCoin(velocity) {
        this.position.x -= velocity;  // Move the coin in sync with the platform's X movement
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

    coins.forEach((coin) => {
        coin.draw();
    });
};


export const collectCoin = (coin) => {
    coin.div.remove(); // Remove the coin's DOM element
    const coinIndex = coins.indexOf(Coin);
    if (coinIndex > -1) {
        coins.splice(coinIndex, 1); // Remove the coin from the coins array
    }

    player.score += 10; // Add points to the player's score or update the game state
};
