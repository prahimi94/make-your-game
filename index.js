
import "./Background/scrollBackground.js";
import { initState, stateManager } from './stateManager.js';

import { initMenu, initPauseMenu } from "./menu.js";

import { initScoreBoard } from './scoreBoard.js';
import { initPlatforms } from './platform.js';
import { initEnemies } from './enemy.js';
import { initPlayer } from './player.js';

export const init = () => {
    stateManager.state = 'running'
    
    initScoreBoard()
    initPlatforms()
    initEnemies()
    initPlayer()
    // initPlayerMovement()
    // initPlayerMovement()
    // import('./scoreBoard.js').then(scoreBoardModule => {
    //     scoreBoardModule.initScoreBoard();
    // });
    // import('./platform.js').then(platformModule => {
    //     platformModule.initPlatforms();
    // });
    // import('./enemy.js').then(enemyModule => {
    //     enemyModule.initEnemies();
    // });
    // import('./player.js').then(playerModule => {
    //     playerModule.initEnemies();
    //     playerMovementModule.initPlayerMovement();
    // });
}

// init() 
initState()
initMenu()
initPauseMenu()
  
// function pad(val) {
//     var valString = val + "";
//     if (valString.length < 2) {
//       return "0" + valString;
//     } else {
//       return valString;
//     }
// }