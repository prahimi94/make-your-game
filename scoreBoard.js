import { playSound } from './sound.js';
import { showInitialMenu, showGameOverMenu } from './menu.js';
import { stateManager } from './stateManager.js';
import { resetGame } from './stateManager.js'
import { player } from './player.js';

export let timer = 60;
const scoreBoardLives = document.getElementById('lives');
const scoreBoardCoins = document.getElementById('coins');
const scoreBoardScore = document.getElementById('score');
const scoreBoardTimer = document.getElementById('timer');

export const initScoreBoard = () => {
    timer = 60
    scoreBoardTimer.innerHTML = timer;

    const oldPlatformDivs = document.getElementsByClassName('score-board')
    while (oldPlatformDivs.length > 0) {
        oldPlatformDivs[0].parentNode.removeChild(oldPlatformDivs[0])
    }

    updateLivesCount(3);
    updateCoinsCount(0);
    updateScoreCount(20);

    // todo: add timer
    requestAnimationFrame(updateTimer);
}

let lastTime = performance.now();

function updateTimer(currentTime) {
    if (stateManager !== undefined && stateManager.getState() === 'running') {
        if (currentTime - lastTime >= 1000) {
            lastTime = currentTime;
            timer--;
            scoreBoardTimer.innerHTML = timer;
    
            if (timer <= 0) {
                playSound('gameOver');
                resetGame()
                // showInitialMenu()

                setTimeout(() => {
                    showGameOverMenu('game-over', player.score);
                }, 100);
                // init();
                // return; // Stop the loop
            }
        }
    }

    requestAnimationFrame(updateTimer);
}


export const updateLivesCount = (livesCount) => { 
    scoreBoardLives.innerHTML = livesCount;
}

export const updateCoinsCount = (coinsCount) => { 
    scoreBoardCoins.innerHTML = coinsCount;
}

export const updateScoreCount = (ScoreCount) => { 
    scoreBoardScore.innerHTML = ScoreCount;
}