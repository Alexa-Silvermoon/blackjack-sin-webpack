/*
CARTAS:
2C = CLUB = TREBOL
2D = DIAMOND = DIAMANTES
2H = HEARTS = CORAZONES
2S = SPADES = PICAS O ESPADAS
*/

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0, puntosComputadora = 0;

//REFERENCIAS DEL HTML
const btnPedir              = document.querySelector('#btnPedir');
const btnDetener            = document.querySelector('#btnDetener');
const puntosHtmlJugador     = document.querySelector('#small-jugador');
const divCartasJugador      = document.querySelector('#jugador-cartas');
const puntosHtmlComputadora = document.querySelector('#small-computadora');
const divCartasComputadora  = document.querySelector('#computadora-cartas');
const btnNuevo              = document.querySelector('#btnNuevo');

//document.querySelector trae lo del html ya sea tags, id, class y lo depositamos en una variable

const crearDeck = () => {
    for(let i = 2;i <= 10; i++){ //2 es donde inician las cartas y van hasta 10 las cartas
        for(let tipo of tipos){ //cada numero del 1 al 10 pasa por cada elemento en el arreglo tipos
            deck.push(i + tipo);
        }
    }

    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo); //cada especial(que vale como numero) va a pasar por cada tipo
        }
    }

    // console.log(deck); // deck ordenado
    deck = _.shuffle(deck);//_.shuffle(deck); lo que hace es varajear el deck al azar https://underscorejs.org/#shuffle
    // https://underscorejs.org/#
    // console.log(deck); //deck al azar gracias a shuffle
    return deck;
}

crearDeck();

const pedirCarta = () => {
    if (deck.length === 0){
        throw 'No hay cartas en el deck';
        console.log('???');
    }

    const carta = deck.pop();
    // console.log(deck);
    // console.log(carta);
    return carta;
}

//pedirCarta();

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length-1); //corta el string desde posicion 0 pero no inclyendo el ultimo elemento

    return (isNaN (valor))?
           (valor  === 'A')? 11 : 10
           : valor * 1;
}

//turno de la computadora
const turnoComputadora = (puntosMinimos) => {

    do{
        const carta = pedirCarta();
        console.log(carta);
        puntosComputadora = puntosComputadora + valorCarta(carta);
        console.log(puntosComputadora);
        puntosHtmlComputadora.innerText = puntosComputadora;
        // <div id="computadora-cartas"> <!-- #computadora-cartas, #jugador-cartas como id en styles.css-->
        // <!-- <img class="carta" src="assets/cartas/2C.png"> <!-- class="carta" en styles.css -->
        const imgCarta = document.createElement('img'); //crear una imagen
        imgCarta.src = `assets/cartas/${ carta }.png`; //ruta de la imagen
        divCartasComputadora.append(imgCarta); //insertar la imagen el la const divCartasJugador que asu vez apunta a #jugador-cartas
        imgCarta.classList.add('carta'); //.class desde sytles.css

        if(puntosMinimos > 21){
            break;
        }
    }while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => { //setTimeOut hace que este bloque se ejecute quinientos milisegundos despues de haber terminado el codigo del juego
            
        if(puntosComputadora === puntosMinimos){
                console.warn('EMPATE');
                alert('EMPATE');
        }else if(puntosMinimos > 21){
                console.warn('Computadora Gana');
                alert('Computadora Gana');
        }else if(puntosComputadora > 21){
                console.warn('Jugador Gana');
                alert('Jugador Gana');
        }else{
                console.warn('Computadora Gana');
                alert('Computadora Gana');
            }
            
    }, 500 ); //quinientos milisegundos, tiempo de retraso
    
}

//EVENTOS
btnPedir.addEventListener('click', () => {
    // console.log('prueba click pedir');
    const carta = pedirCarta();
    console.log(carta);

    puntosJugador = puntosJugador + valorCarta(carta);
    console.log(puntosJugador);
    puntosHtmlJugador.innerText = puntosJugador;
    // puntosHtmlJugador[0].innerText = puntosJugador;

    // <div id="jugador-cartas"> <!-- #computadora-cartas, #jugador-cartas como id en styles.css-->
    // <!-- <img class="carta" src="assets/cartas/2C.png"> <!-- class="carta" en styles.css -->
    const imgCarta = document.createElement('img'); //crear una imagen
    imgCarta.src = `assets/cartas/${ carta }.png`; //ruta de la imagen
    divCartasJugador.append(imgCarta); //insertar la imagen el la const divCartasJugador que asu vez apunta a #jugador-cartas
    imgCarta.classList.add('carta'); //.class desde sytles.css

    if(puntosJugador > 21){
        console.warn('jugador pierde');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador); //puntosJugador entra como argumento puntosMinimos
    }else if(puntosJugador === 21){
        console.warn('21, jugador gana');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }

});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', () => {
    console.clear();

    deck = [];
    deck = crearDeck();
    console.log(deck);

    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHtmlJugador.innerText = 0;
    puntosHtmlComputadora.innerText = 0;

    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
});


// const valor = valorCarta(pedirCarta());
// console.log({valor});

/*
const valorCarta = (carta) => {
    // const valor = carta[0]; //extrae la posicion 0 del string '2D'
    const valor = carta.substring(0, carta.length-1); //corta el string desde posicion 0 pero no inclyendo el ultimo elemento
    console.log({valor});
    if (isNaN(valor)){ //if is not a number?
        //console.log('no es un numero');
        puntos = (valor === 'A')? 11 : 10;
        // si es A entonces vale 11, si es otra letra entonces vale 10, sino es numero


    }else{
        //console.log('es un numero');
        puntos = valor * 1; // *1 covierte el valor en numerico
    }
    console.log(puntos);
}

valorCarta('9D');
*/