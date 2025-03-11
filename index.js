import { initEnemies } from './enemy.js';
import { initPlayer } from './player.js';
// import { initPlayerMovement } from './playerMovement.js';


export const init = () => { 
    initEnemies()
    initPlayer()
    // initPlayerMovement()
    import('./playerMovement.js').then(playerMovementModule => {
        playerMovementModule.initPlayerMovement();
    });
}

init()