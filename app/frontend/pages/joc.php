<?php
/** @var string $joc */
/** @var string $ruta */

  $database = Database::getInstance();
  $database->get('jocs',array('ruta','=',$ruta));
  $joc_bd = $database->results()[0];

  $user = new User();
  $uid = "anon";
  $record = 0;
  if (isset($_SESSION['user']) && $user->find($_SESSION['user'])) {
    $uid = $_SESSION['user'];
    $database = Database::getInstance();
    $database->query("SELECT MAX(puntuacio) AS record FROM resultats WHERE uid = ".$_SESSION['user']);
    $record = $database->results()[0]->record;
  }
?>
<h1 class="titol-pagina"><?php appSlogan()?></h1>
<div class="row main-joc">
  <div class="col-md-9">
    <div class="joc-wrapper">
      <div class="canvas-wrapper">
        <canvas id="joc-<?php echo $joc_bd->jid ?>" data-usuari="<?php echo $uid ?>" class="joc-canvas" record="<?php echo $record ?>" width="800" height="600"></canvas>
      </div>
      <div class="missatge-canvas">
        <h1><?php echo $joc_bd->nom ?></h1>
        <div class="jugar-partida">Començar partida</div>
      </div>
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
