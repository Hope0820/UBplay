<?php

$GLOBALS['config'] = array(

    'app' => array(
        'name'          => 'UBplay',
        'slogan'        => 'Jocs arcade del segle <span class="visitor">XX</span>'
    ),

    'mysql_local' => array(
        'host'          => '127.0.0.1',
        'username'      => 'ubpAdmin',
        'password'      => 'JhaVEc34mMa4vzaa',
        'db_name'        => 'ubplay'
    ),
    'mysql' => array(
      'host'          => 'localhost',
      'username'      => 'id18986711_ubplayadmin',
      'password'      => '<>9$j]V*X&RCl*&G',
      'db_name'        => 'id18986711_ubplay'
    ),
    'password' => array(
        'algo_name' => PASSWORD_DEFAULT,
        'cost'      => 10,
        'salt'      => 50,
    ),

    'hash' => array(
        'algo_name' => 'sha512',
        'salt'      => 30,
    ),

    'remember'  => array(
        'cookie_name'   => 'token',
        'cookie_expiry' => 604800
    ),

    'session'   => array(
        'session_name'  => 'user',
        'token_name'    => 'csrf_token'
    ),
);
