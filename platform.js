const mainGame = document.getElementById('game-container')
export const platformImageWidth = 580
export const platformImageHeight = 50
export const groundTop = mainGame.offsetHeight  + mainGame.offsetTop  - platformImageHeight

class Platform {
    constructor({x, y, index, width = platformImageWidth, height = platformImageHeight, type = 'ground'}){
        this.position = {
            x,
            y
        }
        this.type = type
        
        this.width = width
        this.height = height
        this.index = index
        this.div = document.getElementById(`platform${index}`)
    }
    
    draw() {
        this.div.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;

        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
    }

    scrollPlatform(velocity, scrollDirection = 'left') {
        if(scrollDirection == 'left'){
            this.position.x -= velocity
        } else { 
            this.position.x += velocity
        }
        this.div.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
    }
}


export let platforms = [];

export const initPlatforms = () => {
    platforms = []
    
    let rightOfLastPlatform = 0
    for (let i = 0; i < 20; i++) {
        platforms.push(new Platform({x: rightOfLastPlatform, y: groundTop, index: i}))

        rightOfLastPlatform += platformImageWidth
        if (i %3 == 0 || i % 5 == 0 ) {
            rightOfLastPlatform += 70
        } 
    }

    platforms.push(
        // first platforms for initial movement
        new Platform({x: 130, y: groundTop - 120, index: 20, width: 50, height: platformImageHeight, type: 'platform'}),
        new Platform({x: 350, y: groundTop - 180, index: 21, width: 120, height: platformImageHeight, type: 'platform'}),
    
        // jumping platform
        new Platform({x: 900, y: groundTop - 200, index: 22, width: 180, height: platformImageHeight, type: 'platform'}),
        new Platform({x: 1400, y: groundTop - 250, index: 23, width: 150, height: platformImageHeight, type: 'platform'}),
        new Platform({x: 1800, y: groundTop - 180, index: 24, width: 130, height: platformImageHeight, type: 'platform'}),
    
        // final platforms for bigger jumps
        new Platform({x: 2200, y: groundTop - 250, index: 25, width: 180, height: platformImageHeight, type: 'platform'}),
        new Platform({x: 2500, y: groundTop - 300, index: 26, width: 160, height: platformImageHeight, type: 'platform'}),


        new Platform({x: 3000, y: groundTop - platformImageHeight, index: 27, width: 50, height: platformImageHeight, type: 'platform'}),
        new Platform({x: 3050, y: groundTop - platformImageHeight*2, index: 28, width: 50, height: platformImageHeight*2, type: 'platform'}),
        new Platform({x: 3100, y: groundTop - platformImageHeight*3, index: 29, width: 50, height: platformImageHeight*3, type: 'platform'}),
        new Platform({x: 3150, y: groundTop - platformImageHeight*4, index: 30, width: 50, height: platformImageHeight*4, type: 'platform'}),
        new Platform({x: 3300, y: groundTop - platformImageHeight*4, index: 31, width: 50, height: platformImageHeight*4, type: 'platform'}),
        new Platform({x: 3350, y: groundTop - platformImageHeight*3, index: 32, width: 50, height: platformImageHeight*3, type: 'platform'}),
        new Platform({x: 3400, y: groundTop - platformImageHeight*2, index: 33, width: 50, height: platformImageHeight*2, type: 'platform'}),
        new Platform({x: 3450, y: groundTop - platformImageHeight, index: 34, width: 50, height: platformImageHeight, type: 'platform'}),
        
        new Platform({x: 4500, y: groundTop - platformImageHeight, index: 41, width: 50, height: platformImageHeight, type: 'platform'}),
        new Platform({x: 4550, y: groundTop - platformImageHeight*2, index: 42, width: 50, height: platformImageHeight*2, type: 'platform'}),
        new Platform({x: 4600, y: groundTop - platformImageHeight*3, index: 43, width: 50, height: platformImageHeight*3, type: 'platform'}),
        new Platform({x: 4650, y: groundTop - platformImageHeight*4, index: 44, width: 50, height: platformImageHeight*4, type: 'platform'}),
        new Platform({x: 4700, y: groundTop - platformImageHeight*5, index: 45, width: 50, height: platformImageHeight*5, type: 'platform'}),
        new Platform({x: 4750, y: groundTop - platformImageHeight*6, index: 46, width: 50, height: platformImageHeight*6, type: 'platform'}),
        
        new Platform({x: 5500, y: groundTop - platformImageHeight*6, index: 47, width: platformImageHeight*6, height: platformImageHeight*6, type: 'castle'}),

        // pipes as obstacles
        new Platform({x: 650, y: groundTop - 80, index: 35, width: 100, height: 80, type: 'pipe'}),
        new Platform({x: 1200, y: groundTop - 120, index: 36, width: 100, height: 120, type: 'pipe'}),
    
        // more pipes for more challenge
        new Platform({x: 1600, y: groundTop - 90, index: 37, width: 100, height: 90, type: 'pipe'}),
        new Platform({x: 2000, y: groundTop - 70, index: 38, width: 100, height: 70, type: 'pipe'}),


        new Platform({x: 3700, y: groundTop - 70, index: 39, width: 100, height: 70, type: 'pipe'}),
        new Platform({x: 4150, y: groundTop - 70, index: 40, width: 100, height: 70, type: 'pipe'}),
    );
    
    platforms.forEach((platform) => {
        platform.draw()
    });
}