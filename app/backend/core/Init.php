<?php
session_start();

require_once $_SERVER['DOCUMENT_ROOT'].'/app/backend/auth/config.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/app/backend/core/Helpers.php';

spl_autoload_register("autoload");

require_once $_SERVER['DOCUMENT_ROOT'].'/app/backend/auth/cookie.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/app/backend/auth/user.php';







