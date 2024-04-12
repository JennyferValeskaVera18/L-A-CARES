//1ero selecciono el elemnto DOM con el id "listaVideojuegos" y lo almaceno
const listaProductos = document.querySelector("#todos-productos");
let listaProductosData = []; //Inicializo variable para almacernar lso datos de los juegos

fetch('productos.json') //función fetch para obtener datos
    .then((res) => res.json())
    .then((data) => {
        listaProductosData = data;
        listaProductosData.sort((a, b) => a.nombre.localeCompare(b.nombre));

        // Mostrar videojuegos después de cargar los datos
        listaProductosData.forEach(producto => mostrarProducto(producto));
    })
    .catch((error) => {
        console.error('Error al cargar los datos:', error);
    });

    function mostrarProducto(producto) {
        const div = document.createElement("div");
        div.classList.add("col-6", "producto"); 
        div.innerHTML = `
        <div class="cards-contenedor text-dark">
        <div class="card h-100">
            <div class="row g-0">
                <div class="col-4">
                  <div class="videojuego-thumbnail">
                    <img class="img-api" src="${producto.img}" alt="${producto.nombre}">
                  </div>            
                </div>
                <div class="col-8">
                    <div class="card-body border-left">
                      <div class="card-title nombre-contenedor">
                        <h2 class="nombre">${producto.nombre}</h2>
                      </div>                     
                      <div class="card-text">
                          <div class="videojuego-info">
                            <div class="videojuego-genre">
                              <p class="genre">Descripción: ${producto.descripción}</p>
                            </div>
                            <div class="videojuego-platform">
                              <p class="platform">Tipo de piel: ${producto.piel}</p>
                            </div>
                            <div class="container">
                              <div class="row">
                                <div class="col-6">
                                  <div class="videojuego-release_date">
                                    <p class="release_date">Precio: ${producto.precio}</p>
                                  </div>
                                </div>
                                <div class="col-6">
                                  <div class="game_url">
                                    <a class="game_url" href="${producto.tienda}" target="_blank">Comprar aquí</a>
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
        listaProductos.appendChild(div);
    }
    

const btnGeneros = document.querySelectorAll(".btn-genre"); //selecciono todos los elementos con esa clase y los pongo en una variable

btnGeneros.forEach(btn => {       //MÉTODO por each para iterar sobre los elementos
    btn.addEventListener("click", () => {
        const generoSeleccionado = btn.id; //obtengo el id de cada boton
        if (generoSeleccionado === "ver-todos") {
            mostrarTodosLosProductos();
        } else {
            const productosFiltrados = listaProductosData.filter(producto => producto.tipo.toLowerCase() == generoSeleccionado.toLowerCase());
            //filter para crear un nuevo array llamado juegosFiltrados.Nos aseguramos que lso juegos consiideren lo seleccionado
            listaProductos.innerHTML = ""; //para vaciar el contenido actual del contenedor donde se muestran los videojuegos.
            productosFiltrados.forEach(producto => mostrarProducto(producto));
        }
    });
});

function mostrarTodosLosProductos() {
    listaProductos.innerHTML = "";
    listaProductosData.forEach(producto => mostrarProducto(producto));
}

// Manejo del botón "Buscar"
const btnBuscar = document.getElementById("btnBuscar");
btnBuscar.addEventListener("click", () => {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const productosEncontrados = listaProductosData.filter(producto => producto.nombre.toLowerCase().includes(searchTerm));
    //Lo filtramos para 
    if (productosEncontrados.length > 0) {
        listaProductos.innerHTML = "";
        productosEncontrados.forEach(producto => mostrarProducto(producto));
    } else {
        alert("¡Que triste! No se encontró este producto:( ");
    }
});
