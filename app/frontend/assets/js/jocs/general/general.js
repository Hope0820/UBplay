export function fiJoc(resultat, puntuacio = 0) {
  const ARXIU_PUNTUACIO = '/app/backend/puntuacions/puntuacio.php';


  if (resultat == 'victoria') {
    let jid = $('canvas').attr('id').slice($('canvas').attr('id').indexOf('-') + 1);
    let uid = $('canvas').attr('data.usuari');

    let xhttpPuntuacio = new XMLHttpRequest();
    xhttpPuntuacio.onload = function() {
      //DEBUG
      //console.log(this.responseText);
    }
    xhttpPuntuacio.open("POST", ARXIU_PUNTUACIO);
    xhttpPuntuacio.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttpPuntuacio.send(`jid=${jid}&uid=${uid}&puntuacio=${puntuacio}`);
    setTimeout(function() {$('.seleccionar-dia > li.active').trigger('click');}, 2000);

  }

  let missatgeResultat = `
      <div class="missatge-canvas">
        <h1>${resultat.charAt(0).toUpperCase() + resultat.slice(1)}</h1>
        <div class="jugar-partida">Tornar a jugar</div>
      </div>
    `;
  $('.joc-wrapper').append(missatgeResultat);

}