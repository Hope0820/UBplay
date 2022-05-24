import Alien from './alien.js';
import {fiJoc} from "../general/general.js";

const TASA_REFRESC = 20;
const MIDA_ALIENS = 35;
const MIDA_JUGADOR = 60;
const MIDA_NAU_EXTRA = 60;
const MIDA_TRET_JUGADOR = 15;
const MIDA_TRET_ALIEN = 4;
const MARGE_VERTICAL_GRUP = 120;
const SEPARACIO_COLUMNA = 20 + MIDA_ALIENS;
const SEPARACIO_FILA = 10 + MIDA_ALIENS;
const MOVIMENT_JUGADOR = 5;
const MOVIMENT_BLOC = 20;
const MOVIMENT_NAU_EXTRA = 4;
const DISTANCIA_DESCENS_BLOC = 20;
const FREQUENCIA_MOVIMENT_BLOC_INICIAL = 20;
const INCREMENTS_VELOCITAT_BLOC = FREQUENCIA_MOVIMENT_BLOC_INICIAL;
const VELOCITAT_TRET_JUGADOR = 15;
const PROBABILITAT_TRET_ALIEN = 5;
const VELOCITAT_TRET_ALIEN = 4;
const PROBABILITAT_NAU_EXTRA = 4;
const DURACIO_MORT_ALIEN = 10;
const DURACIO_MORT_NAU_EXTRA = 40;
const ALTURA_JUGADOR = 100;
const ALTURA_NAU_EXTRA = 60;
const PUNTS_NAU_EXTRA = 300;
const COLUMNES_ALIENS = 11;
const FILES_ALIENS_TIPUS1 = 1;
const FILES_ALIENS_TIPUS2 = 2;
const FILES_ALIENS_TIPUS3 = 2;
const SUMA_FILES = FILES_ALIENS_TIPUS1 + FILES_ALIENS_TIPUS2 + FILES_ALIENS_TIPUS3;
const LINIA_OFFSET = -10;

const RUTA_ASSETS = '/app/frontend/assets/';
const RUTA_IMATGES = RUTA_ASSETS + 'img/jocs/marcianitos/';
const RUTA_AUDIO = RUTA_ASSETS + 'audio/jocs/marcianitos/';

let runtimeJoc;
let videsJugador = 3;
let puntuacio = 0;
let puntuacioSessio = 0;
let recordPuntuacio = 0;
let direccioBloc = 1;
let direccioJugador = 0;
let fotograma = 0;
let tickBloc = FREQUENCIA_MOVIMENT_BLOC_INICIAL;
let frequenciaMovimentBloc = FREQUENCIA_MOVIMENT_BLOC_INICIAL;
let numDescens = 0;
let canviarDireccio = false;
let canviarDireccioRecent = true;
let alternadorAudioTret = 0;
let alternadorAudioBloc = 0;
let alternadorAudioMortJugador = 0;
let alienTipus1Vius = {};
let ultimFotogramaTretAlien = 0;
let ultimFotogramaNauExtra = 0;

$(document).ready(function () {
  window.scrollTo(0, 0);

  let c = document.getElementById("joc-1");
  let ctx = c.getContext('2d');
  ctx.fillStyle = '#fff'
  recordPuntuacio = c.getAttribute('record');
  var dpr = window.devicePixelRatio || 1;
  ctx.scale(dpr, dpr);

  let imatges = {
    'pacmans': {},
    'fantasmes': {},
  };

  let audio = {
    'alienMort' : new Audio(RUTA_AUDIO+'alien_mort.wav'),
    'bloc' : {
      'lent' : new Audio(RUTA_AUDIO+'bloc1.wav'),
      'mitja' : new Audio(RUTA_AUDIO+'bloc2.wav'),
      'rapid0' : new Audio(RUTA_AUDIO+'bloc3.wav'),
      'rapid1' : new Audio(RUTA_AUDIO+'bloc3.wav')
    },
    'jugadorMort0' : new Audio(RUTA_AUDIO+'jugador_mort.wav'),
    'jugadorMort1' : new Audio(RUTA_AUDIO+'jugador_mort.wav'),
    'nauExtra' : new Audio(RUTA_AUDIO+'nau_extra.wav'),
    'tret0' : new Audio(RUTA_AUDIO+'tret.wav'),
    'tret1' : new Audio(RUTA_AUDIO+'tret.wav')
  };
  audio.bloc.lent.volume = 0.25;
  audio.bloc.mitja.volume = 0.25;
  audio.bloc.rapid0.volume = 0.25;
  audio.bloc.rapid1.volume = 0.25;
  audio.alienMort.volume = 0.25;
  audio.jugadorMort0.volume = 0.25;
  audio.jugadorMort1.volume = 0.25;
  audio.nauExtra.volume = 0.1;

  let sprites = {
    'aliens': {},
    'jugador' : {
      'x' : 0,
      'y' : c.height - ALTURA_JUGADOR,
      'imatge' : new Image()
    },
    'nauExtra' : {
      'x' : 0,
      'enCurs': false,
      'direccio' : 0,
      'morts' : 0,
      'imatge' : new Image(),
      'punts' : 0,
      'duracioMort' : 0
    },
    'tretJugador' : {
      'x' : undefined,
      'y' : undefined,
      'imatge' : new Image(),
      'enCurs' : false
    },
    'tretsAlien' : [
      {
        'x' : undefined,
        'y' : undefined,
        'etapa' : 0,
        'direccioEtapa' : 1,
        'enCurs' : false
      },
      {
        'x' : undefined,
        'y' : undefined,
        'etapa' : 0,
        'direccioEtapa' : 1,
        'enCurs' : false
      },
      {
        'x' : undefined,
        'y' : undefined,
        'etapa' : 0,
        'direccioEtapa' : 1,
        'enCurs' : false
      }
    ]
  };
  sprites.jugador.imatge.src = RUTA_IMATGES+'jugador.png';
  sprites.tretJugador.imatge.src = RUTA_IMATGES+'tret_jugador.svg';
  sprites.nauExtra.imatge.src = RUTA_IMATGES+'nau_extra.svg';
  inicialitzarJugador();

  let imgAliens = [
    new Image(),
    new Image(),
    new Image(),
    new Image()
  ];
  imgAliens[0].src = RUTA_IMATGES+'alien1.svg';
  imgAliens[1].src = RUTA_IMATGES+'alien2.svg';
  imgAliens[2].src = RUTA_IMATGES+'alien3.png';
  imgAliens[3].src = RUTA_IMATGES+'alien_mort.svg';

  poblarAliens();

  //Controls
  $(window).on('keydown keyup', function (key) {
    let codi = key.keyCode;
    let event = key.type;

    if (codi == 37 || codi == 39) {
      key.preventDefault();
      switch (codi) {
        case 37:
          if (event == 'keydown' && direccioJugador != -1 ) {
            direccioJugador = -1;
          }
          if (event == 'keyup' && direccioJugador != 0  && direccioJugador == -1) {
            direccioJugador = 0;
          }
          break;
        case 39:
          if (event == 'keydown' && direccioJugador != 1) {
            direccioJugador = 1;
          }
          if (event == 'keyup' && direccioJugador != 0 && direccioJugador == 1) {
            direccioJugador = 0;
          }
          break;
      }
    }
  });
  $(window).on('keypress', function (key) {
    let codi = key.keyCode;

    if (codi == 32 || codi == 13) {
    key.preventDefault();
    switch (codi) {
      case 32:
        tretJugador();
        break;
      case 13:
        $('.jugar-partida').trigger('click');
        break;
      }
    }
  });

  function motor() {
    fotograma++;
    //TODO ARREGLAR BAIXADES EXAGERADES
    if (tickBloc == frequenciaMovimentBloc) { moureBloc(); }
    else { tickBloc++; }
    if (direccioJugador != 0) { moureJugador(); }
    nauExtra();
    tretAlien();
    movimentTrets();
    colisions();
    dibuixar();
  }

  function dibuixar() {
    ctx.clearRect(0, 0, c.width, c.height);
    dibuixarSprites();
    dibuixarPuntuacio();
  }

  function dibuixarSprites() {
    ctx.drawImage(sprites.jugador.imatge, sprites.jugador.x, sprites.jugador.y, MIDA_JUGADOR, MIDA_JUGADOR);

    if (sprites.tretJugador.enCurs !== undefined && sprites.tretJugador.enCurs) {
      ctx.drawImage(sprites.tretJugador.imatge, sprites.tretJugador.x, sprites.tretJugador.y, MIDA_TRET_JUGADOR, MIDA_TRET_JUGADOR);
    }

    let unViu = false
    for (let [i, alien] of Object.entries(sprites.aliens)) {
      if (alien.viu) {
        ctx.drawImage(imgAliens[alien.tipus-1], alien.x, alien.y, MIDA_ALIENS, MIDA_ALIENS);
        if (!unViu) { unViu = true; }
      } else if (alien.duracioMort > 0) {
        alien.duracioMort--;
        ctx.drawImage(imgAliens[3], alien.x, alien.y, MIDA_ALIENS, MIDA_ALIENS);
      }
    }
    for (let i=0; i<sprites.tretsAlien.length; i++) {
      let tret_alien = sprites.tretsAlien[i];
      if (tret_alien.enCurs) {
        ctx.fillStyle = "#fff";
        ctx.fillRect(tret_alien.x, tret_alien.y, 0.8 * MIDA_TRET_ALIEN, 6 * MIDA_TRET_ALIEN);
        ctx.fillRect(tret_alien.x - MIDA_TRET_ALIEN, tret_alien.y + tret_alien.etapa * 4, 3 * MIDA_TRET_ALIEN, 1 * MIDA_TRET_ALIEN);
        if (fotograma % 5 == 0) {
          tret_alien.etapa += tret_alien.direccioEtapa;
          if (tret_alien.etapa > 4 || tret_alien.etapa < 1) { tret_alien.direccioEtapa *= -1; }
        }
      }
    }
    if (sprites.nauExtra.enCurs) {
      ctx.drawImage(sprites.nauExtra.imatge, sprites.nauExtra.x, ALTURA_NAU_EXTRA, MIDA_NAU_EXTRA, MIDA_NAU_EXTRA);
    }
    else if (!sprites.nauExtra.enCurs && sprites.nauExtra.duracioMort > 0) {
      ctx.fillStyle = "#f00";
      ctx.font = "16px visitor1";
      ctx.fillText(sprites.nauExtra.punts, sprites.nauExtra.x + MIDA_NAU_EXTRA / 2 - 10, ALTURA_NAU_EXTRA + MIDA_NAU_EXTRA / 4 + 20);
      sprites.nauExtra.duracioMort--;
    }

    //Si no hi ha cap viu, ha guanyat el jugador
    if (!unViu) { fi('victoria'); }

    //Linea que marca la derrota
    ctx.strokeStyle = "rgba(79,79,79,0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, c.height - ALTURA_JUGADOR + LINIA_OFFSET);
    ctx.lineTo(c.width, c.height - ALTURA_JUGADOR + LINIA_OFFSET);
    ctx.stroke();
  }

  function dibuixarPuntuacio() {
    ctx.fillStyle = "#fff";
    ctx.font = "24px visitor1";
    ctx.fillText("Puntuacio", 0, 25);
    ctx.fillText(puntuacio, 0, 45);
    ctx.fillText("Sessió/Record", c.width / 2 - 80, 25);
    ctx.fillText(puntuacioSessio+"/"+recordPuntuacio, c.width / 2 - 80, 45);
    ctx.fillText("Vides", c.width - 65, 25);
    ctx.fillText(videsJugador, c.width - 65, 45);
  }

  function moureBloc() {
    tickBloc = 0;
    for (let [i, alien] of Object.entries(sprites.aliens)) {
      if (alien.tipus == 1 && alien.viu) {
        alienTipus1Vius[i] = alien;
      }
      if (!canviarDireccioRecent && !canviarDireccio && ((alien.x > c.width - MIDA_ALIENS - MOVIMENT_BLOC && direccioBloc == 1)
        || (alien.x - MOVIMENT_BLOC < 0 && direccioBloc == -1))) {
        canviarDireccio = true;
      }
    }
    if (canviarDireccioRecent) { canviarDireccioRecent = false; }
    if (canviarDireccio) {
      direccioBloc *= -1;
      canviarDireccioRecent = true;
      for (let [i, alien] of Object.entries(sprites.aliens)) {
        if (alien.viu) {
          alien.y += DISTANCIA_DESCENS_BLOC;
          if (alien.y >= c.height - ALTURA_JUGADOR + LINIA_OFFSET - MIDA_ALIENS) {
            direccioBloc = 0;
            reproduirAudio(audio.jugadorMort0);
          }
        }
      }
      if (direccioBloc == 0) {
        fi('derrota');
      }
      if (numDescens <= INCREMENTS_VELOCITAT_BLOC && frequenciaMovimentBloc != 1) { frequenciaMovimentBloc--; }
      numDescens++;
    }
    if (!canviarDireccio) {
      for (let [i, alien] of Object.entries(sprites.aliens)) {
        if (alien.viu) {
          alien.x += MOVIMENT_BLOC * direccioBloc;
        }
      }
    }
    if (canviarDireccio) { canviarDireccio = false; }

    if (!document.hidden) {
      if (numDescens < INCREMENTS_VELOCITAT_BLOC / 5) { reproduirAudio(audio.bloc.lent); }
      else if (numDescens >= INCREMENTS_VELOCITAT_BLOC / 5 && numDescens <= INCREMENTS_VELOCITAT_BLOC / 1.5) { reproduirAudio(audio.bloc.mitja) }
      else if (numDescens > INCREMENTS_VELOCITAT_BLOC / 1.5) {
        reproduirAudio(audio.bloc[`rapid${alternadorAudioBloc}`]);
        if (alternadorAudioBloc == 0) { alternadorAudioBloc = 1; }
        else if (alternadorAudioBloc == 1) { alternadorAudioBloc = 0; }
      }
    }
    tretAlien();
  }

  function moureJugador() {
    for (let i=0; i<MOVIMENT_JUGADOR; i++) {
      if (!(sprites.jugador.x + MOVIMENT_JUGADOR * direccioJugador > c.width - MIDA_JUGADOR)
      &&!(sprites.jugador.x + MOVIMENT_JUGADOR * direccioJugador < 0)) {
        sprites.jugador.x += i * direccioJugador;
        ctx.clearRect(0, sprites.jugador.y, c.width, MIDA_JUGADOR);
        ctx.drawImage(sprites.jugador.imatge, sprites.jugador.x, sprites.jugador.y, MIDA_JUGADOR, MIDA_JUGADOR);
      }
    }
  }

  function tretJugador() {
    if (sprites.tretJugador.enCurs !== undefined && !sprites.tretJugador.enCurs) {
      sprites.tretJugador.enCurs = true;
      sprites.tretJugador.x = sprites.jugador.x + MIDA_JUGADOR / 2 - 8 ;
      sprites.tretJugador.y = c.height - ALTURA_JUGADOR - 5;

      audio[`tret${alternadorAudioTret}`].play();
      if (alternadorAudioTret == 0) { alternadorAudioTret = 1; }
      else if (alternadorAudioTret == 1) { alternadorAudioTret = 0; }
    }
  }

  function tretAlien() {
    if (fotograma - ultimFotogramaTretAlien >= 20 && Math.random() < PROBABILITAT_TRET_ALIEN / 100) {
      let arrAliens = Object.values(alienTipus1Vius);
      let i = Math.floor(Math.random() * (arrAliens.length - 0) + 0);
      let tipus1Aleatori = arrAliens[i];
      if (tipus1Aleatori !== undefined) {

        for (let i=0; i<sprites.tretsAlien.length; i++) {
          if (!sprites.tretsAlien[i].enCurs) {
            sprites.tretsAlien[i].x = tipus1Aleatori.x;
            sprites.tretsAlien[i].y = tipus1Aleatori.y;
            sprites.tretsAlien[i].enCurs = true;
            ultimFotogramaTretAlien = fotograma;
            break;
          }
        }
      }
    }
  }

  function nauExtra() {
    let nauExtra = sprites.nauExtra;
    if (!nauExtra.enCurs && fotograma - ultimFotogramaNauExtra >= 300 && Math.random() < PROBABILITAT_NAU_EXTRA / 100) {
      nauExtra.enCurs = true;
      let rand = Math.random();

      if (rand < 0.5) {
        nauExtra.direccio = 1;
        nauExtra.x = 0 - MIDA_NAU_EXTRA;
      } else {
        nauExtra.direccio = -1;
        nauExtra.x = c.width + MIDA_NAU_EXTRA;
      }
    }
    else if (nauExtra.enCurs) {
      if (fotograma % 1.5 == 0) { reproduirAudio(audio.nauExtra); }

      for (let i=0; i<MOVIMENT_NAU_EXTRA; i++) {
        nauExtra.x += i * nauExtra.direccio;
        //ctx.clearRect(0, ALTURA_NAU_EXTRA, c.width, MIDA_NAU_EXTRA);
        ctx.drawImage(nauExtra.imatge, nauExtra.x, ALTURA_NAU_EXTRA, MIDA_NAU_EXTRA, MIDA_NAU_EXTRA);

        if (nauExtra.x > c.width + MIDA_NAU_EXTRA || nauExtra.x < -MIDA_NAU_EXTRA) {
          nauExtra.enCurs = false;
          ultimFotogramaNauExtra = fotograma;
        }
      }
    }
  }

  function movimentTrets() {
    if (sprites.tretJugador.enCurs !== undefined && sprites.tretJugador.enCurs) {
      sprites.tretJugador.y -= VELOCITAT_TRET_JUGADOR;
      if (sprites.tretJugador.y < - MIDA_TRET_JUGADOR) {
        sprites.tretJugador.enCurs = false;
      }
    }
    for (let i=0; i<sprites.tretsAlien.length; i++) {
      if (sprites.tretsAlien[i].enCurs !== undefined && sprites.tretsAlien[i].enCurs) {
        sprites.tretsAlien[i].y += VELOCITAT_TRET_ALIEN;
        if (sprites.tretsAlien[i].y > c.height + MIDA_TRET_JUGADOR) {
          sprites.tretsAlien[i].enCurs = false;
          sprites.tretsAlien[i].etapa = 0;
          sprites.tretsAlien[i].direccioEtapa = 1;
        }
      }
    }
  }

  function colisions() {
    let tret_jugador = sprites.tretJugador;
    if (tret_jugador.enCurs !== undefined && tret_jugador.enCurs) {
      for (let [i, alien] of Object.entries(sprites.aliens)) {
        if (alien.viu) {
          let colisioX = tret_jugador.x + MIDA_TRET_JUGADOR - 2 > alien.x && tret_jugador.x < alien.x + MIDA_ALIENS - 2;
          let colisioY = tret_jugador.y + MIDA_TRET_JUGADOR - 2 > alien.y && tret_jugador.y < alien.y + MIDA_ALIENS - 2;

          if (colisioX && colisioY) {
            alien.viu = false;
            afegirPuntuacio(alien.punts);
            sprites.tretJugador.enCurs = false;
            reproduirAudio(audio.alienMort);
            if (alien.tipus == 1) {
              delete alienTipus1Vius[i];
            }
          }
        }
      }
      let nauExtra = sprites.nauExtra;
      if (nauExtra.enCurs) {
        let colisioX = tret_jugador.x + MIDA_TRET_JUGADOR - 2 > nauExtra.x && tret_jugador.x < nauExtra.x + MIDA_NAU_EXTRA - 2;
        let colisioY = tret_jugador.y + MIDA_TRET_JUGADOR - 2 > ALTURA_NAU_EXTRA && tret_jugador.y < ALTURA_NAU_EXTRA + MIDA_NAU_EXTRA - 2;

        if (colisioX && colisioY) {
          nauExtra.duracioMort = DURACIO_MORT_NAU_EXTRA;
          nauExtra.morts++;
          nauExtra.enCurs = false;
          switch(nauExtra.morts) {
            case 1:
              nauExtra.punts = PUNTS_NAU_EXTRA;
              break;
            case 2:
              nauExtra.punts = PUNTS_NAU_EXTRA / 2;
              break;
            case 3:
              nauExtra.punts = PUNTS_NAU_EXTRA / 4;
              break;
            case 4:
              nauExtra.punts = PUNTS_NAU_EXTRA / 6;
              break;
          }
          if (nauExtra.morts >= 5) {
            nauExtra.punts += PUNTS_NAU_EXTRA / 10;
          }
          afegirPuntuacio(nauExtra.punts);

          sprites.tretJugador.enCurs = false;
          reproduirAudio(audio.alienMort);
        }
      }
    }
    for (let i=0; i<sprites.tretsAlien.length; i++) {
      let tretAlien = sprites.tretsAlien[i];
      if (tretAlien.enCurs) {
        let jugador = sprites.jugador;
        let colisioX = tretAlien.x + MIDA_TRET_ALIEN > jugador.x && tretAlien.x < jugador.x + MIDA_JUGADOR;
        let colisioY = tretAlien.y + MIDA_TRET_ALIEN > jugador.y && tretAlien.y < jugador.y + MIDA_JUGADOR;

        if (colisioX && colisioY) {
          tretAlien.enCurs = false;
          videsJugador--;
          audio[`jugadorMort${alternadorAudioMortJugador}`].play().catch(function(){});
          if (alternadorAudioMortJugador == 0) { alternadorAudioMortJugador = 1; }
          else if (alternadorAudioMortJugador == 1) { alternadorAudioMortJugador = 0; }
          if (videsJugador <= 0) {
            fi('derrota');
          }
        }
      }
    }
  }

  function reproduirAudio(arxiu) {
    if (!document.hidden) {
      arxiu.play().catch(function(){});
    }
  }

  function afegirPuntuacio(punts) {
    puntuacio += punts;
    puntuacioSessio += punts;
  }

  function fi(resultat) {
    clearInterval(runtimeJoc);
    $('.canvas-wrapper').css('filter', 'blur(4px)');
    if (resultat == "derrota") { puntuacioSessio -= puntuacio; }
    fiJoc(resultat, puntuacio);
  }

  function inicialitzarJugador() {
    sprites.jugador.x = (c.width - MIDA_JUGADOR) / 2;
    sprites.tretJugador.enCurs = false;
  }

  function poblarAliens() {
    let tipus = 0;
    let punts = 0;
    let tipus1 = FILES_ALIENS_TIPUS1;
    let tipus2 = FILES_ALIENS_TIPUS2;
    let tipus3 = FILES_ALIENS_TIPUS3;

    sprites.aliens = {};
    for (let i=0; i< SUMA_FILES; i++) {
      if (tipus1 > 0) {
        tipus1--;
        tipus = 1;
        punts = 30;
      }
      else if (tipus2 > 0) {
        tipus2--;
        tipus = 2;
        punts = 20;
      }
      else if (tipus3 > 0) {
        tipus3--;
        tipus = 3;
        punts = 10;
      }

      for (let j=0; j < COLUMNES_ALIENS; j++) {
        sprites.aliens[`${i+1}-${j+1}`] = new Alien(j * SEPARACIO_COLUMNA, i * SEPARACIO_FILA + MARGE_VERTICAL_GRUP, punts, tipus, DURACIO_MORT_ALIEN);
      }
    }

    for (let i=0; i<sprites.tretsAlien.length; i++) {
      if (sprites.tretsAlien[i].enCurs) {
        sprites.tretsAlien[i].enCurs = false;
      }
    }
    sprites.nauExtra.morts = 0;
    sprites.nauExtra.enCurs = false;
    sprites.nauExtra.duracioMort = 0;
  }

  $('.joc-wrapper').on('click', '.jugar-partida', function() {
    videsJugador = 3;
    puntuacio = 0;
    if (puntuacioSessio > recordPuntuacio) { recordPuntuacio = puntuacioSessio; }
    direccioBloc = 1;
    direccioJugador = 0;
    fotograma = 0;
    frequenciaMovimentBloc = FREQUENCIA_MOVIMENT_BLOC_INICIAL;
    numDescens = 0;
    canviarDireccio = false;
    ultimFotogramaTretAlien = 0
    ultimFotogramaNauExtra = 0;
    $('.canvas-wrapper').css('filter', 'none');

    inicialitzarJugador();
    poblarAliens();

    $('.missatge-canvas').remove();
    runtimeJoc = runtimeJoc = setInterval(motor, TASA_REFRESC);
  });
});