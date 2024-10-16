let currentImageIndex1 = 0; // Índice actual del carrusel 1
let currentImageIndex2 = 0; // Índice actual del carrusel 2

function showImage1(index) {
    const images = document.querySelectorAll('#carousel1 .carousel-images img');
    const totalImages = images.length;

    if (index >= totalImages) {
        currentImageIndex1 = 0; // Vuelve a la primera imagen
    } else if (index < 0) {
        currentImageIndex1 = totalImages - 1; // Va a la última imagen
    } else {
        currentImageIndex1 = index;
    }

    const offset = -currentImageIndex1 * 100; // Mueve el contenedor de imágenes
    document.querySelector('#carousel1 .carousel-images').style.transform = `translateX(${offset}%)`;
}

function nextImage1() {
    showImage1(currentImageIndex1 + 1);
}

function prevImage1() {
    showImage1(currentImageIndex1 - 1);
}

function showImage2(index) {
    const images = document.querySelectorAll('#carousel2 .carousel-images img');
    const totalImages = images.length;

    if (index >= totalImages) {
        currentImageIndex2 = 0; // Vuelve a la primera imagen
    } else if (index < 0) {
        currentImageIndex2 = totalImages - 1; // Va a la última imagen
    } else {
        currentImageIndex2 = index;
    }

    const offset = -currentImageIndex2 * 100; // Mueve el contenedor de imágenes
    document.querySelector('#carousel2 .carousel-images').style.transform = `translateX(${offset}%)`;
}

function nextImage2() {
    showImage2(currentImageIndex2 + 1);
}

function prevImage2() {
    showImage2(currentImageIndex2 - 1);
}
