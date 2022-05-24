
<nav class="navbar navbar-expand-sm navbar-dark">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="collapsibleNavbar">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="#">Jocs</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Puntuacions</a>
      </li>
    </ul>
    <a class="navbar-brand" href="/index.php"><img alt="UBplay" src="<?php echo FRONTEND_ASSET . 'img/logo.png'; ?>"></a>
    <?php if ($user->isLoggedIn()): ?>
    <ul class="nav navbar-nav nav-item navbar-right">
      <li><a href="/profile.php"><i class="fa-regular fa-user"></i> <?php echo $user->data()->name;?></a></li>
      <li><a href="/logout.php"><i class="fa-solid fa-arrow-right-from-bracket"></i> Sortir</a></li>
    </ul>
    <?php else: ?>
    <ul class="nav navbar-nav nav-item navbar-right">
      <li><a href="/register.php"><i class="fa-regular fa-user"></i> Registrar-se</a></li>
      <li><a href="/login.php"><i class="fa-solid fa-arrow-right-from-bracket"></i>  Iniciar-sessió</a></li>
    </ul>
  <?php endif; ?>
  </div>
</nav>
