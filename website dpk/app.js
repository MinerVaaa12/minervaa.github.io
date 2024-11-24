// script.js
document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;
  
    function showNextSlide() {
      // Reset all items
      items[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % items.length; // Loop back to first item
      items[currentIndex].classList.add('active');
      carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  
    // Automatically switch slides every 3 seconds
    setInterval(showNextSlide, 3000);
  });
  


  