
console.log('Menu script loaded')
document.addEventListener("keydown", (event) => {
    if (event.code == 'Escape') {
        console.log('Escape pressed')
        document.getElementById('menu').style.display = 'block'}
})