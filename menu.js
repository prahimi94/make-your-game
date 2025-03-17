import { init } from './index.js';
import { stateManager } from './stateManager.js';

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
            console.log('Enter pressed')
            if(stateManager.state === 'start') {
                menu.style.display = 'none';
                initialMenu.style.display = 'none';
                stateManager.state = 'start'
                init()
            }
        }
    })
}

export const initPauseMenu = () => {
    document.addEventListener("keydown", (event) => {
        const menu = document.getElementById('menu');
        const initialMenu = document.getElementById('initial-menu');
        const pauseMenu = document.getElementById('pause-menu');

        if (event.code == 'Escape') {
            console.log('Escape pressed')

            if(stateManager.state === 'start' || stateManager.state === 'resume') {
                stateManager.setState('pause')
            } else if(stateManager.state === 'pause') {
                stateManager.setState('resume')
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
            } else {
                pauseMenu.style.display = 'none'; // Set 'display: none'
            }
        }
    })
}