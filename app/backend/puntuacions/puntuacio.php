<?php
require_once 'init.php';

if (isset($_REQUEST['jid']) && isset($_REQUEST['uid']) && isset($_REQUEST['puntuacio'])) {
  $jid = $_REQUEST['jid'];
  $uid = $_REQUEST['uid'];
  $puntuacio = $_REQUEST['puntuacio'];

  $db = Database::getInstance();
  $db->insert('resultats', array(
    'jid' => $jid,
    'uid' => $uid,
    'puntuacio' => $puntuacio
));
  echo "Insertat correctament";
} else {
  echo "Error de parametres";
}
