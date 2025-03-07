// Game constants
const GRAVITY = 0.6;
const JUMP_FORCE = 15;
const MOVEMENT_SPEED = 5;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 400;

// Add favicon
function createFavicon() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    // Draw black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 32, 32);

    // Draw "01" in white
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('01', 16, 16);

    // Create favicon link element
    const link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = canvas.toDataURL("image/x-icon");
    
    // Remove existing favicon if it exists
    const existingFavicon = document.querySelector("link[rel='shortcut icon']");
    if (existingFavicon) {
        document.head.removeChild(existingFavicon);
    }
    
    document.head.appendChild(link);
}

// Call createFavicon when the page loads
createFavicon();

class Player {
    constructor() {
        this.element = document.getElementById('player');
        this.x = GAME_WIDTH / 4;
        this.y = GAME_HEIGHT - 88; // Account for ground height and player height
        this.velocityX = 0;
        this.velocityY = 0;
        this.isJumping = false;
        this.facingRight = true;
        this.worldX = 0; // Track total distance moved in the world
        this.scrollSpeed = 0.3; // Slower scroll speed
        this.update();
    }

    update() {
        // Apply gravity
        this.velocityY += GRAVITY;
        
        // Update position
        this.x += this.velocityX;
        this.worldX += this.velocityX; // Update total world position
        this.y += this.velocityY;

        // Ground collision
        if (this.y > GAME_HEIGHT - 88) {
            this.y = GAME_HEIGHT - 88;
            this.velocityY = 0;
            this.isJumping = false;
        }

        // Screen boundaries and continuous scrolling
        if (this.x < GAME_WIDTH * 0.2) {
            this.x = GAME_WIDTH * 0.2;
            if (this.worldX > 0) {
                this.worldX += this.velocityX;
                this.updateBackground();
            }
        } else if (this.x > GAME_WIDTH * 0.8) {
            this.x = GAME_WIDTH * 0.8;
            this.worldX += this.velocityX;
            this.updateBackground();
        }

        // Update player facing direction
        if (this.velocityX > 0) {
            this.facingRight = true;
            this.element.style.transform = `translate(${this.x}px, ${this.y}px) scaleX(1)`;
        } else if (this.velocityX < 0) {
            this.facingRight = false;
            this.element.style.transform = `translate(${this.x}px, ${this.y}px) scaleX(-1)`;
        } else {
            this.element.style.transform = `translate(${this.x}px, ${this.y}px) scaleX(${this.facingRight ? 1 : -1})`;
        }

        // Update movement animation class
        if (this.velocityX !== 0) {
            this.element.classList.add('moving');
        } else {
            this.element.classList.remove('moving');
        }
    }

    updateBackground() {
        const background = document.querySelector('.background');
        const scrollPosition = -this.worldX * this.scrollSpeed;
        
        // Reset worldX when it gets too large to prevent floating point issues
        if (Math.abs(this.worldX) > 15000) {
            this.worldX = 0;
            // When resetting, smoothly transition the background back
            background.style.transition = 'none';
            background.style.transform = 'translateX(0)';
            // Force a reflow
            background.offsetHeight;
            background.style.transition = 'transform 0.05s linear';
        }
        
        background.style.transform = `translateX(${scrollPosition}px)`;
    }

    jump() {
        if (!this.isJumping) {
            this.velocityY = -JUMP_FORCE;  // Negative because we want to go up (lower Y value)
            this.isJumping = true;
        }
    }
}

// Game state
const player = new Player();
const keys = {
    left: false,
    right: false,
    up: false,
    e: false
};

// Event listeners
window.addEventListener('keydown', (e) => {
    switch(e.key.toLowerCase()) {  // Convert to lowercase to handle both upper and lower case
        case 'arrowleft':
        case 'a':
            keys.left = true;
            break;
        case 'arrowright':
        case 'd':
            keys.right = true;
            break;
        case 'arrowup':
        case 'w':
        case ' ':
            keys.up = true;
            player.jump();
            break;
        case 'e':
            keys.e = true;
            // Add your 'e' key action here
            console.log('E key pressed');
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch(e.key.toLowerCase()) {  // Convert to lowercase to handle both upper and lower case
        case 'arrowleft':
        case 'a':
            keys.left = false;
            break;
        case 'arrowright':
        case 'd':
            keys.right = false;
            break;
        case 'arrowup':
        case 'w':
        case ' ':
            keys.up = false;
            break;
        case 'e':
            keys.e = false;
            break;
    }
});

// Game loop
function gameLoop() {
    // Handle movement
    player.velocityX = 0;
    if (keys.left) player.velocityX = -MOVEMENT_SPEED;
    if (keys.right) player.velocityX = MOVEMENT_SPEED;

    // Update player
    player.update();

    // Continue game loop
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();

function updateBackground(playerX) {
    const background = document.querySelector('.background');
    const scrollSpeed = 0.5; // Adjust this value to change scroll speed
    const scrollPosition = -playerX * scrollSpeed;
    background.style.transform = `translateX(${scrollPosition}px)`;
}

// Add this to your existing movement update function
function updatePlayerPosition() {
    // ... existing movement code ...
    
    // Update player position
    player.style.transform = `translate(${playerX}px, ${playerY}px)`;
    
    // Update background position
    updateBackground(playerX);
    
    // ... rest of existing code ...
}

class RopePhysics {
    constructor(startX, startY, endX, endY, segments = 10) {
        this.segments = [];
        this.constraints = [];
        this.gravity = 0.5;
        this.friction = 0.99;
        this.broken = false;

        // Create rope segments
        const segmentLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)) / segments;
        for (let i = 0; i <= segments; i++) {
            this.segments.push({
                x: startX + (endX - startX) * (i / segments),
                y: startY + (endY - startY) * (i / segments),
                oldX: startX + (endX - startX) * (i / segments),
                oldY: startY + (endY - startY) * (i / segments),
                pinned: i === 0
            });
        }

        // Create constraints between segments
        for (let i = 0; i < segments; i++) {
            this.constraints.push({
                p1: this.segments[i],
                p2: this.segments[i + 1],
                length: segmentLength,
                active: true
            });
        }
    }

    cut(x, y, radius = 20) {
        if (this.broken) return false;

        // Check each rope segment for intersection with the cut point
        for (let i = 0; i < this.constraints.length; i++) {
            const constraint = this.constraints[i];
            if (!constraint.active) continue;

            const p1 = constraint.p1;
            const p2 = constraint.p2;

            // Calculate distance from point to line segment
            const A = x - p1.x;
            const B = y - p1.y;
            const C = p2.x - p1.x;
            const D = p2.y - p1.y;

            const dot = A * C + B * D;
            const len_sq = C * C + D * D;
            let param = -1;

            if (len_sq !== 0) {
                param = dot / len_sq;
            }

            let xx, yy;

            if (param < 0) {
                xx = p1.x;
                yy = p1.y;
            } else if (param > 1) {
                xx = p2.x;
                yy = p2.y;
            } else {
                xx = p1.x + param * C;
                yy = p1.y + param * D;
            }

            const dx = x - xx;
            const dy = y - yy;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < radius) {
                // Cut the rope at this point
                constraint.active = false;
                
                // Unpin all segments after the cut point
                for (let j = i + 1; j < this.segments.length; j++) {
                    this.segments[j].pinned = false;
                }
                
                this.broken = true;
                return true;
            }
        }
        return false;
    }

    update() {
        // Update segment positions based on velocity
        for (let i = 0; i < this.segments.length; i++) {
            const segment = this.segments[i];
            if (segment.pinned) continue;

            const vx = (segment.x - segment.oldX) * this.friction;
            const vy = (segment.y - segment.oldY) * this.friction;

            segment.oldX = segment.x;
            segment.oldY = segment.y;
            segment.x += vx;
            segment.y += vy;
            segment.y += this.gravity;
        }

        // Solve constraints multiple times for better stability
        for (let i = 0; i < 5; i++) {
            this.constraints.forEach(constraint => {
                if (!constraint.active) return;

                const dx = constraint.p2.x - constraint.p1.x;
                const dy = constraint.p2.y - constraint.p1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const difference = constraint.length - distance;
                const percent = difference / distance / 2;
                const offsetX = dx * percent;
                const offsetY = dy * percent;

                if (!constraint.p1.pinned) {
                    constraint.p1.x -= offsetX;
                    constraint.p1.y -= offsetY;
                }
                if (!constraint.p2.pinned) {
                    constraint.p2.x += offsetX;
                    constraint.p2.y += offsetY;
                }
            });
        }
    }

    draw(ctx) {
        ctx.beginPath();
        let started = false;

        for (let i = 0; i < this.constraints.length; i++) {
            const constraint = this.constraints[i];
            if (!constraint.active) continue;

            if (!started) {
                ctx.moveTo(constraint.p1.x, constraint.p1.y);
                started = true;
            }
            ctx.lineTo(constraint.p2.x, constraint.p2.y);
        }

        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.stroke();
    }
}

class RopeGame {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 800;
        this.canvas.height = 400;
        this.ctx = this.canvas.getContext('2d');
        document.getElementById('game-container').appendChild(this.canvas);

        this.score = 0;
        this.level = 1;
        this.challenges = {
            go: [
                {
                    title: 'Slice Operations',
                    description: 'Implement a function that takes a slice and returns a new slice with elements in reverse order.',
                    code: `func reverseSlice(slice []int) []int {
    // Your code here
}`
                },
                {
                    title: 'Map Implementation',
                    description: 'Implement a function that counts the frequency of each word in a string.',
                    code: `func wordFrequency(text string) map[string]int {
    // Your code here
}`
                },
                {
                    title: 'Channel Communication',
                    description: 'Create a function that sends numbers through a channel until a limit is reached.',
                    code: `func sendNumbers(ch chan int, limit int) {
    // Your code here
}`
                },
                {
                    title: 'Goroutine Coordination',
                    description: 'Implement a function that coordinates multiple goroutines using WaitGroup.',
                    code: `func coordinateWorkers(tasks []string) {
    // Your code here
}`
                }
            ]
        };

        this.setupLevel();
        this.setupEventListeners();
        this.gameLoop();
    }

    setupEventListeners() {
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.showNextChallenge();
        });
    }

    showNextChallenge() {
        const challenges = this.challenges.go;
        const currentChallenge = challenges[this.level % challenges.length];
        
        const modal = document.createElement('div');
        modal.className = 'challenge-modal';
        modal.innerHTML = `
            <div class="challenge-content">
                <h3>${currentChallenge.title}</h3>
                <p>${currentChallenge.description}</p>
                <textarea class="code-input">${currentChallenge.code}</textarea>
                <div class="button-container">
                    <button onclick="game.submitSolution()">Submit</button>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()">Cancel</button>
                </div>
            </div>
        `;
        document.getElementById('game-container').appendChild(modal);
    }

    submitSolution() {
        // Basic validation - check if the solution contains required Go elements
        const solution = document.querySelector('.code-input').value;
        if (this.validateSolution(solution)) {
            this.score += 100;
            this.level++;
            document.querySelector('.challenge-modal').remove();
            this.showLevelComplete();
        } else {
            alert('Your solution needs some work. Try again!');
        }
    }

    validateSolution(solution) {
        // Basic validation checking for Go syntax elements
        const requiredElements = {
            'Slice Operations': ['func reverseSlice', 'return', '[]int'],
            'Map Implementation': ['func wordFrequency', 'map[string]int', 'return'],
            'Channel Communication': ['func sendNumbers', 'chan', 'close'],
            'Goroutine Coordination': ['WaitGroup', 'Add', 'Done', 'Wait']
        };

        const currentChallenge = this.challenges.go[this.level % this.challenges.go.length];
        return requiredElements[currentChallenge.title].every(element => solution.includes(element));
    }

    showLevelComplete() {
        const modal = document.createElement('div');
        modal.className = 'level-complete';
        modal.innerHTML = `
            <h2>Challenge Complete!</h2>
            <p>Score: ${this.score}</p>
            <button onclick="game.nextLevel()">Next Challenge</button>
        `;
        document.getElementById('game-container').appendChild(modal);
    }

    nextLevel() {
        document.querySelector('.level-complete').remove();
        this.showNextChallenge();
    }

    setupLevel() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    gameLoop() {
        this.setupLevel();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize the game
const game = new RopeGame();
