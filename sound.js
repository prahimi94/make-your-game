const sounds = {
    coin: new Audio('sounds/coin.mp3'),
    jump: new Audio('sounds/jump.mp3'),
    falling: new Audio('sounds/falling.mp3'),
    death: new Audio('sounds/death.mp3'),
    background: new Audio('sounds/background.mp3'),
    yeahoo: new Audio('sounds/yeahoo.mp3'),
    marioOof: new Audio('sounds/mario_oof.mp3'),
    gameOver: new Audio('sounds/game-over.mp3'),
    win: new Audio('sounds/win.mp3')
};

let isPlaying = true;
sounds.background.loop = true;
sounds.background.volume = 0.5;

document.addEventListener("keydown", (event) => {
    if (event.code == 'KeyM') {
        toggleSound();
    }
})

export function playSound(sound) {
    if (sounds[sound] && isPlaying) {
        sounds[sound].currentTime = 0;
        sounds[sound].play();
    }
}

export function initSounds() {
    sounds.background.play();
    playSound('background');
}

export function toggleSound() {
    for (let key in sounds) {
        if (isPlaying) {
            sounds[key].pause();
        } else {
            sounds.background.play();
        }
    }
    
    isPlaying = !isPlaying;
}