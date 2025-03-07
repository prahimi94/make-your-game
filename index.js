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
        const playerDiv = document.createElement('div')
        playerDiv.setAttribute("id", "mainPlayer")
        playerDiv.style.backgroundColor = "red"
        
        
        
        playerDiv.style.position = "absolute"; // Ensure the div is positioned
        playerDiv.style.left = this.position.x + "px";
        playerDiv.style.top = this.position.y + "px";
        playerDiv.style.width = this.width + "px";
        playerDiv.style.height = this.height + "px";

        document.body.appendChild(playerDiv)
    }

    updateYPosition() {
        this.position.y += this.velocity.y
        this.draw()
    }
}

const player = new Player()
player.draw()


const animiate = () => {
    
}

requestAnimationFrame(animiate)
