
<div class="container">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >
          <div class="panell">
            <div class="panell-capçalera">
              <h3><?php echo escape($data->name); ?></h3>
            </div>
            <div class="panel-body">
              <div class="row">
                <table class="table table-user-information">
                  <tbody>
                    <tr>
                      <td>Nom:</td>
                      <td><?php echo escape($data->name); ?></td>
                    </tr>
                    <tr>
                      <td>Usuari:</td>
                      <td><?php echo escape($data->username); ?></td>
                    </tr>
                    <tr>
                      <td>Data de creació:</td>
                      <td><?php echo escape($data->joined); ?></td>
                    </tr>
                  </tbody>
                </table>
                <div class="panell-botons">
                  <a href="actualitzar-compte.php" class="boto">Editar</a>
                  <a href="delete-account.php" class="boto boto-perill">Borrar Compte</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
