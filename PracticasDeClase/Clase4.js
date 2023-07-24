function fin() { console.log("Ya terminé de mostrar las letras del string ingresado"); }

function mostrarLetras(letras, terminar) {
    let contador = 0

    let repetidor = setInterval(() => {
        console.log(letras[contador])
        contador++

        if (contador === letras.length) {
            clearInterval(repetidor)
            terminar()
        }
    }, 1000);
}

setTimeout(() => {
    mostrarLetras("¡hola!", fin)
}, 0);

setTimeout(() => {
    mostrarLetras("¡HOLA!", fin)
}, 250);

setTimeout(() => {
    mostrarLetras("¡Hola!", fin)
}, 500);