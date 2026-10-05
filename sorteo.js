let numeroSeleccionado = null;

let participantes = [];

const contenedorNumeros = document.getElementById("numeros");
const nombreInput = document.getElementById("nombreCompleto");
const mensaje = document.getElementById("mensaje");


// CREAR LOS 100 NUMEROS

for (let i = 1; i <= 100; i++) {

    const boton = document.createElement("button");

    boton.classList.add("numero");

    boton.textContent = i;

    boton.onclick = function () {

        // Si ya está ocupado, no se puede elegir
        if (boton.classList.contains("ocupado")) {
            return;
        }

        // Quitar selección anterior
        document.querySelectorAll(".numero").forEach(numero => {
            numero.classList.remove("seleccionado");
        });

        // Seleccionar nuevo número
        boton.classList.add("seleccionado");

        numeroSeleccionado = i;

        mostrarMensaje(
            "Número " + i + " seleccionado.",
            "exito"
        );
    };

    contenedorNumeros.appendChild(boton);
}


// PARTICIPAR

function participar() {

    const nombre = nombreInput.value.trim();

    if (nombre === "") {

        mostrarMensaje(
            "Por favor, ingresá tu nombre completo.",
            "error"
        );

        return;
    }

    if (numeroSeleccionado === null) {

        mostrarMensaje(
            "Primero tenés que elegir un número.",
            "error"
        );

        return;
    }

    // Comprobar si el número ya está ocupado
    const numeroOcupado = participantes.some(
        persona => persona.numero === numeroSeleccionado
    );

    if (numeroOcupado) {

        mostrarMensaje(
            "Ese número ya está ocupado.",
            "error"
        );

        return;
    }


    // Guardar participante

    participantes.push({
        nombre: nombre,
        numero: numeroSeleccionado
    });


    // Marcar número como ocupado

    const botones = document.querySelectorAll(".numero");

    botones.forEach(boton => {

        if (parseInt(boton.textContent) === numeroSeleccionado) {

            boton.classList.remove("seleccionado");

            boton.classList.add("ocupado");

            boton.disabled = true;
        }

    });


    mostrarMensaje(
        "¡Listo, " + nombre + "! Tu número es el " +
        numeroSeleccionado + ".",
        "exito"
    );


    // Limpiar formulario

    nombreInput.value = "";

    numeroSeleccionado = null;
}


// MOSTRAR PARTICIPANTES

function mostrarParticipantes() {

    const ventana =
        document.getElementById("listaParticipantes");

    const lista =
        document.getElementById("lista");

    lista.innerHTML = "";


    if (participantes.length === 0) {

        lista.innerHTML =
            '<div class="sinParticipantes">' +
            'Todavía no hay participantes.' +
            '</div>';

    } else {

        participantes.forEach(persona => {

            const div = document.createElement("div");

            div.classList.add("persona");

            div.innerHTML = `
                <span class="nombre">
                    ${persona.nombre}
                </span>

                <span class="numeroElegido">
                    Nº ${persona.numero}
                </span>
            `;

            lista.appendChild(div);
        });
    }


    ventana.classList.remove("oculto");

    ventana.scrollIntoView({
        behavior: "smooth"
    });
}


// CERRAR PARTICIPANTES

function cerrarParticipantes() {

    document
        .getElementById("listaParticipantes")
        .classList.add("oculto");
}


// MOSTRAR MENSAJES

function mostrarMensaje(texto, tipo) {

    mensaje.textContent = texto;

    mensaje.className = "mensaje " + tipo;

    setTimeout(() => {

        mensaje.className = "mensaje";

    }, 3000);
}