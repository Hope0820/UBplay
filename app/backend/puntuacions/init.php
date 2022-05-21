<?php
require_once '../core/Database.php';
require_once '../auth/config.php';
require_once '../core/Config.php';
/** @var Database $database */

function puntuacio($periode) {
  $periode = "p_".$periode;
  $database = Database::getInstance();
  $database->query("SELECT * FROM users WHERE $periode > 0 ORDER BY $periode DESC");
  if (!empty($database->results())) {
    echo json_encode($database->results());
  } else {
    echo "null";
  }
}