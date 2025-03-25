
import "./Background/scrollBackground.js";
import {  initState, runGame } from './stateManager.js';
import { initSounds } from './sound.js';

import { initMenu } from "./menu.js";

import { initScoreBoard } from './scoreBoard.js';
import { initPlatforms } from './platform.js';
import { initCoins } from './coin.js';
import { initEnemies } from './enemy.js';
import { initPlayer } from './player.js';
import { initPlayerMovement } from './playerMovement.js';

export const init = () => {
    runGame()
    
    initSounds()
    initScoreBoard()
    initPlatforms()
    initCoins()
    initEnemies()
    initPlayer()
    initPlayerMovement()
}

initState()
initMenu()
