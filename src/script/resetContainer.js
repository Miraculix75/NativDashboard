// resetContainer.js
document.querySelectorAll('.chart-container').forEach(container => {
    container.querySelector('.close-btn').addEventListener('click', () => resetContainer(container));
});

function resetContainer(container) {
    const index = container.dataset.index;
    const initial = initialPositions[index];
    container.classList.remove('active'); // Entfernt die Vergrößerung
    container.style.position = 'relative';
    container.style.left = '0';
    container.style.top = '0';
    container.style.width = `${initial.width}px`;
    container.style.height = `${initial.height}px`;
	container.style.zIndex = ''; // Setzt den z-index zurück
}
