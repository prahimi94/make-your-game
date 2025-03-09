class Player {
    constructor(){
        this.position = {
            x: 20,
            y: 600
        }
        this.width = 50
        this.height = 50
        this.velocity = {
            x: 10,
            y: 10
        }
    }

    draw() {
        playerDiv.style.left = this.position.x + "px";
        playerDiv.style.top = this.position.y + "px";
        playerDiv.style.width = this.width + "px";
        playerDiv.style.height = this.height + "px";
    }

    updateYPosition() {
        this.position.y += this.velocity.y
        this.draw()
    }

    updateXPosition(direction) {
        if (direction == 'right'){
            this.position.x += this.velocity.x
        } else {
            this.position.x -= this.velocity.x
        }
        this.draw()
    }
}

const init = () => {
    const playerDiv = document.createElement('div')
    playerDiv.setAttribute("id", "mainPlayer")
    playerDiv.style.backgroundColor = "red"
    playerDiv.style.position = "absolute"; // Ensure the div is positioned
    document.body.appendChild(playerDiv)
    return playerDiv
}

const playerDiv = init()

const player = new Player()
player.draw()


const animiate = () => {
    
}

document.addEventListener("keydown", (event) => {
    const pressedKey = event.keyCode
    console.log(pressedKey);
    
    switch(pressedKey){
        case 38:
            console.log('up key pressed')
            break;
        case 87:
            console.log('up key pressed')
            break;
        case 39:
            player.updateXPosition('right')
            player.draw()
            console.log('right key pressed')
            break;
        case 68:
            player.updateXPosition('right')
            player.draw()
            console.log('right key pressed')
            break;
        case 37:
            player.updateXPosition('left')
            player.draw()
            console.log('left key pressed')
            break;
        case 65:
            player.updateXPosition('left')
            player.draw()
            console.log('left key pressed')
            break;
        case 40:
            console.log('down key pressed')
            break;
        case 83:
            console.log('down key pressed')
            break;

    }
});

requestAnimationFrame(animiate)
