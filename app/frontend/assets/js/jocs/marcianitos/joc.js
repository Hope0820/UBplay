import Alien from './alien.js';
//import Jugador from './jugador.js';

const MIDA_ALIENS = 40;
const MIDA_JUGADOR = 60;
const MARGE_VERTICAL_GRUP = 50;
const SEPARACIO_COLUMNA = 20 + MIDA_ALIENS;
const SEPARACIO_FILA = 20 + MIDA_ALIENS;
const MOVIMENT = 2;
const ALTURA_JUGADOR = 100;
const RUTA_IMATGES = '/app/frontend/assets/img/jocs/marcianitos/';

/*
* PUNTS: 10, 20 , 25, 30
* */

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

  let aa = new Alien(100, 100, '30', 1);
  let bb = new Alien(200, 100, '20', 2);
  let cc = new Alien(300, 100, '10', 3);

  let sprites = {
    'aliens': {},
    'jugador' : {
      'x' : (c.width - MIDA_JUGADOR) / 2,
      'y' : c.height - ALTURA_JUGADOR,
      'imatge' : new Image()
    }
  };
  sprites.jugador.imatge.src = RUTA_IMATGES+'jugador.png';

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
  console.log(sprites)
  dibuixarSprites()

  let runtimeJoc = setInterval(dibuixar, 10000);



  //Controls
  $(window).on('keydown', function (key) {
    let codi = key.keyCode;

    if (codi == 32 || codi == 37 || codi == 39) {
      let direccio = '';
      key.preventDefault();
      console.log(codi);
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

      socket.emit('moviment', { 'direccio': direccio });
    }
  });

  function dibuixar () {
    dibuixarSprites();
    dibuixarPuntuacio();
  }

  function dibuixarSprites() {
    console.log(sprites.aliens)
    ctx.drawImage(sprites.jugador.imatge, sprites.jugador.x, sprites.jugador.y, MIDA_JUGADOR, MIDA_JUGADOR);
    for (let [i, alien] of Object.entries(sprites.aliens)) {
      ctx.drawImage(imgAliens[alien.tipus-1], alien.x, alien.y, MIDA_ALIENS, MIDA_ALIENS);
    }
  }

  function dibuixarPuntuacio() {

  }

  function moureJugador(direccio) {
    if (direccio == 'L') {

    }
    else if (direccio == 'R') {

    }
  }
  /*
  socket.on('taulellJoc', function (data) {
    let cocos = data.cocos;
    let fantasmes = data.fantasmes;
    let pacmans = data.pacmans;

    //Netejar canvas
    ctx.clearRect(0, 0, c.width, c.height);

    //Si es el primer cop carregar imatges
    if (primera) {
      for (coco of cocos) {
        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.arc(coco.x, coco.y, 5, 0, 2 * Math.PI);
        ctx.fill();
      }

      //Carregar fantasmes
      for (let i = 0; i < fantasmes.length; i++) {
        let fantasma = fantasmes[i];

        let img = new Image();
        img.onload = function () {
          ctx.drawImage(img, fantasma.x, fantasma.y, MIDA_PERSONATGES, MIDA_PERSONATGES);
        };

        switch (i % 4) {
          case 0:
            img.src = "./img/blinky.svg";
            img.alt = "Blinky";
            break;
          case 1:
            img.src = "./img/pinky.svg";
            img.alt = "Pinky";
            break;
          case 2:
            img.src = "./img/inky.svg";
            img.alt = "Inky";
            break;
          case 3:
            img.src = "./img/clyde.svg";
            img.alt = "Clyde";
            break;
        }
        imatges['fantasmes'][i] = {
          'img': img,
          'direccio': fantasma.direccio
        };
      }

      //Carregar pacmans
      for (let i = 0; i < pacmans.length; i++) {
        let pacman = pacmans[i];

        let img = new Image();

        img.src = "./img/pacman/obert.svg";
        img.alt = "Pacman";

        imatges['pacmans'][i] = {
          'img': img,
          'direccio': pacman.direccio
        };
      }
      primera = false;
    }

    for (coco of cocos) {
      ctx.beginPath();
      ctx.fillStyle = "#fff";
      ctx.arc(coco.x, coco.y, 5, 0, 2 * Math.PI);
      ctx.fill();
    }

    //Fantasmes
    for (let i = 0; i < fantasmes.length; i++) {
      let fantasma = fantasmes[i];
      if (imatges['fantasmes'][i].img !== undefined) {
        ctx.drawImage(imatges['fantasmes'][i].img, fantasma.x, fantasma.y, MIDA_PERSONATGES, MIDA_PERSONATGES);
      }

    }

    //Pacmans
    for (let i = 0; i < pacmans.length; i++) {
      let pacman = pacmans[i];

      if (imatges['pacmans'][i].img !== undefined) {
        let img = imatges['pacmans'][i].img;
        let direccio = pacman.direccio;
        let x = pacman.x;
        let y = pacman.y;
        let punts = pacman.punts;
        let nom = pacman.nomUsuari.charAt(0).toUpperCase() + pacman.nomUsuari.slice(1).toLowerCase();

        //Teletransportar-se en els limits
        if (x >= c.width - MIDA_PERSONATGES && x < c.width) {
          ctx.save();
          ctx.translate(-c.width, 0);
          dibuixarPacman(img, x, y, direccio);
          ctx.restore();
        }
        else if (y >= c.height - MIDA_PERSONATGES && y < c.height) {
          ctx.save();
          ctx.translate(0, -c.height);
          dibuixarPacman(img, x, y, direccio);
          ctx.restore();
        }
        dibuixarPacman(img, x, y, direccio);

        //Puntuació
        ctx.textAlign = 'right';
        ctx.fillStyle = "#ffffff";
        if (i == 0) {
          ctx.font = "28px Arial";
          ctx.fillText(`Puntuacions`, c.width - 25, 45);
        }
        ctx.font = "18px Arial";
        let nomLocal = $('#nom-usuari').attr('data-nom');
        if (nomLocal && nomLocal.toLowerCase() === nom.toLowerCase()) {
          ctx.fillStyle = "#ffe824";
        }
        ctx.fillText(`${nom}: ${punts}`, c.width - 25, 50 + 20 * (i + 1));
      }
    }
  });
  function dibuixarPacman(img, x, y, direccio) {
    if (direccio != '') {
      switch (direccio) {
        case 'R':
          ctx.drawImage(img, x, y, MIDA_PERSONATGES, MIDA_PERSONATGES);
          break;
        case 'U':
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(270 * Math.PI / 180);
          ctx.translate(-(canvas.width / 2), -(canvas.height / 2));
          ctx.drawImage(img, canvas.width / 2, canvas.height / 2, -MIDA_PERSONATGES, MIDA_PERSONATGES);
          ctx.restore();
          break;
        case 'D':
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(90 * Math.PI / 180);
          ctx.translate(-(canvas.width / 2), -(canvas.height / 2));
          ctx.drawImage(img, canvas.width / 2, canvas.height / 2, MIDA_PERSONATGES, -MIDA_PERSONATGES);
          ctx.restore();
          break;
        case 'L':
          ctx.save();
          ctx.scale(-1, 1);
          ctx.drawImage(img, -x, y, -MIDA_PERSONATGES, MIDA_PERSONATGES);
          ctx.restore();
          break;
      }
      if ((x + y) % 16 == 0) {
        if (img.src.includes('obert')) {
          img.src = "./img/pacman/tancat.svg";
        } else {
          img.src = "./img/pacman/obert.svg";
        }
      }
    } else {
      ctx.drawImage(img, x, y, MIDA_PERSONATGES, MIDA_PERSONATGES);
    }
  }*/
});



