//1ero selecciono el elemnto DOM con el id "listaVideojuegos" y lo almaceno
const listaVideojuegos = document.querySelector("#todos-productos");
let listaVideojuegosData = []; //Inicializo variable para almacernar lso datos de los juegos

fetch('datos.json') //funvión fetch para obtener datos
    .then((res) => res.json())
    .then((data) => {
        listaVideojuegosData = data;
        listaVideojuegosData.sort((a, b) => a.title.localeCompare(b.title));
        // Mostrar videojuegos después de cargar los datos
        listaVideojuegosData.forEach(videojuego => mostrarVideojuego(videojuego));
    })
    .catch((error) => {
        console.error('Error al cargar los datos:', error);
    });

function mostrarProducto(producto) {
    const div = document.createElement("div");
    div.classList.add("producto");  //Abajo con inner.HTMl se estabalece que irá dentro del div
    div.innerHTML = `   
            <div class="nombre-contenedor">
                <h2 class="nombre">${nombre}</h2>
            </div> 
            <div class="videojuego-thumbnail">
                <img src="${videojuego.thumbnail}" alt="${videojuego.title}">
            </div>
            <div class="videojuego-info">
                <div class="videojuego-genre">
                    <p class="genre">Género: ${videojuego.genre}</p>
                </div>
                <div class="videojuego-platform">
                    <p class="platform">Plataforma: ${videojuego.platform}</p>
                </div>
                <div class="videojuego-release_date">
                    <p class="release_date">Lanzamiento: ${videojuego.release_date}</p>
                </div>
                <div class="game_url">
                <a class="game_url" href="${videojuego.game_url}" target="_blank">Jugar aquí</a>
                </div>
            </div>
    `;
    listaVideojuegos.append(div);
}

const btnGeneros = document.querySelectorAll(".btn-genre"); //selecciono todos los elementos con esa clase y los pongo en una variable

btnGeneros.forEach(btn => {       //MÉTODO por each para iterar sobre los elementos
    btn.addEventListener("click", () => {
        const generoSeleccionado = btn.id.replace("-", " "); //obtengo el id de cada boton
        if (generoSeleccionado === "ver todos") {
            mostrarTodosLosVideojuegos();
        } else {
            const juegosFiltrados = listaVideojuegosData.filter(videojuego => videojuego.genre.toLowerCase() == generoSeleccionado.toLowerCase());
            //filter para crear un nuevo array llamado juegosFiltrados.Nos aseguramos que lso juegos consiideren lo seleccionado
            listaVideojuegos.innerHTML = ""; //para vaciar el contenido actual del contenedor donde se muestran los videojuegos.
            juegosFiltrados.forEach(videojuego => mostrarVideojuego(videojuego));
        }
    });
});

function mostrarTodosLosVideojuegos() {
    listaVideojuegos.innerHTML = "";
    listaVideojuegosData.forEach(videojuego => mostrarVideojuego(videojuego));
}

// Manejo del botón "Buscar"
const btnBuscar = document.getElementById("btnBuscar");
btnBuscar.addEventListener("click", () => {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const juegosEncontrados = listaVideojuegosData.filter(videojuego => videojuego.title.toLowerCase().includes(searchTerm));
    //Lo filtramos para 
    if (juegosEncontrados.length > 0) {
        listaVideojuegos.innerHTML = "";
        juegosEncontrados.forEach(videojuego => mostrarVideojuego(videojuego));
    } else {
        alert("¡Que triste! No se encontró ese videojuego:( ");
    }
});