var imagenes = [
    ["https://www.paulaschoice.com/on/demandware.static/-/Library-Sites-paulachoice/default/dw0fae9daf/images/quiz/1_Dry.jpg", 
    "https://www.paulaschoice.com/on/demandware.static/-/Library-Sites-paulachoice/default/dw7ee69eb0/images/quiz/1_Oily.jpg", 
    "https://www.paulaschoice.com/on/demandware.static/-/Library-Sites-paulachoice/default/dw8925484f/images/quiz/1_Combo.jpg", 
    "https://www.paulaschoice.com/on/demandware.static/-/Library-Sites-paulachoice/default/dw5f514fbe/images/quiz/1_Normal.jpg"
    ],
    ["https://www.paulaschoice.com/on/demandware.static/-/Library-Sites-paulachoice/default/dwc7c0dd51/images/quiz/acne.jpg", 
    "https://www.paulaschoice.com/on/demandware.static/-/Library-Sites-paulachoice/default/dw4066c95e/images/quiz/aging.jpg", 
    "https://www.paulaschoice.com/on/demandware.static/-/Library-Sites-paulachoice/default/dwd249b290/images/quiz/uneven.jpg", 
    "https://www.paulaschoice.com/on/demandware.static/-/Library-Sites-paulachoice/default/dwa22c01d7/images/quiz/sensitive.jpg"],
    ["assets/img/porc1.jpg", 
    "assets/img/porc2.jpg",
    "assets/img/porc3.jpg",
    "assets/img/porc4.jpg"],

    ["assets/img/porc1.jpg", 
    "assets/img/porc2.jpg",
    "assets/img/porc3.jpg",
    "assets/img/porc4.jpg"]
    
];
var pasos = [
    "PASO 1",
    "PASO 2",
    "PASO 3",
    "PASO 4"
];

var preguntas = [
    "Lávese la cara con un limpiador suave y espere de 15 a 30 minutos. Haga clic en el icono que coincida con lo que ve.",
    "¿Cuál es tu principal preocupación? o ¿Con cuál te sientes más identificada? ",
    "¿Qué tan a menudo sientes la necesidad de aplicar crema hidratante durante el día?",
    "¿Cómo reacciona tu piel ante los productos nuevos o diferentes?"
]
var opciones = [
    ["Se siente tenso y deshidratado . Algunas zonas escamosas.", "Luce brillante y se siente resbaladizo al tacto.", "Parece seco en algunas zonas, pero brillante en otras. Particularmente la zona T (frente, nariz y mentón)", "Se siente suave , equilibrado y saludable "],
    ["Brotes , puntos negros o poros obstruidos", "Envejecimiento , pérdida de firmeza o arrugas", "Tono de piel desigual o decoloración.", "Enrojecimiento o sensibilidad"],
    ["Casi siempre, mi piel se siente muy seca.", "A veces, dependiendo del clima o la temporada.", "Raramente, mi piel tiende a ser equilibrada.", "Nunca, mi piel es naturalmente grasa."],
    ["Frecuentemente se irrita o se enrojece.", "A veces presenta irritación, pero desaparece rápidamente.", "Rara vez experimenta irritación.", "Nunca experimenta irritación."],
];

var puntajePorOpcion = [
    [1, 4, 3, 2],
    [4, 3, 2, 1],
    [1, 2, 3, 4],
    [1, 2, 3, 4],
];

// Necesitamos saber en qué imagen estamos y la opción seleccionada
var puntaje = 0;
var i = 0;

function mostrarPregunta() {
    // Cargamos los pasos
    document.getElementById("pasos").innerHTML = pasos[i];
    // Cargamos la pregunta
    document.getElementById("pregunta").innerHTML = preguntas[i];
    // Cargamos la imagen
    document.getElementById("img1").src = imagenes[i][0];
    document.getElementById("img2").src = imagenes[i][1];
    document.getElementById("img3").src = imagenes[i][2];
    document.getElementById("img4").src = imagenes[i][3];
    // Cargamos las opciones
    document.getElementById("op1").innerHTML = opciones[i][0];
    document.getElementById("op2").innerHTML = opciones[i][1];
    document.getElementById("op3").innerHTML = opciones[i][2];
    document.getElementById("op4").innerHTML = opciones[i][3];
    // Actualizamos la barra de progreso
    document.getElementById("barra-progreso").value = (i + 1) * 100 / imagenes.length;
}

function mostrarResultado() {
    // Limpiamos el tablero de juego
    var div = document.getElementById("tablero");
    div.innerHTML = "";



    // Agregamos los elementos
    div.innerHTML += "<h3 class='resultado_titulo'>RESULTADOS</h3>";

    // Evaluamos el estilo de vida según el puntaje

    div.innerHTML += "<h3 class='resultado_titulo'>Estos son tus resultados:</h3>";

    if (puntaje >= 20) {
        resultado = "<span id='grasa'>PIEL GRASA</span>";
    } else if (puntaje >= 15) {
        resultado = "<span id='mixta'>PIEL MIXTA</span>";
    }else if( puntaje >= 10) {
        resultado = "<span id='normal'>PIEL NORMAL</span>";

    }else {
        resultado = "<span id='seca'>PIEL SECA</span>";
    }

    div.innerHTML += `<p class='resultado_obtenido'>¡FELICIDADES! Ahora conoces que tu tipo de piel es: ${resultado}.</p>`;
}

function actualizarPuntaje(opcion) {
    puntaje += puntajePorOpcion[i][opcion];
    i++;
    if (i < imagenes.length) {
        mostrarPregunta();
    } else {
        mostrarResultado();
    }
}

// Esto se ejecuta una vez apenas carga el archivo
mostrarPregunta();

// Se ejecuta constantemente al hacer clic en una opción
document.getElementById("op1").addEventListener("click", function () {
    actualizarPuntaje(0);
});
document.getElementById("op2").addEventListener("click", function () {
    actualizarPuntaje(1);
});
document.getElementById("op3").addEventListener("click", function () {
    actualizarPuntaje(2);
});
document.getElementById("op4").addEventListener("click", function () {
    actualizarPuntaje(3);
});