let background = document.getElementById("scrollBackground"); // Get the background element
let positionX = 0; // Starting position for the scroll
let speed = 2; // The speed of the scroll (pixels per frame)


// Function to scroll the background
export function scrollBackground(velocity, scrollDirection = 'left') {
    if(scrollDirection == 'left'){
        // positionX -= Math.floor(velocity/2); // Move the background to the left by 'speed' pixels
        positionX -= velocity // Move the background to the left by 'speed' pixels

    } else {
        positionX =+ velocity // Move the background to the right by 'speed' pixels
    }
        
        // if (positionX <= -background.offsetWidth) { // If the background is completely off-screen
        //     positionX = 0; // Reset the background position to the start
        // }
        background.style.backgroundPositionX = positionX + "px"; // Update the background position
    // requestAnimationFrame(scrollBackground); // Repeat the scroll every frame
}

