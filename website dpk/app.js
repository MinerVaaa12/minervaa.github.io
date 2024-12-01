document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;
  
    function showNextSlide() {
      
      items[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % items.length; 
      items[currentIndex].classList.add('active');
      carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  
    
    setInterval(showNextSlide, 3000);
  });

  


  