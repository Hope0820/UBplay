<?php $database = Database::getInstance(); ?>
<h1 class="titol-pagina">UBplay, la teva plataforma web de jocs</h1>
<div class="row">
  <div class="col-md-9">
    <div class="jocs">
    <?php
      $database->get('jocs', array(''));
      foreach($database->results() as $joc) {
        echo "<a href='".FRONTEND_JOCS.$joc->nom."'><div class='joc'>
                <div class='img-wrapper'><img src='".FRONTEND_ASSET_IMG.$joc->img."' alt='$joc->nom'></div>
                <span class='joc-descripcio'>$joc->descripcio</span>
                <span class='joc-nom'>$joc->nom</span>
              </div></a>";
      }
    ?>
    </div>
  </div>
  <div class="col-md-3">
    <div class="puntuacions">
      <h2>CLASSIFICACIÓ</h2>
      <ul class="seleccionar-dia">
        <li data-periode="dia">Dia</li>
        <li data-periode="setmana">Setmana</li>
        <li data-periode="mes">Mes</li>
        <li data-periode="any">Any</li>
        <li data-periode="total">Total</li>
      </ul>
      <div id="classificacio-puntuacions"></div>
    </div>
  </div>
</div>
