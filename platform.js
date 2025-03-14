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
            this.div.style.backgroundSize = 'contain';
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
        new Platform({x: platformImageWidth/2, y:groundTop -100, index: 3, width: platformImageWidth/6, height: platformImageHeight, type: 'platform'}),
        new Platform({x: platformImageWidth -120, y:groundTop -250, index: 4, type: 'platform'}),

        new Platform({x: platformImageWidth * 2 , y:groundTop-200, index: 5,  width: 100, height: 200, type: 'pipe'}),
        new Platform({x: platformImageWidth*3 + 100, y:groundTop-100, index: 6, width:100, height:100,  type: 'pipe'}),
    ) 
    
    platforms.forEach((platform) => {
        platform.draw()
    });
}