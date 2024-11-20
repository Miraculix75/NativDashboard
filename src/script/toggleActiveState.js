// toggleActiveState.js
// Fügt beim Klick auf einen chart-container die Klasse .active hinzu 
// und entfernt sie von allen anderen chart-container
document.querySelectorAll('.chart-container').forEach(container => {
    container.addEventListener('click', function () {
        // Entfernt .active von allen anderen Containern
        document.querySelectorAll('.chart-container').forEach(el => el.classList.remove('active'));
        
        // Fügt .active zu dem geklickten Container hinzu
        this.classList.add('active');
    });
});
