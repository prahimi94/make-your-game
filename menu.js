import { init } from './index.js';
import { pauseGame, resetGame, runGame, stateManager } from './stateManager.js';

export const showInitialMenu = () => {
    const menu = document.getElementById('menu');
    const initialMenu = document.getElementById('initial-menu');
    const pauseMenu = document.getElementById('pause-menu');
    menu.style.display = ''
    initialMenu.style.display = ''
    pauseMenu.style.display = 'none'
}

export const showGameOverMenu = (type, score) => {
    const menu = document.getElementById('menu');
    const initialMenu = document.getElementById('initial-menu');
    const pauseMenu = document.getElementById('pause-menu');
    const continueButton = document.getElementById('continue-button');
    const restartButton = document.getElementById('restart-button');
    const gameOverDiv = document.getElementById('game-over');
    const menuActiveButtonClass = 'menu-active-button'

    menu.style.display = ''
    initialMenu.style.display = 'none'
    pauseMenu.style.display = ''

    continueButton.style.display = 'none'
    gameOverDiv.style.display = ''

    let menuText = ''
    if (type == 'win'){
        menuText = 'You Win!'
    } else {
        menuText = 'Game Over!'
    }
    restartButton.classList.add(menuActiveButtonClass);

    menuText += '<br>' + 'Score: ' + score + '<br>' + 'Press Enter to restart'
    document.getElementById('game-over').innerHTML = menuText
}

export const initMenu = () => {
    const menu = document.getElementById('menu');
    const initialMenu = document.getElementById('initial-menu');
    const pauseMenu = document.getElementById('pause-menu');
    menu.style.display = ''
    initialMenu.style.display = ''
    pauseMenu.style.display = 'none'

    document.addEventListener("keydown", (event) => {
        const menu = document.getElementById('menu');
        const initialMenu = document.getElementById('initial-menu');
        const pauseMenu = document.getElementById('pause-menu');
        const continueButton = document.getElementById('continue-button');
        const restartButton = document.getElementById('restart-button');
        const gameOverDiv = document.getElementById('game-over');
        const menuActiveButtonClass = 'menu-active-button'

        if (event.code == 'Escape') {
            if(stateManager.getState() === 'running') {
                pauseGame()
            } else if(stateManager.getState() === 'pause') {
                runGame()
            }

            if (menu.style.display !== 'none') {
                initialMenu.style.display = 'none'
            }

            continueButton.style.display = ''
            gameOverDiv.style.display = 'none'

            // Toggle the display of 'menu'
            if (menu.style.display === 'none') {
                menu.style.display = ''; // Remove 'display: none'
            } else {
                menu.style.display = 'none'; // Set 'display: none'
            }

            // Toggle the display of 'pause-menu'
            if (pauseMenu.style.display === 'none') {
                pauseMenu.style.display = ''; // Remove 'display: none'

                if (restartButton.classList.contains(menuActiveButtonClass)) {
                    restartButton.classList.remove(menuActiveButtonClass);
                    continueButton.classList.add(menuActiveButtonClass);
                }
            } else {
                pauseMenu.style.display = 'none'; // Set 'display: none'
            }
        } else if ((event.code == 'ArrowUp' || event.code == 'ArrowDown') && stateManager.getState() === 'pause') {
            if (continueButton.classList.contains(menuActiveButtonClass)) {
                continueButton.classList.remove(menuActiveButtonClass);
                restartButton.classList.add(menuActiveButtonClass);
            } else if (restartButton.classList.contains(menuActiveButtonClass)) {
                restartButton.classList.remove(menuActiveButtonClass);
                continueButton.classList.add(menuActiveButtonClass);
            }
        } else if (event.code == 'Enter') {
            if(stateManager.getState() === 'pause') {
                if (continueButton.classList.contains(menuActiveButtonClass)) {
                    runGame()
                    menu.style.display = 'none';
                    pauseMenu.style.display = 'none';
                } else if(restartButton.classList.contains(menuActiveButtonClass)) {
                    menu.style.display = 'none';
                    pauseMenu.style.display = 'none';
    
                    resetGame()
                    showInitialMenu()
                    return
                }
            } else if (stateManager.getState() === 'init') {
                menu.style.display = 'none';
                initialMenu.style.display = 'none';
                init()
            }
        } 
    })
}
