// footerSlide-InOut-Effekt.js
document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector("footer");
    const sliderItems = document.querySelectorAll(".footer-banner .slider .item");
    const quantity = parseInt(getComputedStyle(document.querySelector(".slider")).getPropertyValue("--quantity"));

    // Slide-In/Out für den Footer bei Scrollen
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            footer.classList.add("visible");
            footer.classList.remove("hidden");
        } else {
            footer.classList.add("hidden");
            footer.classList.remove("visible");
        }
    });

    // Setzt die Rotation und Tiefe der Items dynamisch (falls die Anzahl der Items variiert)
    function updateSliderItems() {
    const translateZ = 1000; // Tiefer in den Hintergrund verschieben
    sliderItems.forEach((item, index) => {
        const position = index + 1;
        const angle = (360 / quantity) * (position - 1); // Winkelberechnung
        item.style.transform = `rotateY(${angle}deg) translateZ(${translateZ}px)`;
    });
}

    // Initialisierung der Slider-Positionen
    updateSliderItems();

    // Überwacht Änderungen an der Anzahl der Slider-Items
    const observer = new MutationObserver(() => {
        updateSliderItems();
    });

    observer.observe(document.querySelector(".slider"), { childList: true });
});

document.querySelector(".footer-banner .slider").style.transform = `rotateX(-30deg) rotateY(0deg)`;
