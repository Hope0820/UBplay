$(document).ready(function() {
  const RUTA_PUNTUACIONS = '/app/backend/puntuacions/';
  let xhttp;
  $('.seleccionar-dia > li').on('click',function() {
    let periode = $(this).attr('data-periode');

    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      document.getElementById("classificacio-puntuacions").innerHTML = `<p><i class="fa-solid fa-circle-notch fa-spin"></i></p>`;
      if (this.readyState == 4 && this.status == 200) {
        if (this.responseText != "null") {
          let usuaris = JSON.parse(this.responseText);
          html = "<table><tbody><tr><th><i class=\"fa-solid fa-hashtag\"></i></th><th><i class=\"fa-solid fa-user\"></i></th><th><i class=\"fa-solid fa-coins\"></i></th></tr><hr/>";

          usuaris.forEach(function (u, i) {
            html += "<tr><td>"+(i+1)+"</td><td>"+u['username']+"</td><td>"+u[`p_${periode}`]+"</td></tr>";
          });

          html += "</tbody></table>";
        } else {
          html = `<p class='buit'>Sense resultats</p>`;
        }
        document.getElementById("classificacio-puntuacions").innerHTML = html;
      }
    };
    xhttp.open("GET", RUTA_PUNTUACIONS + periode + ".php", true);
    xhttp.send();
  });

  $('.seleccionar-dia > li:last-child').trigger('click');
});