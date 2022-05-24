<?php

$GLOBALS['config'] = array(

    'app' => array(
        'name'          => 'UBplay',
        'slogan'        => 'Jocs arcade del segle <span class="visitor">XX</span>'
    ),

    'mysql' => array(
        'host'          => '127.0.0.1',
        'username'      => 'ubpAdmin',
        'password'      => 'JhaVEc34mMa4vzaa',
        'db_name'        => 'ubplay'
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
