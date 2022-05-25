
<div class="container" style="padding-top: 5%; padding-bottom: 5%;">
<h2>Update Information</h2>
  <form action="" method="post">
    <div class="form-group">
      <label for="name">Nom :</label>
      <input type="text" class="form-control" id="name" placeholder="Enter name" name="name" value="<?php echo escape($user->data()->name); ?>">
    </div>
    <div class="form-group">
      <label for="username">Usuari :</label>
      <input type="text" class="form-control" id="username" placeholder="Enter username" name="username" value="<?php echo escape($user->data()->username); ?>">
    </div>
    <div class="form-group">
      <label for="current_password">Contrasenya actual :</label>
      <input type="password" class="form-control" id="current_password" placeholder="Enter current password" name="current_password">
    </div>
    <div class="form-group">
      <label for="new_password">Nova contrasenya :</label>
      <input type="password" class="form-control" id="new_password" placeholder="Enter new_password" name="new_password">
    </div>
    <div class="form-group">
      <label for="confirm_new_password">Confirmar contrasenya :</label>
      <input type="password" class="form-control" id="confirm_new_password" placeholder="Confirm your new password" name="confirm_new_password">
    </div>
    <input type="hidden" name="csrf_token" value="<?php echo Token::generate(); ?>">
    <input type="submit" class="boto" value="Actualitzar">
  </form>
</div>
