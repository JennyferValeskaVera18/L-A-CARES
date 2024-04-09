// Seleccionar elementos del DOM
const wrapper = document.querySelector(".wrapper"), // Contenedor del carrusel
      carousel = document.querySelector(".carousel"), // Carrusel
      firstCardWidth = carousel.querySelector(".card").offsetWidth, // Ancho de la primera tarjeta en el carrusel
      arrowBtns = document.querySelectorAll(".wrapper i"), // Botones de flecha
      carouselChildrens = [...carousel.children]; // Hijos del carrusel

// Variables de control
let isDragging = false, // Indica si se está arrastrando el carrusel
    isAutoPlay = true, // Indica si la reproducción automática está activada
    startX, // Posición inicial del cursor en el eje X
    startScrollLeft, // Posición inicial del desplazamiento horizontal del carrusel
    timeoutId; // Identificador del tiempo de espera para la reproducción automática

// Calcular el número de tarjetas visibles en el carrusel
const cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insertar copias de las últimas tarjetas al principio del carrusel para el desplazamiento infinito
[...carouselChildrens.slice(-cardPerView).reverse(), ...carouselChildrens.slice(0, cardPerView)].forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Ajustes para Firefox: Ocultar copias de las primeras tarjetas al inicio del carrusel
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Agregar escuchadores de eventos para los botones de flecha para desplazar el carrusel izquierda y derecha
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

// Función para el inicio del arrastre
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Registrar la posición inicial del cursor y el desplazamiento del carrusel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

// Función para arrastrar el carrusel
const dragging = (e) => {
    if(!isDragging) return; // Salir de la función si no se está arrastrando
    // Actualizar la posición de desplazamiento del carrusel según el movimiento del cursor
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

// Función para detener el arrastre
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

// Función para el desplazamiento infinito del carrusel
const infiniteScroll = () => {
    // Si el carrusel está al principio o al final, ajustar su posición
    if(carousel.scrollLeft === 0 || Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollLeft ? carousel.offsetWidth : carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // Limpiar el tiempo de espera existente y comenzar la reproducción automática si el mouse no está sobre el carrusel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

// Función para la reproducción automática del carrusel
const autoPlay = () => {
    // Salir si la ventana es más pequeña que 800 o la reproducción automática está desactivada
    if(window.innerWidth < 800 || !isAutoPlay) return;
    // Reproducir automáticamente el carrusel después de cada 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

// Agregar eventos de mouse para el inicio, arrastre y finalización del arrastre, y para el desplazamiento del carrusel
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
// Agregar eventos para detener la reproducción automática cuando el mouse entra y sale del área del carrusel
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
