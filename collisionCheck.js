export const collidedFromTop = (player, obstacle) => {
    const playerBottom = player.position.y + player.height;
    const playerRight = player.position.x + player.width;
    const playerLeft = player.position.x;
    const playerTop = player.position.y;

    const playerBottomNextFrame = playerBottom + player.velocity.y;
    const playerRightNextFrame = playerRight + player.velocity.x;
    const playerLeftNextFrame = playerLeft + player.velocity.x;
    const playerTopNextFrame = playerTop + player.velocity.y; 

    const obstacleBottom = obstacle.position.y + obstacle.height;
    const obstacleRight = obstacle.position.x + obstacle.width;
    const obstacleLeft = obstacle.position.x;
    const obstacleTop = obstacle.position.y;

    return (
        playerRight > obstacleLeft &&   // Player's right side is within obstacle's left side
        playerLeft < obstacleRight &&   // Player's left side is within obstacle's right side
        playerBottom <= obstacleTop &&   // Player's bottom is above obstacle
        playerBottomNextFrame >= obstacleTop  // Player will land on obstacle
    )
}

export const collidedFromBottom = (player, obstacle) => {
    const playerBottom = player.position.y + player.height;
    const playerRight = player.position.x + player.width;
    const playerLeft = player.position.x;
    const playerTop = player.position.y;

    const playerBottomNextFrame = playerBottom + player.velocity.y;
    const playerRightNextFrame = playerRight + player.velocity.x;
    const playerLeftNextFrame = playerLeft + player.velocity.x;
    const playerTopNextFrame = playerTop + player.velocity.y; 

    const obstacleBottom = obstacle.position.y + obstacle.height;
    const obstacleRight = obstacle.position.x + obstacle.width;
    const obstacleLeft = obstacle.position.x;
    const obstacleTop = obstacle.position.y;

    return (
        playerTop <= obstacleTop + obstacle.height &&
        playerTop - player.velocity.y > obstacleTop + obstacle.height && // Player was below last frame
        playerRight > obstacleLeft && // Within obstacle X range
        playerLeft < obstacleRight &&
        player.velocity.y < 0 // Only detect if moving upward
    )
}

export const collidedFromLeft = (player, obstacle) => {
    const playerBottom = player.position.y + player.height;
    const playerRight = player.position.x + player.width;
    const playerLeft = player.position.x;
    const playerTop = player.position.y;

    const playerBottomNextFrame = playerBottom + player.velocity.y;
    const playerRightNextFrame = playerRight + player.velocity.x;
    const playerLeftNextFrame = playerLeft + player.velocity.x;
    const playerTopNextFrame = playerTop + player.velocity.y; 

    const obstacleBottom = obstacle.position.y + obstacle.height;
    const obstacleRight = obstacle.position.x + obstacle.width;
    const obstacleLeft = obstacle.position.x;
    const obstacleTop = obstacle.position.y;

    return (
        playerLeft < obstacleRight && // Player's left side is within obstacle's right side
        playerRight > obstacleLeft && // Player's right side is within obstacle's left side
        
        playerLeftNextFrame <= obstacleLeft && // Player will hit the left side of the obstacle

        playerBottom > obstacleTop && // Player's bottom is below obstacle's top
        playerTop < obstacleBottom // Player's top is above obstacle's bottom
    )
}

export const collidedFromRight = (player, obstacle) => {
    const playerBottom = player.position.y + player.height;
    const playerRight = player.position.x + player.width;
    const playerLeft = player.position.x;
    const playerTop = player.position.y;

    const playerBottomNextFrame = playerBottom + player.velocity.y;
    const playerRightNextFrame = playerRight + player.velocity.x;
    const playerLeftNextFrame = playerLeft + player.velocity.x;
    const playerTopNextFrame = playerTop + player.velocity.y; 

    const obstacleBottom = obstacle.position.y + obstacle.height;
    const obstacleRight = obstacle.position.x + obstacle.width;
    const obstacleLeft = obstacle.position.x;
    const obstacleTop = obstacle.position.y;

    return (
        playerLeft < obstacleRight && // Player's left side is within obstacle's right side
        playerRight > obstacleLeft && // Player's right side is within obstacle's left side
        
        playerRightNextFrame >= obstacleRight &&  // Player will hit the right side of the obstacle
        
        playerBottom > obstacleTop && // Player's bottom is below obstacle's top
        playerTop < obstacleBottom // Player's top is above obstacle's bottom
    )
}
export const collidedWithCoin = (player, coin) => {
    const playerBottom = player.position.y + player.height;
    const playerRight = player.position.x + player.width;
    const playerLeft = player.position.x;
    const playerTop = player.position.y;

    const coinBottom = coin.position.y + coin.height;
    const coinRight = coin.position.x + coin.width;
    const coinLeft = coin.position.x;
    const coinTop = coin.position.y;

    return (
        playerRight > coinLeft &&   // Player's right side is within coin's left side
        playerLeft < coinRight &&   // Player's left side is within coin's right side
        playerBottom > coinTop &&   // Player's bottom is below coin's top
        playerTop < coinBottom      // Player's top is above coin's bottom
    );
};

