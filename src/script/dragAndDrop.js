// let isDragging = false;
// let draggedElement = null;

// document.querySelectorAll('.chart-container').forEach(container => {
//     container.addEventListener('mousedown', startDrag);
// });

// function startDrag(event) {
//     if (event.target.closest('.chart-header button')) return; // Verhindert Drag bei Klick auf die Icons
//     isDragging = true;
//     draggedElement = event.currentTarget;
// 	draggedElement.style.zIndex = 1000; // Höherer z-index während des Draggings

//     const offsetX = event.clientX - draggedElement.getBoundingClientRect().left;
//     const offsetY = event.clientY - draggedElement.getBoundingClientRect().top;

//     draggedElement.classList.add('active'); // Erweitert den Container im Drag-Modus
//     draggedElement.style.position = 'fixed';

//     function onMouseMove(event) {
//         if (!isDragging) return;
//         draggedElement.style.left = `${event.clientX - offsetX}px`;
//         draggedElement.style.top = `${event.clientY - offsetY}px`;
//     }

//     function onMouseUp() {
//         isDragging = false;
// 		draggedElement.style.zIndex = ''; // Setzt z-index zurück
//         draggedElement.classList.remove('active');
//         document.removeEventListener('mousemove', onMouseMove);
//         document.removeEventListener('mouseup', onMouseUp);
//         draggedElement = null;
//     }

//     document.addEventListener('mousemove', onMouseMove);
//     document.addEventListener('mouseup', onMouseUp);
// }


// dragAndDrop.js

document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".chart-container");

    containers.forEach(container => {
        container.addEventListener("mousedown", startDrag);
        container.addEventListener("touchstart", startDrag);
    });

    function startDrag(e) {
        e.preventDefault();
        const container = e.target;
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

            document.addEventListener("touchmove", drag);
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
});
