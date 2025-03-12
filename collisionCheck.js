 export const collisionChecker = (firstElem, secondElem, secondElemType) => {
    return (
         firstElem.position.x + firstElem.width > secondElem.position.x &&   // firstElem's right side is within secondElem's left side
        firstElem.position.x < secondElem.position.x + secondElem.width &&   // firstElem's left side is within secondElem's right side
       firstElem.position.y + firstElem.height <= secondElem.position.y    // firstElem's bottom is above secondElem          firstElem.position.y + firstElem.height + firstElem.velocity.y >= secondElem.position.y  // firstElem will land on secondElem
      )
    } 

    export const collisionCheck = (firstElem, secondElems) => {
 updatePosition()
    {
        firstElem.position.x += firstElem.velocity.x;
        firstElem.position.y += firstElem.velocity.y;
        firstElem.draw();
    }
       
    let onsecondElem = false;
    secondElems.forEach((secondElem) => {
    if (secondElem.type === 'secondElem' || secondElem.type === 'ground') { 
            // Check if the secondElem is a secondElem
        if (firstElem.position.x + firstElem.width > secondElem.position.x &&   // Player's right side is within secondElem's left side
            firstElem.position.x < secondElem.position.x + secondElem.width &&   // Player's left side is within secondElem's right side
            firstElem.position.y + firstElem.height <= secondElem.position.y &&   // Player's bottom is above secondElem
            firstElem.position.y + firstElem.height + firstElem.velocity.y >= secondElem.position.y  // Player will land on secondElem
        ){  
            console.log('collision detected');
            firstElem.position.y = secondElem.position.y - firstElem.height;  // Place player on top of secondElem
            firstElem.velocity.y = 0;  // Stop falling
            onsecondElem = true;  
            // Check if player hits the bottom of the secondElem
    }   else if 
         (firstElem.position.y <= secondElem.position.y + secondElemImageHeight &&
         firstElem.position.y - firstElem.velocity.y > secondElem.position.y + secondElemImageHeight && // Player was below last frame
         firstElem.position.x + firstElem.width > secondElem.position.x && // Within secondElem X range
         firstElem.position.x < secondElem.position.x + secondElem.width &&
         firstElem.velocity.y < 0 // Only detect if moving upward
        ) {
            firstElem.position.y = secondElem.position.y + secondElemImageHeight; // Prevent passing through
            firstElem.velocity.y = 2; // Give downward force after hitting
        }
    } else if (secondElem.type === 'pipe') {
        if (
            firstElem.position.x + firstElem.width > secondElem.position.x && // Player's right side is within secondElem's left side
            firstElem.position.x < secondElem.position.x + secondElem.width && // Player's left side is within secondElem's right side
            firstElem.position.y + firstElem.height > secondElem.position.y && // Player's bottom is below secondElem's top
            firstElem.position.y < secondElem.position.y + secondElem.height // Player's top is above secondElem's bottom
        ) {
            firstElem.position.x = secondElem.position.x + secondElem.width; // Place player to the right of the secondElem
            firstElem.velocity.x = 0; // Stop horizontal movement
        } else if (
            firstElem.position.x < secondElem.position.x + secondElem.width && // Player's left side is within secondElem's right side
            firstElem.position.x + firstElem.width > secondElem.position.x && // Player's right side is within secondElem's left side
            firstElem.position.x + firstElem.width + firstElem.velocity.x >= secondElem.position.x && // Player will hit the left side of the secondElem
            firstElem.position.y + firstElem.height > secondElem.position.y && // Player's bottom is below secondElem's top
            firstElem.position.y < secondElem.position.y + secondElem.height // Player's top is above secondElem's bottom
        ) {
            firstElem.position.x = secondElem.position.x - firstElem.width; // Place player to the left of the secondElem
            firstElem.velocity.x = 0; // Stop horizontal movement
        } else if (
            firstElem.position.x < secondElem.position.x + secondElem.width && // Player's left side is within secondElem's right side
            firstElem.position.x + firstElem.velocity.x <= secondElem.position.x + secondElem.width && // Player will hit the right side of the secondElem
            firstElem.position.y + firstElem.height > secondElem.position.y && // Player's bottom is below secondElem's top
            firstElem.position.y < secondElem.position.y + secondElem.height // Player's top is above secondElem's bottom
        ) {
            firstElem.position.x = secondElem.position.x + secondElem.width; // Place player to the right of the secondElem
            firstElem.velocity.x = 0; // Stop horizontal movement
        }
    }
    }    
    );
   
    }

