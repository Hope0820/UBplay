<?php
/** @var string $joc */
/** @var string $ruta */

  $database = Database::getInstance();
  $database->get('jocs',array('ruta','=',$ruta));
  $joc_bd = $database->results()[0];
?>
<h1 class="titol-pagina">UBplay, la teva plataforma web de jocs</h1>
<div class="row">
  <div class="col-md-9">
    <div class="canvas-wrapper">
      <canvas id="joc-<?php echo $joc_bd->jid ?>" class="joc-canvas" width="800" height="600"></canvas>
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
<script type="module" src="<?php echo FRONTEND_ASSET.'js/jocs/'.$joc.'/joc.js' ?>"></script>
