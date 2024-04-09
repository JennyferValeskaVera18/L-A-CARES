var imagenes = [
    ["https://i.ibb.co/1Xf3wCq/1.png", 
    "https://i.ibb.co/f8dtyBZ/2.png", 
    "https://i.ibb.co/5Td1Bt2/3.png", 
    "https://i.ibb.co/86Dgf5P/4.png"
    ],
    ["https://i.ibb.co/9yFjWbf/5.png", 
    "https://i.ibb.co/dt6wY7t/6.png", 
    "https://i.ibb.co/b5LfQZd/7.png", 
    "https://i.ibb.co/SB3f4jB/8.png"],
    ["https://i.ibb.co/kD2s9cR/porc1.png", 
    "https://i.ibb.co/GPv98zV/porc2.png",
    "https://i.ibb.co/gMf7ntP/porc3.png",
    "https://i.ibb.co/9GLCTfN/porc-4.png"],
    ["https://i.ibb.co/kD2s9cR/porc1.png", 
    "https://i.ibb.co/GPv98zV/porc2.png",
    "https://i.ibb.co/gMf7ntP/porc3.png",
    "https://i.ibb.co/9GLCTfN/porc-4.png"],
    
];

var pasos = [
    "PASO 1",
    "PASO 2",
    "PASO 3",
    "PASO 4"
];

var preguntas = [
    "Lávese la cara con un limpiador suave y espere de 15 a 30 minutos. Haga clic en el icono que coincida con lo que ve.",
    "¿Cuál es tu principal preocupación? ó </br> ¿Con cuál te sientes más identificada? ",
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
    div.innerHTML += `
            <div class="row">
                <div class="col-md-1 justify-content-start">
                    <h4 class='text text-3 mt-3'>RESULTADOS:</h4>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-12">
                    <h4 class='resultado_titulo text-6 title'>¡FELICIDADES!</h4>
                </div>
            </div>
    `;
    // Evaluamos el estilo de vida según el puntaje
    if (puntaje >= 20) {
        resultado = "<span id='grasa'>PIEL GRASA</span>";
    } else if (puntaje >= 15) {
        resultado = "<span id='mixta'>PIEL MIXTA</span>";
    }else if( puntaje >= 10) {
        resultado = "<span id='normal'>PIEL NORMAL</span>";
    }else {
        resultado = "<span id='seca'>PIEL SECA</span>";
    }

    div.innerHTML += `
    <div class="container-resultado text-3">
        <div class="row">
            <div class="col-md-12 title">
                <p class='resultado_obtenido p-2 px-4 mr-4 text' id="resultado1">Ahora conoces que tu tipo de piel es:</p>
                <p class='resultado_obtenido piel-color text-4' id="resultado2"><span id="resultado">${resultado}</span>.</p>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-12 text m-3">
                <p>¡Gracias por completar el LÚA CARES - TEST! Recuerda, cada tipo de piel es hermoso y único. No importa cuál sea tu resultado, estamos aquí para ayudarte a cuidar tu piel y hacerla brillar. Juntos, podemos lograr una piel radiante y saludable que te haga sentir seguro/a y feliz. ¡Estamos aquí para ti!</p>
            </div>
        </div>
        <div class="row justify-content-center mt-4">
            <div class="col-md-4 mi-boton p-2 mx-3">
                <a href="test.html" class="btn primer-boton btn-animate text p-2 pt-2 text-3">QUIERO VOLVER A HACER EL TEST</a>
            </div>
            <div class="col-md-4 mi-boton p-2 mx-3">
                <a href="rutinas.html" class="btn segundo-boton btn-animate text p-2 pt-2 text-3">AHORA QUIERO UNA RUTINA</a>
            </div>
        </div>
    </div>
  `;

  // Código para la animación del segundo resultado obtenido
  const resultado2Element = document.getElementById('resultado2');

  const resultado2Animation = resultado2Element.animate(
    [
      { transform: 'translateX(-50%) scale(1)', opacity: 0 },
      { transform: 'translateX(0%) scale(1)', opacity: 1 }
    ],
    { duration: 990, fill: 'forwards' }
  );
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
