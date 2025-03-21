import { init } from './index.js';
import { stateManager, initState } from './stateManager.js';

export const initMenu = () => {
    console.log('Menu script loaded')

    const menu = document.getElementById('menu');
    const initialMenu = document.getElementById('initial-menu');
    const pauseMenu = document.getElementById('pause-menu');
    menu.style.display = ''
    initialMenu.style.display = ''
    pauseMenu.style.display = 'none'
    document.addEventListener("keydown", (event) => {
        if (event.code == 'Enter') {
            if(stateManager.state === 'init') {
                menu.style.display = 'none';
                initialMenu.style.display = 'none';
                init()
            }
        }
    })
}

const showInitialMenu = () => {
    const menu = document.getElementById('menu');
    const initialMenu = document.getElementById('initial-menu');
    const pauseMenu = document.getElementById('pause-menu');
    menu.style.display = ''
    initialMenu.style.display = ''
    pauseMenu.style.display = 'none'
}

export const initPauseMenu = () => {
    document.addEventListener("keydown", (event) => {
        const menu = document.getElementById('menu');
        const initialMenu = document.getElementById('initial-menu');
        const pauseMenu = document.getElementById('pause-menu');
        const continueButton = document.getElementById('continue-button');
        const restartButton = document.getElementById('restart-button');
        const menuActiveButtonClass = 'menu-active-button'

        if (event.code == 'Escape') {
            if(stateManager.state === 'running') {
                stateManager.setState('pause')
            } else if(stateManager.state === 'pause') {
                stateManager.setState('running')
            }

            if (menu.style.display !== 'none') {
                initialMenu.style.display = 'none'
            }

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
        } else if ((event.code == 'ArrowUp' || event.code == 'ArrowDown') && stateManager.state === 'pause') {
            console.log('keyUp or keyDown pressed')
            if (continueButton.classList.contains(menuActiveButtonClass)) {
                continueButton.classList.remove(menuActiveButtonClass);
                restartButton.classList.add(menuActiveButtonClass);
            } else if (restartButton.classList.contains(menuActiveButtonClass)) {
                restartButton.classList.remove(menuActiveButtonClass);
                continueButton.classList.add(menuActiveButtonClass);
            }
        } else if (event.code == 'Enter' && stateManager.state === 'pause') {
            if (continueButton.classList.contains(menuActiveButtonClass)) {
                stateManager.setState('running')
                menu.style.display = 'none';
                pauseMenu.style.display = 'none';
            } else if(restartButton.classList.contains(menuActiveButtonClass)) {
                // stateManager.setState('start')
                menu.style.display = 'none';
                pauseMenu.style.display = 'none';
                //init()

                initState()
                showInitialMenu()
            }
        }

    })
}