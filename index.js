// import mario from './mario.png'
const gravity = 0.5

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

let scrollOffset = 0
let enemies = []
let enemyIndex = 0
let player
 
class Player {
    constructor(){
        this.position = {
            x: 20,
            y: 20
        }
        this.width = 50
        this.height = 50
        this.velocity = {
            x: 0,
            y: 1
        }
        
        this.div = document.createElement('div')
        this.div.setAttribute("id", "mainPlayer")
        // this.div.style.backgroundColor = "red"
        // div.playerDiv.backgroundImage = `url(${mario})`;
        this.div.style.backgroundImage = `url(./mario.jpg)`
        this.div.style.backgroundSize = 'cover'
        this.div.style.position = "absolute"; // Ensure the div is positioned
        document.body.appendChild(this.div)
    }

    draw() {
        this.div.style.left = this.position.x + "px";
        this.div.style.top = this.position.y + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
    }

    updatePosition() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if(this.position.y + this.height + this.velocity.y <= window.innerHeight){
            this.velocity.y += gravity
        } else{ 
            this.velocity.y = 0
        }
        this.draw()
    }
}

class Enemy {
    constructor(x, endX, index){
        this.position = {
            start: {
                x: x,
            },
            current: {
                x: x,
            },
            end: {
                x: endX,
            }
        }
        this.movementDirection = 'right'
        this.width = 20
        this.height = 20
        this.velocity = {
            x: 1
        }

        this.index = index
        this.div = document.createElement('div')
        this.div.setAttribute("id", `enemy${index}`)
        this.div.setAttribute("class", `enemy`)
        this.div.style.backgroundColor = "red"
        this.div.style.position = "absolute"; // Ensure the div is positioned
        document.body.appendChild(this.div)
    }

    draw() {
        this.div.style.left = this.position.current.x + "px";
        this.div.style.top = window.innerHeight - 10 + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
    }

    updatePosition() {
        if(this.movementDirection == 'right' && this.position.current.x >= this.position.start.x && this.position.current.x < this.position.end.x){
            this.position.current.x += this.velocity.x
        } else if(this.movementDirection == 'right' && this.position.current.x == this.position.end.x){
            this.movementDirection = 'left'
        } else if(this.movementDirection == 'left' && this.position.current.x > this.position.start.x){
            this.position.current.x -= this.velocity.x
        } else if (this.movementDirection == 'left' && this.position.current.x == this.position.start.x) {
            this.movementDirection = 'right'
        }
        this.draw()
    }
}

const init = () => {
    keys.right.pressed = false
    keys.left.pressed = false
    keys.up.pressed = false
    scrollOffset = 0

    const oldEnemyDivs = document.getElementsByClassName('enemy')
    while (oldEnemyDivs.length > 0) {
        oldEnemyDivs[0].parentNode.removeChild(oldEnemyDivs[0])
    }

    const oldPlayerDiv = document.getElementById('mainPlayer')
    if(oldPlayerDiv){
        document.body.removeChild(oldPlayerDiv)
    }
    
    enemies = []
    enemyIndex = 0

    player = new Player()
    player.draw()
    
    
    setInterval(() => {
        // Check the number of visible enemies
        const visibleEnemies = enemies.filter(enemy => 
            enemy.position.current.x >= scrollOffset && enemy.position.current.x <= scrollOffset + window.innerWidth
        ).length

        // If the number of visible enemies is below the threshold, create new enemies
        if (visibleEnemies < 5) {
            const x = Math.random() * window.innerWidth + scrollOffset
            const endX = x + 200
            const enemy = new Enemy(x, endX, enemyIndex++)
            enemy.draw()
            enemies.push(enemy)
        }
    }, 2000)
}


const animate = () => {
    enemies.forEach((enemy, index) => {
        enemy.updatePosition()
        // Remove enemies that move off-screen
        if (enemy.position.current.x < scrollOffset || enemy.position.current.x > scrollOffset + window.innerWidth) {
            document.body.removeChild(enemy.div)
            enemies.splice(index, 1)
        }
    })

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

    requestAnimationFrame(animate)

    if (scrollOffset == 5000) {
        alert('You Win!')
        init()
    }
}

document.addEventListener("keydown", (event) => {
    const pressedKey = event.keyCode
    console.log("pressedKey");
    console.log(pressedKey);
    
    switch(pressedKey){
        case 32:
        case 38:
        case 87:
            keys.up.pressed = true
            player.velocity.y -= 10
            console.log('up key pressed')
            break;
        case 39:
        case 68:
            keys.right.pressed = true
            // player.velocity.x = 1
            console.log('right key pressed')
            break;
        case 37:
        case 65:
            keys.left.pressed = true
            // player.velocity.x = -1
            console.log('left key pressed')
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

init()
animate()
