document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector("#autoWidth");
    let isDragging = false;
    let startX;
    let scrollLeft;

    // Mouse Events
    slider.addEventListener("mousedown", (e) => {
        isDragging = true;
        slider.classList.add("dragging");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mousemove", (e) => {
        if (!isDragging) return; // Stop if not dragging
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Adjust the scroll speed
        slider.scrollLeft = scrollLeft - walk;
    });

    slider.addEventListener("mouseup", () => {
        isDragging = false;
        slider.classList.remove("dragging");
    });

    slider.addEventListener("mouseleave", () => {
        isDragging = false;
        slider.classList.remove("dragging");
    });

    // Touch Events for Mobile
    slider.addEventListener("touchstart", (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });

    slider.addEventListener("touchend", () => {
        isDragging = false;
    });
});