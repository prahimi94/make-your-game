let background = document.getElementById("scrollBackground"); // Get the background element
let positionX = 0; // Starting position for the scroll


// Function to scroll the background
export function scrollBackground(velocity, scrollDirection = 'left') {
    if(scrollDirection == 'left'){
        positionX -= velocity // Move the background to the left by 'speed' pixels

    } else {
        positionX =+ velocity // Move the background to the right by 'speed' pixels
    }
        
    background.style.backgroundPositionX = positionX + "px"; // Update the background position
}

