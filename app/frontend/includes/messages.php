<?php

if(Session::exists('register-success'))
{
  echo '<div class="alert alert-success"><strong></strong>' . Session::flash('register-success') . '<a href="login.php"> Aquí</a></div>';
}

if(Session::exists('update-success'))
{
  echo '<div class="alert alert-success"><strong></strong>' . Session::flash('update-success') . '</div>';
}
