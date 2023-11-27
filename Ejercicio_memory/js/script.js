let carta = null;
const contador_aciertos = document.getElementById('contador_aciertos');
const contador_fallos = document.getElementById('contador_fallos');

function compararCarta(cartaNueva) {
    if (carta == null) {
        carta = cartaNueva;
        return;
    }

    if (cartaNueva.attributes['name'].value == carta.attributes['name'].value) {
        carta.classList.add('correcta');
        cartaNueva.classList.add('correcta');
        contador_aciertos.innerHTML++;
    } else {
        carta.classList.remove('girada');
        cartaNueva.classList.remove('girada');
        contador_fallos.innerHTML++;

    }
    carta = null;
}

function girarCarta(cartaNueva) {
    if (!cartaNueva.classList.contains('girada')) {
        cartaNueva.classList.add('girada');
        setTimeout(compararCarta, 500, cartaNueva);
    }
}

document.getElementById('resetButton').addEventListener('click', () => {
    const cartas = document.querySelectorAll('.carta');
    cartas.forEach((carta) => {
        carta.classList.remove('girada', 'correcta');
    });
    contador_aciertos.innerHTML = 0;
    contador_fallos.innerHTML = 0;
});
