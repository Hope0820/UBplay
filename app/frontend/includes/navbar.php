
<nav class="navbar navbar-expand-sm navbar-dark">
  <a class="navbar-brand" href="index.php">UBplay</a>
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
    <?php if ($user->isLoggedIn()): ?>
    <ul class="nav navbar-nav nav-item navbar-right">
      <li><a href="profile.php"><i class="fa-regular fa-user"></i> <?php echo $user->data()->name;?></a></li>
      <li><a href="logout.php"><i class="fa-solid fa-arrow-right-from-bracket"></i> Sortir</a></li>
    </ul>
    <?php else: ?>
    <ul class="nav navbar-nav nav-item navbar-right">
      <li><a href="register.php"><span class="glyphicon glyphicon-user"></span>Register</a></li>
      <li><a href="login.php"><span class="glyphicon glyphicon-log-in"></span>Log-in</a></li>
    </ul>
  <?php endif; ?>
  </div>
</nav>
