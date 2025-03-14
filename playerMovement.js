import { init } from './index.js';
import { player } from './player.js';
import { platforms } from './platform.js';

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
    const pressedKey = event.code
    // console.log("pressedKey");
    // console.log(pressedKey);
    
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
            // player.velocity.x = 1
            break;
        case 'ArrowLeft':
        case 'KeyA':
            keys.left.pressed = true
            // player.velocity.x = -1
            break;

    }
});

document.addEventListener("keyup", (event) => {
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

const animatePlayerMovement = () => {
    
    if (keys.right.pressed) {
        player.div.style.backgroundImage = `url(image/runnig-mario.gif)`
        player.velocity.x = 5
        scrollOffset += 5
    } else if (keys.left.pressed) {
        player.div.style.backgroundImage = `url(image/reverse-runnig-mario.gif)`
        player.velocity.x = -5
        scrollOffset -= 5
    } else {
        player.div.style.backgroundImage = `url(image/fixed-mario.png)`
        player.velocity.x = 0
    }

    player.updatePosition()

    requestAnimationFrame(animatePlayerMovement)

    if (scrollOffset == 5000) {
        alert('You Win!')
        init()
    }
}

animatePlayerMovement()