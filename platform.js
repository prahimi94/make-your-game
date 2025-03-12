const mainGame = document.getElementById('game-container')
export const platformImageWidth = 580
export const platformImageHeight = 50
export const groundTop = mainGame.offsetHeight /* + mainGame.offsetTop */ - platformImageHeight

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
        if (this.type == 'ground') {
            platformDiv.style.backgroundImage = `url(image/bricks.png)`;
            platformDiv.style.backgroundSize = 'contain';
        } else if (this.type == 'pipe') {
            platformDiv.style.backgroundImage = `url(image/mario-pipe.png)`;
            platformDiv.style.backgroundSize = 'contain';
            platformDiv.style.backgroundRepeat = 'round';
        } else {
            platformDiv.style.backgroundImage = `url(image/bricks.png)`;
            platformDiv.style.backgroundSize = 'contain';
        }
        document.body.appendChild(platformDiv)
    }
}


export let platforms = [];

export const initPlatforms = () => {
    platforms = [
        new Platform({x: 0, y: groundTop}),
        new Platform({x:platformImageWidth-3, y: groundTop}),
        new Platform({x: platformImageWidth*2 +100, y: groundTop}),
        new Platform({x: platformImageWidth/2, y:groundTop -200, width: platformImageWidth/6, height: platformImageHeight, type: 'platform'}),
        new Platform({x: platformImageWidth -220, y:groundTop -350, type: 'platform'}),
        new Platform({x: platformImageWidth*3 , y:groundTop-200 ,  width: 100, height: 200, type: 'pipe'}),
        new Platform({x: platformImageWidth*3 + 100, y:groundTop-50 , width:100, height:50,  type: 'pipe'}),
    ]
    
    platforms.forEach((platform) => {
        platform.draw()
    });
}