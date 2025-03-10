let background = document.getElementById("scrollBackground"); // Get the background element
let positionX = 0; // Starting position for the scroll
let speed = 2; // The speed of the scroll (pixels per frame)
let isScrolling = true; // Track whether the background is scrolling

// Function to scroll the background
function scrollBackground() {
    if (isScrolling) {
        positionX -= speed; // Move the background to the left by 'speed' pixels
        if (positionX <= -background.offsetWidth) { // If the background is completely off-screen
            positionX = 0; // Reset the background position to the start
        }
        background.style.backgroundPositionX = positionX + "px"; // Update the background position
    }
    requestAnimationFrame(scrollBackground); // Repeat the scroll every frame
}

// Start the scrolling
scrollBackground();

// Toggle scrolling on Spacebar press
document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        isScrolling = !isScrolling; // Toggle the scrolling state
    }
});
