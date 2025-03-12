export const collisionChecker = (firstElem, secondElem) => {
    return (
        firstElem.position.x + firstElem.width > secondElem.position.x &&   // firstElem's right side is within secondElem's left side
        firstElem.position.x < secondElem.position.x + secondElem.width &&   // firstElem's left side is within secondElem's right side
        firstElem.position.y + firstElem.height <= secondElem.position.y &&   // firstElem's bottom is above secondElem
        firstElem.position.y + firstElem.height + firstElem.velocity.y >= secondElem.position.y  // firstElem will land on secondElem
    ) 
}