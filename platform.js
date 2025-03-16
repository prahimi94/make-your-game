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
        this.div = document.createElement('div')
        this.div.setAttribute("id", `platform${index}`)
        this.div.setAttribute("class", `platform`)
        this.div.style.position = "absolute"; 
        document.body.appendChild(this.div)
    }
    
    draw() {
        this.div.style.left = this.position.x + "px";
        this.div.style.top = this.position.y + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        if (this.type == 'ground') {
            this.div.style.backgroundImage = `url(image/bricks.png)`;
            this.div.style.backgroundSize = 'contain';
        } else if (this.type == 'pipe') {
            this.div.style.backgroundImage = `url(image/mario-pipe.png)`;
            this.div.style.backgroundSize = 'cover';
            this.div.style.backgroundRepeat = 'round';
        } else if (this.type == 'castle') {
            this.div.style.backgroundImage = `url(image/castle.png)`;
            this.div.style.backgroundSize = 'cover';
            this.div.style.backgroundRepeat = 'round';
        } else {
            this.div.style.backgroundImage = `url(image/bricks.png)`;
            this.div.style.backgroundSize = 'contain';
        }
    }

    scrollPlatform(velocity, scrollDirection = 'left') {
        if(scrollDirection == 'left'){
            this.position.x -= velocity
        } else { 
            this.position.x += velocity
        }
        this.div.style.left = this.position.x + "px"
    }
}


export let platforms = [];

export const initPlatforms = () => {
    platforms = []

    const oldPlatformDivs = document.getElementsByClassName('platform')
    while (oldPlatformDivs.length > 0) {
        oldPlatformDivs[0].parentNode.removeChild(oldPlatformDivs[0])
    }

    let rightOfLastPlatform = 0
    for (let i = 0; i < 20; i++) {
        platforms.push(new Platform({x: rightOfLastPlatform, y: groundTop, index: i}))

        rightOfLastPlatform += platformImageWidth
        if (i %3 == 0 || i % 5 == 0 ) {
            rightOfLastPlatform += 70
        } 
    }

    platforms.push(
        // سکوهای اولیه برای حرکت ابتدایی
        new Platform({x: 130, y: groundTop - 120, index: 0, width: 50, height: platformImageHeight, type: 'platform'}),
        new Platform({x: 350, y: groundTop - 180, index: 1, width: 120, height: platformImageHeight, type: 'platform'}),
    
        // سکوهای پرشی برای ایجاد تنوع
        new Platform({x: 900, y: groundTop - 200, index: 2, width: 180, height: platformImageHeight, type: 'platform'}),
        new Platform({x: 1400, y: groundTop - 250, index: 3, width: 150, height: platformImageHeight, type: 'platform'}),
        new Platform({x: 1800, y: groundTop - 180, index: 4, width: 130, height: platformImageHeight, type: 'platform'}),
    
        // سکوهای نهایی برای پرش‌های بلندتر
        new Platform({x: 2200, y: groundTop - 250, index: 5, width: 180, height: platformImageHeight, type: 'platform'}),
        new Platform({x: 2500, y: groundTop - 300, index: 6, width: 160, height: platformImageHeight, type: 'platform'}),


        new Platform({x: 3000, y: groundTop - platformImageHeight, index: 7, width: 50, height: platformImageHeight, type: 'platform'}),
        new Platform({x: 3050, y: groundTop - platformImageHeight*2, index: 8, width: 50, height: platformImageHeight*2, type: 'platform'}),
        new Platform({x: 3100, y: groundTop - platformImageHeight*3, index: 9, width: 50, height: platformImageHeight*3, type: 'platform'}),
        new Platform({x: 3150, y: groundTop - platformImageHeight*4, index: 10, width: 50, height: platformImageHeight*4, type: 'platform'}),
        new Platform({x: 3300, y: groundTop - platformImageHeight*4, index: 11, width: 50, height: platformImageHeight*4, type: 'platform'}),
        new Platform({x: 3350, y: groundTop - platformImageHeight*3, index: 12, width: 50, height: platformImageHeight*3, type: 'platform'}),
        new Platform({x: 3400, y: groundTop - platformImageHeight*2, index: 13, width: 50, height: platformImageHeight*2, type: 'platform'}),
        new Platform({x: 3450, y: groundTop - platformImageHeight, index: 14, width: 50, height: platformImageHeight, type: 'platform'}),
        
        new Platform({x: 4500, y: groundTop - platformImageHeight, index: 21, width: 50, height: platformImageHeight, type: 'platform'}),
        new Platform({x: 4550, y: groundTop - platformImageHeight*2, index: 22, width: 50, height: platformImageHeight*2, type: 'platform'}),
        new Platform({x: 4600, y: groundTop - platformImageHeight*3, index: 23, width: 50, height: platformImageHeight*3, type: 'platform'}),
        new Platform({x: 4650, y: groundTop - platformImageHeight*4, index: 24, width: 50, height: platformImageHeight*4, type: 'platform'}),
        new Platform({x: 4700, y: groundTop - platformImageHeight*5, index: 25, width: 50, height: platformImageHeight*5, type: 'platform'}),
        new Platform({x: 4750, y: groundTop - platformImageHeight*6, index: 26, width: 50, height: platformImageHeight*6, type: 'platform'}),
        
        new Platform({x: 5500, y: groundTop - platformImageHeight*6, index: 27, width: platformImageHeight*6, height: platformImageHeight*6, type: 'castle'}),

        // لوله‌ها به عنوان موانع
        new Platform({x: 650, y: groundTop - 80, index: 15, width: 100, height: 80, type: 'pipe'}),
        new Platform({x: 1200, y: groundTop - 120, index: 16, width: 100, height: 120, type: 'pipe'}),
    
        // لوله‌های بیشتر برای چالش
        new Platform({x: 1600, y: groundTop - 90, index: 17, width: 100, height: 90, type: 'pipe'}),
        new Platform({x: 2000, y: groundTop - 70, index: 18, width: 100, height: 70, type: 'pipe'}),


        new Platform({x: 3700, y: groundTop - 70, index: 19, width: 100, height: 70, type: 'pipe'}),
        new Platform({x: 4150, y: groundTop - 70, index: 20, width: 100, height: 70, type: 'pipe'}),
    );
    
    platforms.forEach((platform) => {
        platform.draw()
    });
}