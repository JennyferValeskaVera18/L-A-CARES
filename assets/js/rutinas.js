// Función para guardar los valores seleccionados en localStorage
function guardarSeleccion(nombreGrupo, valorSeleccionado) {
    // Guardar los valores en localStorage
    localStorage.setItem(nombreGrupo, valorSeleccionado);
    console.log(`Valor ${valorSeleccionado} de ${nombreGrupo} guardado en localStorage.`);
}

// Obtener los elementos de los radio buttons
const radioTiempo = document.querySelectorAll('input[name="tiempo"]');
const radioPiel = document.querySelectorAll('input[name="piel"]');
const radioRango = document.querySelectorAll('input[name="rango"]');

console.log("Elementos de radio para tiempo:", radioTiempo);
console.log("Elementos de radio para piel:", radioPiel);
console.log("Elementos de raadio para rango:", radioRango);

// Escuchar el evento change en los radio buttons y llamar a la función guardarSeleccion
radioTiempo.forEach(radio => radio.addEventListener('change', () => guardarSeleccion('tiempo', radio.value)));
radioPiel.forEach(radio => radio.addEventListener('change', () => guardarSeleccion('piel', radio.value)));
radioRango.forEach(radio => radio.addEventListener('change', () => guardarSeleccion('rango', radio.value)));


// Cargar datos del JSON y mostrar rutina correspondiente
const listaRutinas = document.querySelector("#listaRutinas");
let rutinasData = [];

fetch('datos.json')
    .then((res) => res.json())
    .then((data) => {
        rutinasData = data;
        console.log("Datos cargados del JSON:", rutinasData);
        mostrarRutina();
    })
    .catch((error) => {
        console.error('Error al cargar los datos:', error);
    });

function mostrarRutina() {
    const tiempoSeleccionado = localStorage.getItem('tiempo');
    const pielSeleccionada = localStorage.getItem('piel');
    const rangoSeleccionado = localStorage.getItem('rango');

    console.log("Tiempo seleccionado desde localStorage:", tiempoSeleccionado);
    console.log("Piel seleccionada desde localStorage:", pielSeleccionada);
    console.log("Rango seleccionado desde localStorage:", rangoSeleccionado);

    // Verificar si los valores obtenidos del localStorage no son null
    if (tiempoSeleccionado && pielSeleccionada && rangoSeleccionado) {
        const rutinaEncontrada = rutinasData.find(rutina => rutina.tiempo === tiempoSeleccionado && rutina.piel === pielSeleccionada && rutina.rango === rangoSeleccionado);

        console.log("Rutina encontrada:", rutinaEncontrada);

        if (rutinaEncontrada) {
            listaRutinas.innerHTML = ""; // Limpiar contenido actual
            const divRutina = document.createElement("div");
            divRutina.classList.add("rutina");

            // Verificar si es una rutina de mañana o de noche
            if (tiempoSeleccionado === 'mañana') {
                // Estructura HTML para rutina de mañana
                divRutina.innerHTML = `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <h2 class="title"> Rutina para ${tiempoSeleccionado} - Piel ${pielSeleccionada} - Rango ${rangoSeleccionado}</h2>
                        <p class="text text-1">Según las características seleccionadas, la rutina ideal para ti es:</p>
                    </div>
                    <div class="col-6 mb-3">
                        <div class="card h-100">
                            <div class="row g-0">
                                <div class="col-4">
                                    <img class="img-rutina" src="${rutinaEncontrada['Limpieza Facial Suave'].img}" alt="Limpieza Facial Suave">            
                                </div>
                                <div class="col-8">
                                    <div class="card-body border-left">
                                        <h5 class="card-title title text-2">Limpieza Facial Suave: ${rutinaEncontrada['Limpieza Facial Suave'].nombre}</h5>
                                        <div class="card-text text text-1">
                                            <p>Descripción: ${rutinaEncontrada['Limpieza Facial Suave'].descripción}</p>
                                            <p>Información: ${rutinaEncontrada['Limpieza Facial Suave'].información}</p>
                                            <div class="container">
                                              <div class="row">
                                                <div class="col-6">
                                                  <p class="boton-precio">Precio: ${rutinaEncontrada['Limpieza Facial Suave'].precio}</p>
                                                </div>
                                                <div class="col-6">
                                                  <a class="text-decoration-none boton-comprar text-dark" href="${rutinaEncontrada['Limpieza Facial Suave'].tienda}" target="_blank">Cómpralo aquí</a>
                                                </div>
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 mb-3">
                        <div class="card h-100">
                            <div class="row g-0">
                                <div class="col-4">
                                    <img class="img-rutina" src="${rutinaEncontrada['Hidratación Intensa'].img}" alt="Hidratación Intensa">
                                </div>
                                <div class="col-8">
                                    <div class="card-body border-left">
                                        <h5 class="card-title title text-2">Hidratación Intensa: ${rutinaEncontrada['Hidratación Intensa'].nombre}</h5>
                                        <div class="card-text text text-1">
                                            <p>Descripción: ${rutinaEncontrada['Hidratación Intensa'].descripción}</p>
                                            <p>Información: ${rutinaEncontrada['Hidratación Intensa'].información}</p>
                                            <div class="container">
                                              <div class="row">
                                                <div class="col-6">
                                                  <p class="boton-precio">Precio: ${rutinaEncontrada['Hidratación Intensa'].precio}</p>
                                                </div>
                                                <div class="col-6">
                                                  <a class="text-decoration-none boton-comprar text-dark" href="${rutinaEncontrada['Hidratación Intensa'].tienda}" target="_blank">Cómpralo aquí</a>
                                                </div>
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 mb-3">
                        <div class="card h-100">
                            <div class="row g-0">
                                <div class="col-4">
                                    <img class="img-rutina" src="${rutinaEncontrada['Tratamiento Reparador'].img}" alt="Tratamiento Reparador">
                                </div>
                                <div class="col-8">
                                    <div class="card-body border-left">
                                        <h5 class="card-title title text-2">Tratamiento Reparador: ${rutinaEncontrada['Tratamiento Reparador'].nombre}</h5>
                                        <div class="card-text text text-1">
                                            <p>Descripción: ${rutinaEncontrada['Tratamiento Reparador'].descripción}</p>
                                            <p>Información: ${rutinaEncontrada['Tratamiento Reparador'].información}</p>
                                            <div class="container">
                                              <div class="row">
                                                <div class="col-6">
                                                  <p class="boton-precio">Precio: ${rutinaEncontrada['Tratamiento Reparador'].precio}</p>
                                                </div>
                                                <div class="col-6">
                                                  <a class="text-decoration-none boton-comprar text-dark" href="${rutinaEncontrada['Tratamiento Reparador'].tienda}" target="_blank">Cómpralo aquí</a>
                                                </div>
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 mb-3">
                        <div class="card h-100">
                            <div class="row g-0">
                                <div class="col-4">
                                    <img class="img-rutina" src="${rutinaEncontrada['Protección Solar Diaria'].img}" alt="Protección Solar Diaria">
                                </div>
                                <div class="col-8">
                                    <div class="card-body border-left">
                                        <h5 class="card-title title text-2">Protección Solar Diaria: ${rutinaEncontrada['Protección Solar Diaria'].nombre}</h5>
                                        <div class="card-text text text-1">
                                            <p>Descripción: ${rutinaEncontrada['Protección Solar Diaria'].descripción}</p>
                                            <p>Información: ${rutinaEncontrada['Protección Solar Diaria'].información}</p>
                                            <div class="container">
                                              <div class="row">
                                                <div class="col-6">
                                                  <p class="boton-precio">Precio: ${rutinaEncontrada['Protección Solar Diaria'].precio}</p>
                                                </div>
                                                <div class="col-6">
                                                  <a class="text-decoration-none boton-comprar text-dark" href="${rutinaEncontrada['Protección Solar Diaria'].tienda}" target="_blank">Cómpralo aquí</a>
                                                </div>
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
                `;
            } else if (tiempoSeleccionado === 'noche') {
                // Estructura HTML para rutina de noche
                if (rutinaEncontrada['Limpieza Facial Suave'] && rutinaEncontrada['Hidratación Intensa'] && rutinaEncontrada['Tratamiento Reparador'] && rutinaEncontrada['Hidratación Adicional (Opcional)']) {
                    divRutina.innerHTML = `
                <div class="nombre-contenedor">
                    <div class="row mt-3">
                        <div class="col-12">
                            <h2 class="videojuego-tittle title">Rutina para ${tiempoSeleccionado} - Piel ${pielSeleccionada} - Rango ${rangoSeleccionado}</h2>
                            <p class="text text-2">Según las características seleccionadas, la rutina ideal para ti es:</p>
                        </div>
                        <div class="col-6 producto mb-3">
                            <div class="card h-100">
                                <div class="row g-0">
                                    <div class="col-4">
                                        <img class="img-rutina" src="${rutinaEncontrada['Limpieza Facial Suave'].img}" alt="Limpieza Facial Suave">            
                                    </div>
                                    <div class="col-8">
                                        <div class="card-body border-left">
                                            <h5 class="card-title title text-2">Limpieza Facial Suave: ${rutinaEncontrada['Limpieza Facial Suave'].nombre}</h5>
                                            <div class="card-text text text-1">
                                                <p>Descripción: ${rutinaEncontrada['Limpieza Facial Suave'].descripción}</p>
                                                <p>Información: ${rutinaEncontrada['Limpieza Facial Suave'].información}</p>
                                                <div class="container">
                                                    <div class="row">
                                                      <div class="col-6">
                                                        <p class="boton-precio">Precio: ${rutinaEncontrada['Limpieza Facial Suave'].precio}</p>
                                                      </div>
                                                      <div class="col-6">
                                                        <a class="text-decoration-none boton-comprar text-dark" href="${rutinaEncontrada['Limpieza Facial Suave'].tienda}" target="_blank">Cómpralo aquí</a>
                                                      </div>
                                                    </div>
                                                  </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 producto mb-3">
                            <div class="card h-100">
                                <div class="row g-0">
                                    <div class="col-4">
                                        <img class="img-rutina" src="${rutinaEncontrada['Hidratación Intensa'].img}" alt="Hidratación Intensa">
                                    </div>
                                    <div class="col-8">
                                        <div class="card-body border-left">
                                            <h5 class="card-title title text-2">Hidratación Intensa: ${rutinaEncontrada['Hidratación Intensa'].nombre}</h5>
                                            <div class="card-text text text-1">
                                                <p>Descripción: ${rutinaEncontrada['Hidratación Intensa'].descripción}</p>
                                                <p>Información: ${rutinaEncontrada['Hidratación Intensa'].información}</p>
                                                <div class="container">
                                                    <div class="row">
                                                      <div class="col-6">
                                                        <p class="boton-precio">Precio: ${rutinaEncontrada['Hidratación Intensa'].precio}</p>
                                                      </div>
                                                      <div class="col-6">
                                                        <a class="text-decoration-none boton-comprar text-dark" href="${rutinaEncontrada['Hidratación Intensa'].tienda}" target="_blank">Cómpralo aquí</a>
                                                      </div>
                                                    </div>
                                                  </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 producto mb-3">
                            <div class="card h-100">
                                <div class="row g-0">
                                    <div class="col-4">
                                        <img class="img-rutina" src="${rutinaEncontrada['Tratamiento Reparador'].img}" alt="Tratamiento Reparador">
                                    </div>
                                    <div class="col-8">
                                        <div class="card-body border-left">
                                            <h5 class="card-title title text-2">Tratamiento Reparador: ${rutinaEncontrada['Tratamiento Reparador'].nombre}</h5>
                                            <div class="card-text text text-1">
                                                <p>Descripción: ${rutinaEncontrada['Tratamiento Reparador'].descripción}</p>
                                                <p>Información: ${rutinaEncontrada['Tratamiento Reparador'].información}</p>
                                                <div class="container">
                                                    <div class="row">
                                                      <div class="col-6">
                                                        <p class="boton-precio">Precio: ${rutinaEncontrada['Tratamiento Reparador'].precio}</p>
                                                      </div>
                                                      <div class="col-6">
                                                        <a class="text-decoration-none boton-comprar text-dark" href="${rutinaEncontrada['Tratamiento Reparador'].tienda}" target="_blank">Cómpralo aquí</a>
                                                      </div>
                                                    </div>
                                                  </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 producto mb-3">
                            <div class="card h-100">
                                <div class="row g-0">
                                    <div class="col-4">
                                        <img class="img-rutina" src="${rutinaEncontrada['Hidratación Adicional (Opcional)'].img}" alt="Protección Solar Diaria">
                                    </div>
                                    <div class="col-8">
                                        <div class="card-body border-left">
                                            <h5 class="card-title title text-2">Hidratación Adicional (Opcional):</h5>
                                            <div class="card-text text text-1">
                                                <p>Nombre: ${rutinaEncontrada['Hidratación Adicional (Opcional)'].nombre}</p>
                                                <p>Descripción: ${rutinaEncontrada['Hidratación Adicional (Opcional)'].descripción}</p>
                                                <p>Información: ${rutinaEncontrada['Hidratación Adicional (Opcional)'].información}</p>
                                                <div class="container">
                                                  <div class="row">
                                                    <div class="col-6">
                                                      <p class="boton-precio">Precio: ${rutinaEncontrada['Hidratación Adicional (Opcional)'].precio}</p>
                                                    </div>
                                                    <div class="col-6">
                                                      <a class="text-decoration-none boton-comprar text-dark" href="${rutinaEncontrada['Hidratación Adicional (Opcional)'].tienda}" target="_blank">Cómpralo aquí</a>
                                                    </div>
                                                  </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                    `;
                } else {
                    listaRutinas.innerHTML = "<p>No se encontró una rutina para los criterios seleccionados.</p>";
                }
            }

            listaRutinas.append(divRutina);
        } else {
            listaRutinas.innerHTML = "<p>No se encontró una rutina para los criterios seleccionados.</p>";
        }
    } else {
        console.error("Al menos uno de los valores obtenidos del localStorage es null.");
    }
}

// Función para abrir o cerrar la ventana emergente
function toggleVentana(idVentana) {
    var ventana = document.getElementById(idVentana);
    if (ventana.style.display === 'block') {
      cerrarVentana(idVentana);
    } else {
      abrirVentana(idVentana);
    }
  }
