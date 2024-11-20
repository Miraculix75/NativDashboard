
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

