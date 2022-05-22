<?php include_once '../start.php'; ?>
<?php require_once $_SERVER['DOCUMENT_ROOT'].'/'. FRONTEND_INCLUDE . 'header.php'; ?>
<?php require_once $_SERVER['DOCUMENT_ROOT'].'/'. FRONTEND_INCLUDE . 'navbar.php'; $ruta = basename(__FILE__); $joc = basename(__FILE__,'.php'); ?>
<?php require_once $_SERVER['DOCUMENT_ROOT'].'/'. FRONTEND_PAGE . 'joc.php'; ?>
<?php require_once $_SERVER['DOCUMENT_ROOT'].'/'. FRONTEND_INCLUDE . 'footer.php'; ?>