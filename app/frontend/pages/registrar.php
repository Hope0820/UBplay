<div class="container" style="padding-top: 5%; padding-bottom: 5%;">
<h2>Enregistrar Usuari</h2>
  <form action="" method="post">

    <div class="form-group">
      <label for="name">NOM:</label>
      <input type="text" class="form-control" id="name" name="name" value="<?php echo escape(Input::get('name')); ?>">
    </div>
    <div class="form-group">
      <label for="username">USUARI:</label>
      <input type="text" class="form-control" id="username" name="username" value="<?php echo escape(Input::get('username')); ?>">
    </div>
    <div class="form-group">
      <label for="password">CONTRASENYA:</label>
      <input type="password" class="form-control" id="password" name="password">
    </div>
    <div class="form-group">
      <label for="password_again">CONFIRMAR CONTRASENYA</label>
      <input type="password" class="form-control" id="password_again" name="password_again">
    </div>
    <input type="hidden" name="csrf_token" value="<?php echo Token::generate(); ?>">
    <input type="submit" class="boto" value="Enregistrar Usuari">
  </form>
</div>
