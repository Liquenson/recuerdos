let fotos = [];
let indiceActual = 0;
let intervalo;
let reproduciendo = false;

const img = document.getElementById('imagen');
const indicadores = document.getElementById('indicadores');

// Obtener la lista de fotos del servidor
async function cargarFotos() {
    try {
        const response = await fetch('/api/fotos');
        fotos = await response.json();
        mostrarFoto(indiceActual);
        crearIndicadores();
    } catch (error) {
        console.error('Error al cargar las fotos:', error);
    }
}

// Crear indicadores dinámicamente según la cantidad de fotos
function crearIndicadores() {
    indicadores.innerHTML = ''; // Limpiar los indicadores previos
    fotos.forEach((foto, index) => {
        let punto = document.createElement('span');
        punto.classList.add('punto');
        if (index === indiceActual) punto.classList.add('activo');
        indicadores.appendChild(punto);
    });
}

function actualizarIndicadores() {
    const puntos = document.querySelectorAll('.punto');
    puntos.forEach((punto, index) => {
        punto.classList.toggle('activo', index === indiceActual);
    });
}

function mostrarFoto(indice) {
    if (fotos.length > 0) {
        img.style.opacity = '0'; // Hacer la imagen invisible para el efecto de transición
        setTimeout(() => {
            img.src = fotos[indice];
            img.style.opacity = '1'; // Hacer la imagen visible nuevamente
            actualizarIndicadores();
        }, 300);
    }
}

function siguiente() {
    indiceActual = (indiceActual + 1) % fotos.length;
    mostrarFoto(indiceActual);
}

function anterior() {
    indiceActual = (indiceActual - 1 + fotos.length) % fotos.length;
    mostrarFoto(indiceActual);
}

// Pase de diapositivas automático
function togglePlay() {
    if (reproduciendo) {
        clearInterval(intervalo);
        document.getElementById('playPauseBtn').textContent = 'Play';
    } else {
        intervalo = setInterval(siguiente, 2000);
        document.getElementById('playPauseBtn').textContent = 'Pause';
    }
    reproduciendo = !reproduciendo;
}

// Cargar las fotos al cargar la página
cargarFotos();
