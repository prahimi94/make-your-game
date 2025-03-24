import { playSound } from './sound.js';
import { showInitialMenu } from './menu.js';
import { stateManager } from './stateManager.js';
import { resetGame } from './stateManager.js'

import { player } from './player.js';
import { timer } from './scoreBoard.js';

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    },
}


export let scrollOffset = 0

export const initPlayerMovement = () => {
    keys.right.pressed = false
    keys.left.pressed = false
    keys.up.pressed = false
    scrollOffset = 0
}

document.addEventListener("keydown", (event) => {
    if (stateManager.getState() !== 'running') {
        return;
    }

    const pressedKey = event.code
    switch(pressedKey){
        case 'ArrowUp':
        case 'KeyW':
        case 'Space':
            keys.up.pressed = true
            player.jump()
            break;
        case 'ArrowRight':
        case 'KeyW':
            keys.right.pressed = true
            break;
        case 'ArrowLeft':
        case 'KeyA':
            keys.left.pressed = true
            break;

    }
});

document.addEventListener("keyup", (event) => {
    if (stateManager.getState() !== 'running') {
        return;
    }

    const pressedKey = event.code

    switch(pressedKey){
        case 'ArrowUp':
        case 'KeyW':
        case 'Space':
            keys.up.pressed = false
            player.isJumping = false
            break;
        case 'ArrowRight':
        case 'KeyW':
            keys.right.pressed = false
            break;
        case 'ArrowLeft':
        case 'KeyA':
            keys.left.pressed = false
            break;
    }
});

const removeBgClasses = () => {
    player.div.classList.forEach(className => {
        if (className.startsWith("bg-")) {
            player.div.classList.remove(className);
        }
    });
}

const animatePlayerMovement = () => {
    const velocity = 5; // Ensure this velocity is consistent with the platform velocity

    if (stateManager !== undefined && stateManager.getState() === 'running') {
        removeBgClasses();
        if (keys.right.pressed) {
            player.div.classList.add('bg-running-mario')
            player.velocity.x = velocity
            scrollOffset += velocity
        } else if (keys.left.pressed) {
            player.div.classList.add('bg-reverse-running-mario')
            player.velocity.x = -velocity
            scrollOffset -= velocity
        } else {
            player.velocity.x = 0
        }
    
        player.updatePosition()

        if (player.distanceTravelled == 5460) {
            playSound('win');
            resetGame();
            showInitialMenu();
            
            player.score += timer * 100
            setTimeout(() => {
                alert('You Win!, Your score is: ' + player.score);
            }, 100);
            // return;// Stop the loop
        }
    }

    requestAnimationFrame(animatePlayerMovement)
}

animatePlayerMovement()