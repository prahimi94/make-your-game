import { initScoreBoard } from './scoreBoard.js';
import { initPlatforms } from './platform.js';
import { initEnemies } from './enemy.js';
import { initPlayer } from './player.js';
// import { initPlayerMovement } from './playerMovement.js';

export const init = () => { 
    initScoreBoard()
    initPlatforms()
    initEnemies()
    initPlayer()
    // initPlayerMovement()
    import('./playerMovement.js').then(playerMovementModule => {
        playerMovementModule.initPlayerMovement();
    });
}

init()
  
// function pad(val) {
//     var valString = val + "";
//     if (valString.length < 2) {
//       return "0" + valString;
//     } else {
//       return valString;
//     }
// }