<?php

class Hash
{
    public static function make($string)
    {
        return hash(Config::get('hash/algo_name'), $string . Hash::salt());
    }

    public static function salt()
    {
        return random_bytes(Config::get('hash/salt'));
    }

    public static function unique()
    {
        return self::make(uniqid());
    }
}
