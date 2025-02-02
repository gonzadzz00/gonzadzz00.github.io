let currentImageIndex1 = 0; // Índice actual del carrusel 1
let currentImageIndex2 = 0; // Índice actual del carrusel 2
let currentImageIndex3 = 0; // Índice actual del carrusel 2

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

function showImage3(index) {
    const images = document.querySelectorAll('#carousel3 .carousel-images img');
    const totalImages = images.length;

    if (index >= totalImages) {
        currentImageIndex3 = 0; // Vuelve a la primera imagen
    } else if (index < 0) {
        currentImageIndex3 = totalImages - 1; // Va a la última imagen
    } else {
        currentImageIndex3 = index;
    }

    const offset = -currentImageIndex3 * 100; // Mueve el contenedor de imágenes
    document.querySelector('#carousel3 .carousel-images').style.transform = `translateX(${offset}%)`;
}

function nextImage3() {
    showImage3(currentImageIndex3 + 1);
}

function prevImage3() {
    showImage3(currentImageIndex3 - 1);
}



let lastScrollPosition = 0;
let navbar = document.querySelector('.navbar');
let isScrolling;

// Detectar el desplazamiento del usuario
window.addEventListener('scroll', function () {
    let currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Verificar si estamos en la parte superior de la página
    if (currentScrollPosition === 0) {
        navbar.style.top = "0";  // La barra se muestra en la parte superior y no se oculta
    } 
    // Mostrar la barra si el usuario se desplaza hacia arriba
    else if (currentScrollPosition < lastScrollPosition) {
        navbar.style.top = "0";  // La barra se muestra
    } 
    // Ocultar la barra si el usuario se desplaza hacia abajo
    else if (currentScrollPosition > lastScrollPosition) {
        navbar.style.top = "-80px";  // La barra desaparece
    }

    // Guardar la posición de desplazamiento
    lastScrollPosition = currentScrollPosition;

    // Ocultar la barra después de 3 segundos de inactividad, solo si no estamos en la parte superior
    if (currentScrollPosition > 0) {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(function () {
            if (window.pageYOffset > 0) {
                navbar.style.top = "-80px";  // La barra se oculta si no hay scroll y no estamos en la parte superior
            }
        }, 3000);  // Tiempo de espera para ocultar la barra
    }
});

// Mostrar la barra de navegación cuando el usuario pase el mouse sobre ella
navbar.addEventListener('mouseenter', function () {
    navbar.style.top = "0";  // La barra se muestra al hacer hover
});

// Ocultar la barra cuando el usuario retire el mouse y no esté haciendo scroll
navbar.addEventListener('mouseleave', function () {
    if (window.pageYOffset > 0) {
        navbar.style.top = "-80px";  // La barra se oculta cuando el mouse se retira y no estamos en el tope
    }
});




