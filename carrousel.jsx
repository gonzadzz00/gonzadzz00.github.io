let currentSlide = 0;

function moveSlide(direction) {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    const offset = -currentSlide * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}
