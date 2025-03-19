import { initScoreBoard } from './scoreBoard.js';
import { initPlatforms } from './platform.js';
import { initCoins } from './coin.js';
import { initEnemies } from './enemy.js';
import { initPlayer } from './player.js';
// import { initPlayerMovement } from './playerMovement.js';

export const init = () => { 
    initScoreBoard()
    initPlatforms()
    initCoins()
    initEnemies()
    initPlayer()

    // initPlayerMovement()
    import('./playerMovement.js').then(playerMovementModule => {
        playerMovementModule.initPlayerMovement();
    });
}

init()
