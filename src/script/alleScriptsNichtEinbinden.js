/*copyToClipboard.js*/
function copyToClipboard(button) {
    const container = button.closest('.chart-container');
    const canvas = container.querySelector('canvas');
    
    if (canvas) {
        canvas.toBlob(blob => {
            const item = new ClipboardItem({ 'image/png': blob });
            navigator.clipboard.write([item]);
            alert("Chart copied to clipboard!");
        });
    } else {
        alert("No chart to copy.");
    }
}

// dragAndDrop.js 

document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".chart-container");

    containers.forEach(container => {
        container.addEventListener("mousedown", handleMouseDown);
        container.addEventListener("touchstart", handleMouseDown, { passive: false });
    });

    function handleMouseDown(e) {
        const container = e.target.closest(".chart-container");

        // Prüfen, ob der Benutzer die rechte untere Ecke greift (für Vergrößerung)
        const isResizing = e.target === container && e.offsetX >= container.offsetWidth - 20 && e.offsetY >= container.offsetHeight - 20;

        if (isResizing) {
            startResize(e, container);
        } else {
            startDrag(e, container);
        }
    }

    function startDrag(e, container) {
        e.preventDefault();
        let offsetX, offsetY;

        if (e.type === "mousedown") {
            offsetX = e.offsetX;
            offsetY = e.offsetY;

            document.addEventListener("mousemove", drag);
            document.addEventListener("mouseup", stopDrag);
        } else if (e.type === "touchstart") {
            const touch = e.touches[0];
            const rect = container.getBoundingClientRect();
            offsetX = touch.clientX - rect.left;
            offsetY = touch.clientY - rect.top;

            document.addEventListener("touchmove", drag, { passive: false });
            document.addEventListener("touchend", stopDrag);
        }

        function drag(e) {
            let x, y;
            if (e.type === "mousemove") {
                x = e.clientX - offsetX;
                y = e.clientY - offsetY;
            } else if (e.type === "touchmove") {
                const touch = e.touches[0];
                x = touch.clientX - offsetX;
                y = touch.clientY - offsetY;
            }

            container.style.left = `${x}px`;
            container.style.top = `${y}px`;
        }

        function stopDrag() {
            document.removeEventListener("mousemove", drag);
            document.removeEventListener("mouseup", stopDrag);
            document.removeEventListener("touchmove", drag);
            document.removeEventListener("touchend", stopDrag);
        }
    }

    function startResize(e, container) {
        e.preventDefault();
        const initialWidth = container.offsetWidth;
        const initialHeight = container.offsetHeight;
        const startX = e.clientX || e.touches[0].clientX;
        const startY = e.clientY || e.touches[0].clientY;

        document.addEventListener("mousemove", resize);
        document.addEventListener("mouseup", stopResize);
        document.addEventListener("touchmove", resize, { passive: false });
        document.addEventListener("touchend", stopResize);

        function resize(e) {
            const currentX = e.clientX || e.touches[0].clientX;
            const currentY = e.clientY || e.touches[0].clientY;

            const newWidth = initialWidth + (currentX - startX);
            const newHeight = initialHeight + (currentY - startY);

            container.style.width = `${newWidth}px`;
            container.style.height = `${newHeight}px`;
        }

        function stopResize() {
            document.removeEventListener("mousemove", resize);
            document.removeEventListener("mouseup", stopResize);
            document.removeEventListener("touchmove", resize);
            document.removeEventListener("touchend", stopResize);
        }
    }
});


// dropdown-btn.js
document.querySelectorAll('.dropdown-btn').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('open');
        const subMenu = button.nextElementSibling;
        if (subMenu.style.maxHeight) {
            subMenu.style.maxHeight = null;
        } else {
            subMenu.style.maxHeight = subMenu.scrollHeight + "px";
        }
    });
});

// initPositions.js
// Speichert die ursprünglichen Positionen und Größen der Container
let initialPositions = [];

document.querySelectorAll('.chart-container').forEach((container, index) => {
    const rect = container.getBoundingClientRect();
    initialPositions[index] = { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
    container.dataset.index = index; // Speichert den Index des Containers
});

// printChart.js
function printChart(button) {
    const container = button.closest('.chart-container');
    const printContent = container.outerHTML;
    const newWindow = window.open('', '_blank');
    newWindow.document.write('<html><head><title>Print Chart</title></head><body>');
    newWindow.document.write(printContent);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    newWindow.print();
}

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


