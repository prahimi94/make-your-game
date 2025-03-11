const mainGame = document.getElementById('game-container')
const platformImageWidth = 580
export const platformImageHeight = 50
export const platformTop = mainGame.offsetHeight + mainGame.offsetTop - platformImageHeight

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

export const platforms = [
    new Platform({x: 0, y: platformTop}),
    new Platform({x:platformImageWidth-3, y: platformTop}),
    new Platform({x: platformImageWidth*2 +100, y: platformTop}),
    new Platform({x: platformImageWidth/2, y:platformTop -200, width: platformImageWidth/6, height: platformImageHeight, type: 'platform'}),
    new Platform({x: platformImageWidth -220, y:platformTop -350, type: 'platform'})
];


platforms.forEach((platform) => {
    platform.draw()
});