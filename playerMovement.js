import { init } from './index.js';
import { player } from './player.js';

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
    const pressedKey = event.keyCode
    // console.log("pressedKey");
    // console.log(pressedKey);
    
    switch(pressedKey){
        case 32:
        case 38:
        case 87:
            keys.up.pressed = true
            player.velocity.y -= 10
            break;
        case 39:
        case 68:
            keys.right.pressed = true
            // player.velocity.x = 1
            break;
        case 37:
        case 65:
            keys.left.pressed = true
            // player.velocity.x = -1
            break;

    }
});

document.addEventListener("keyup", (event) => {
    const pressedKey = event.keyCode

    switch(pressedKey){
        case 32:
        case 38:
        case 87:
            keys.up.pressed = false
            break;
        case 39:
        case 68:
            keys.right.pressed = false
            break;
        case 37:
        case 65:
            keys.left.pressed = false
            break;
    }
});

const animatePlayerMovement = () => {
    player.updatePosition()
    
    if (keys.right.pressed) {
        player.velocity.x = 5
        scrollOffset += 5
    } else if (keys.left.pressed) {
        player.velocity.x = -5
        scrollOffset -= 5
    } else {
        player.velocity.x = 0
    }

    requestAnimationFrame(animatePlayerMovement)

    if (scrollOffset == 5000) {
        alert('You Win!')
        init()
    }
}

animatePlayerMovement()