import {init} from './index.js'

console.log('Score board loaded')
export let timer = 20;
const scoreBoardLives = document.getElementById('lives');
const scoreBoardCoins = document.getElementById('coins');
const scoreBoardScore = document.getElementById('score');
const scoreBoardTimer = document.getElementById('timer');

export const initScoreBoard = () => {
    timer = 20
    scoreBoardTimer.innerHTML = timer;

    const oldPlatformDivs = document.getElementsByClassName('platform')
    while (oldPlatformDivs.length > 0) {
        oldPlatformDivs[0].parentNode.removeChild(oldPlatformDivs[0])
    }

    updateLivesCount(3);
    updateCoinsCount(0);
    updateScoreCount(20);

    setInterval(()=>{
        timer--;
        console.log("timer: ", timer)
        scoreBoardTimer.innerHTML = timer;

        if(timer <= 0) {
            alert('You Lose!')
            init()
        }
    }, 1000);

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

export const updateTimer = (timer) => { 
    scoreBoardTimer.innerHTML = timer;
}