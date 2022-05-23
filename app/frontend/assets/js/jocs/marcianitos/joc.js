import Alien from './alien.js';
//import Jugador from './jugador.js';

const TASA_REFRESC = 20;
const MIDA_ALIENS = 40;
const MIDA_JUGADOR = 60;
const MIDA_TRET = 15;
const MARGE_VERTICAL_GRUP = 50;
const SEPARACIO_COLUMNA = 20 + MIDA_ALIENS;
const SEPARACIO_FILA = 20 + MIDA_ALIENS;
const MOVIMENT_JUGADOR = 2;
const MOVIMENT_BLOC = 10;
const DESCENS_BLOC = 10;
const FREQUENCIA_MOVIMENT_BLOC_INICIAL = TASA_REFRESC;
const VELOCITAT_TRET = 10;
const ALTURA_JUGADOR = 100;




const RUTA_ASSETS = '/app/frontend/assets/';
const RUTA_IMATGES = RUTA_ASSETS + 'img/jocs/marcianitos/';
const RUTA_AUDIO = RUTA_ASSETS + 'audio/jocs/marcianitos/';

let runtimeJoc;
let direccioBloc = 1;
let fotograma = 0;
let frequenciaMovimentBloc = FREQUENCIA_MOVIMENT_BLOC_INICIAL;
let canviarDireccio = false;


$(document).ready(function () {
  window.scrollTo(0, 0);

  let c = document.getElementById("joc-1");
  let ctx = c.getContext('2d');
  var dpr = window.devicePixelRatio || 1;
  ctx.scale(dpr, dpr);
  let imatges = {
    'pacmans': {},
    'fantasmes': {},
  };

  let audio = {
    'alien_mort' : new Audio(RUTA_AUDIO+'alien_mort.wav'),
    'bloc' : {
      'lent' : new Audio(RUTA_AUDIO+'bloc1.wav'),
      'mitja' : new Audio(RUTA_AUDIO+'bloc2.wav'),
      'rapid' : new Audio(RUTA_AUDIO+'bloc3.wav'),
      'molt_rapid' : new Audio(RUTA_AUDIO+'bloc4.wav')
    },
    'jugador_mort' : new Audio(RUTA_AUDIO+'jugador_mort.wav'),
    'nau_extra' : new Audio(RUTA_AUDIO+'nau_extra.wav'),
    'tret' : new Audio(RUTA_AUDIO+'tret.wav'),
  };
  audio.bloc.lent.volume = 0.25;
  audio.bloc.mitja.volume = 0.25;
  audio.bloc.rapid.volume = 0.25;
  audio.bloc.molt_rapid.volume = 0.25;

  let sprites = {
    'aliens': {},
    'jugador' : {
      'x' : (c.width - MIDA_JUGADOR) / 2,
      'y' : c.height - ALTURA_JUGADOR,
      'imatge' : new Image()
    },
    'tret' : {
      'x' : undefined,
      'y' : undefined,
      'imatge' : new Image(),
      'enCurs' : false
    }
  };
  sprites.jugador.imatge.src = RUTA_IMATGES+'jugador.png';
  sprites.tret.imatge.src = RUTA_IMATGES+'tret.svg';

  let imgAliens = [
    new Image(),
    new Image(),
    new Image()
  ];
  imgAliens[0].src = RUTA_IMATGES+'alien1.svg';
  imgAliens[1].src = RUTA_IMATGES+'alien2.svg';
  imgAliens[2].src = RUTA_IMATGES+'alien3.png';

  let tipus = 1;
  let punts = 30;
  for (let i=0; i< 5; i++) {
    if (i >= 1 && i < 3) {
      tipus = 2;
      punts = 20;
    }
    else if (i >= 3) {
      tipus = 3;
      punts = 10;
    }
    for (let j=0; j < 11; j++) {
      sprites.aliens[`${i}-${j}`] = new Alien(j * SEPARACIO_COLUMNA, i * SEPARACIO_FILA + MARGE_VERTICAL_GRUP, punts, tipus);
    }
  }

  //Controls
  $(window).on('keydown', function (key) {
    let codi = key.keyCode;

    if (codi == 32 || codi == 37 || codi == 39) {
      key.preventDefault();
      switch (codi) {
        case 32:
          disparar();
          break;
        case 37:
          moureJugador('R');
          break;
        case 39:
          moureJugador('L');
          break;
      }
    }
  });

  runtimeJoc = setInterval(motor, TASA_REFRESC);

  function motor() {
    if (fotograma % frequenciaMovimentBloc == 0) {
      moureBloc();
    }
    movimentTret();
    colisions();
    dibuixar();
    fotograma++;
  }

  function dibuixar() {
    ctx.clearRect(0, 0, c.width, c.height);
    dibuixarSprites();
    dibuixarPuntuacio();
  }

  function dibuixarSprites() {
    ctx.drawImage(sprites.jugador.imatge, sprites.jugador.x, sprites.jugador.y, MIDA_JUGADOR, MIDA_JUGADOR);
    if (sprites.tret.enCurs !== undefined && sprites.tret.enCurs) {
      ctx.drawImage(sprites.tret.imatge, sprites.tret.x, sprites.tret.y, MIDA_TRET, MIDA_TRET);
    }

    for (let [i, alien] of Object.entries(sprites.aliens)) {
      if (alien.viu) {
        ctx.drawImage(imgAliens[alien.tipus-1], alien.x, alien.y, MIDA_ALIENS, MIDA_ALIENS);
      }
    }
  }

  function dibuixarPuntuacio() {

  }

  function moureBloc(direccio) {
    if (canviarDireccio) {
      for (let [i, alien] of Object.entries(sprites.aliens)) {
        alien.y += DESCENS_BLOC;
      }
      if (frequenciaMovimentBloc > FREQUENCIA_MOVIMENT_BLOC_INICIAL / 2.5) {
        frequenciaMovimentBloc--;
      }
      direccioBloc *= -1;
      dibuixar();
      canviarDireccio = false;
    }

    for (let [i, alien] of Object.entries(sprites.aliens)) {
      alien.x += MOVIMENT_BLOC * direccioBloc;
      if (alien.x >= c.width - MIDA_ALIENS
        || alien.x < 0 + MOVIMENT_BLOC) {
        canviarDireccio = true;
      }
    }

    if (frequenciaMovimentBloc > FREQUENCIA_MOVIMENT_BLOC_INICIAL - FREQUENCIA_MOVIMENT_BLOC_INICIAL / 5) { audio.bloc.lent.play() }
    else if (frequenciaMovimentBloc > FREQUENCIA_MOVIMENT_BLOC_INICIAL / 2.5) { audio.bloc.lent.play() }
    else if (frequenciaMovimentBloc > FREQUENCIA_MOVIMENT_BLOC_INICIAL / 2) { audio.bloc.lent.play() }
    else if (frequenciaMovimentBloc <= FREQUENCIA_MOVIMENT_BLOC_INICIAL / 2) { audio.bloc.molt_rapid.play() }
  }
  function moureJugador(direccio) {
    if (direccio == 'L') {

    }
    else if (direccio == 'R') {

    }
  }

  function disparar() {

    if (sprites.tret.enCurs !== undefined && !sprites.tret.enCurs) {
      sprites.tret.enCurs = true;
      sprites.tret.x = sprites.jugador.x + MIDA_JUGADOR / 2 - 8 ;
      sprites.tret.y = c.height - ALTURA_JUGADOR - 5;

      audio.tret.play();
    }
  }

  function movimentTret() {
    if (sprites.tret.enCurs !== undefined && sprites.tret.enCurs) {
      sprites.tret.y -= VELOCITAT_TRET;
      if (sprites.tret.y < - MIDA_TRET) {
        sprites.tret.enCurs = false;
      }
    }
  }

  function colisions() {
    if (sprites.tret.enCurs !== undefined && sprites.tret.enCurs) {
      for (let [i, alien] of Object.entries(sprites.aliens)) {
        if (alien.viu) {
          let colisioX = sprites.tret.x + MIDA_TRET - 2 > alien.x && sprites.tret.x < alien.x + MIDA_ALIENS - 2;
          let colisioY = sprites.tret.y + MIDA_TRET - 2 > alien.y && sprites.tret.y < alien.y + MIDA_ALIENS - 2;

          if (colisioX && colisioY) {
            alien.viu = false;
            sprites.tret.enCurs = false;
          }
        }
      }
    }
  }

});