// Speichert die ursprünglichen Positionen und Größen der Container
let initialPositions = [];

document.querySelectorAll('.chart-container').forEach((container, index) => {
    const rect = container.getBoundingClientRect();
    initialPositions[index] = { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
    container.dataset.index = index; // Speichert den Index des Containers
});
