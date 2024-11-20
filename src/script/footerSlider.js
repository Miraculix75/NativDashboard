// footerSlide-InOut-Effekt.js
document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector("footer");
    const banner = document.querySelector(".footer-banner"); // Optional: Falls der Banner separat animiert werden soll

    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            footer.classList.add("visible");
            footer.classList.remove("hidden");

            // Optional: Zusätzliche Animationen für den 3D-Banner
            if (banner) {
                banner.style.animationPlayState = "running";
            }
        } else {
            footer.classList.add("hidden");
            footer.classList.remove("visible");

            // Optional: Animation des Banners pausieren
            if (banner) {
                banner.style.animationPlayState = "paused";
            }
        }
    });
});
