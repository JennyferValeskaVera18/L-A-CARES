// Obtener los elementos de los radio buttons
const radioTiempo = document.querySelectorAll('input[name="tiempo"]');
const radioPiel = document.querySelectorAll('input[name="piel"]');
const radioRango = document.querySelectorAll('input[name="rango"]');

// Función para guardar los valores seleccionados en localStorage
function guardarSeleccion() {
    // Obtener el valor seleccionado para cada radio button
    const tiempoSeleccionado = [...radioTiempo].find(radio => radio.checked);
    const pielSeleccionada = [...radioPiel].find(radio => radio.checked);
    const rangoSeleccionado = [...radioRango].find(radio => radio.checked);

    // Guardar los valores en localStorage solo si no son null
    if (tiempoSeleccionado && pielSeleccionada && rangoSeleccionado) {
        localStorage.setItem('tiempo', tiempoSeleccionado.value);
        localStorage.setItem('piel', pielSeleccionada.value);
        localStorage.setItem('rango', rangoSeleccionado.value);
    } else {
        console.error("Al menos uno de los valores seleccionados es null.");
    }
}

// Escuchar el evento change en los radio buttons y llamar a la función guardarSeleccion
radioTiempo.forEach(radio => radio.addEventListener('change', guardarSeleccion));
radioPiel.forEach(radio => radio.addEventListener('change', guardarSeleccion));
radioRango.forEach(radio => radio.addEventListener('change', guardarSeleccion));

// Cargar datos del JSON y mostrar rutina correspondiente
const listaRutinas = document.querySelector("#listaRutinas");
let rutinasData = [];

fetch('datos.json')
    .then((res) => res.json())
    .then((data) => {
        rutinasData = data;
        mostrarRutina();
    })
    .catch((error) => {
        console.error('Error al cargar los datos:', error);
    });

function mostrarRutina() {
    const tiempoSeleccionado = localStorage.getItem('tiempo');
    const pielSeleccionada = localStorage.getItem('piel');
    const rangoSeleccionado = localStorage.getItem('rango');

    // Verificar si los valores obtenidos del localStorage no son null
    if (tiempoSeleccionado && pielSeleccionada && rangoSeleccionado) {
        const rutinaEncontrada = rutinasData.find(rutina => rutina.tiempo === tiempoSeleccionado && rutina.piel === pielSeleccionada && rutina.rango === rangoSeleccionado);

        if (rutinaEncontrada) {
            listaRutinas.innerHTML = ""; // Limpiar contenido actual
            const divRutina = document.createElement("div");
            divRutina.classList.add("rutina");

            // Aquí puedes crear y mostrar los elementos HTML con la información de la rutina
            // Por ejemplo:
            divRutina.innerHTML = `
                <h2>Rutina para ${tiempoSeleccionado} - Piel ${pielSeleccionada} - Rango ${rangoSeleccionado}</h2>
                <p>Limpieza Facial Suave: ${rutinaEncontrada['Limpieza Facial Suave'].nombre}</p>
                <p>Hidratación Intensa: ${rutinaEncontrada['Hidratación Intensa'].nombre}</p>
                <p>Tratamiento Reparador: ${rutinaEncontrada['Tratamiento Reparador'].nombre}</p>
                <p>Protección Solar Diaria: ${rutinaEncontrada['Protección Solar Diaria'].nombre}</p>
            `;

            listaRutinas.append(divRutina);
        } else {
            listaRutinas.innerHTML = "<p>No se encontró una rutina para los criterios seleccionados.</p>";
        }
    } else {
        console.error("Al menos uno de los valores obtenidos del localStorage es null.");
    }
}
