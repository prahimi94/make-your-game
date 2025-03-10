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
const platformImageWidth = 580
const platformImageHeight = 50
const mainGame = document.getElementById('mainGame')
const platformTop = mainGame.offsetHeight + mainGame.offsetTop - platformImageHeight

class Platform {
    constructor({x, y, width = platformImageWidth, height = platformImageHeight, type = 'ground'}){
        this.position = {
            x,
            y
        }
        this.type = type
        
        this.width = width
        this.height = height
    }
    
    draw() {
        let platformDiv = document.createElement('div')
        platformDiv.setAttribute("id", "platform")
        platformDiv.style.position = "absolute"; 
        platformDiv.style.left = this.position.x + "px";
        platformDiv.style.top = this.position.y + "px";
        platformDiv.style.width = this.width + "px";
        platformDiv.style.height = this.height + "px";
        // if (this.type == 'ground') {
            platformDiv.style.backgroundImage = `url(image/bricks.png)`;
        // } else {
        //     platformDiv.style.backgroundImage = `url(image/platform.png)`;
        // }
        platformDiv.style.backgroundSize = 'contain';
        document.body.appendChild(platformDiv)
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
        this.width = 50
        this.height = 50
        this.velocity = {
            x: 1
        }

        this.index = index
        this.div = document.createElement('div')
        this.div.setAttribute("id", `enemy${index}`)
        this.div.setAttribute("class", `enemy`)
        // this.div.style.backgroundImage = `url(image/mushroom.svg)`
        this.div.style.backgroundImage = `url(image/carnivorous-plant.png)`
        this.div.style.backgroundSize = 'cover'
        this.div.style.position = "absolute"; // Ensure the div is positioned
        document.body.appendChild(this.div)
    }

    draw() {
        this.div.style.left = this.position.current.x + "px";
        // this.div.style.top = window.innerHeight - 10 + "px";
        this.div.style.top = platformTop - platformImageHeight + "px";
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

class Player {
    constructor(){
        this.position = {
            x: 20,
            y: 20
        }
        this.width = 100
        this.height = 100
        this.velocity = {
            x: 0,
            y: 1
        }
        
        this.div = document.createElement('div')
        this.div.setAttribute("id", "mainPlayer")
        // this.div.style.backgroundColor = "red"
        // div.playerDiv.backgroundImage = `url(${mario})`;
        // this.div.style.backgroundImage = `url(image/mario.jpg)`
        // this.div.style.backgroundImage = `url(image/mario-49314.png)`
        this.div.style.backgroundImage = `url(image/runnig-mario.gif)`
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
        let onPlatform = false;
    
        platforms.forEach((platform) => {
            if (
                this.position.x + this.width > platform.position.x &&   // Player's right side is within platform's left side
                this.position.x < platform.position.x + platform.width &&   // Player's left side is within platform's right side
                this.position.y + this.height <= platform.position.y &&   // Player's bottom is above platform
                this.position.y + this.height + this.velocity.y >= platform.position.y  // Player will land on platform
            ) {  
                console.log('collision detected');
                this.position.y = platform.position.y - this.height;  // Place player on top of platform
                this.velocity.y = 0;  // Stop falling
                onPlatform = true;
            }
        });
    
        if (!onPlatform) {
            this.velocity.y += gravity;  // Apply gravity only when not on a platform
        } else {
            this.velocity.y = 0;  // Stop falling
        }
    
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.draw();
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
            const enemySpacing = window.innerWidth / 5; // Adjust the number of enemies per screen width
            for (let i = 0; i < 5 - visibleEnemies; i++) {
                const randomOffset = Math.round(Math.random()) * enemySpacing; // Add randomness to the enemy position
                const x = scrollOffset + i * enemySpacing + randomOffset;
                const endX = x + 200;
                const enemy = new Enemy(x, endX, enemyIndex++);
                enemy.draw();
                enemies.push(enemy);
            }
        }

        // Ensure enemies do not move in parallel
        enemies.forEach((enemy, index) => {
            if (index % 2 === 0) {
                enemy.velocity.x = 1;
            } else {
                enemy.velocity.x = 2;
            }
        });
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


const platforms = [
    new Platform({x: 0, y: platformTop}),
    new Platform({x:platformImageWidth-3, y: platformTop}),
    new Platform({x: platformImageWidth*2 +100, y: platformTop}),
    new Platform({x: platformImageWidth/2, y:platformTop -200, width: platformImageWidth/6, height: platformImageHeight, type: 'platform'}),
    new Platform({x: platformImageWidth -220, y:platformTop -350, type: 'platform'})
];


platforms.forEach((platform) => {
    platform.draw()
});

init()
animate()






