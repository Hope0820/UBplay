
<div class="container">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >
          <div class="panel panel-info">
            <div class="panel-heading">
              <h3 class="panel-title"><?php echo escape($data->name); ?></h3>
            </div>
            <div class="panel-body">
              <div class="row">
                <div class=" col-md-9 col-lg-9 ">
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
                  <a href="update-account.php" class="btn btn-primary">Editar</a>
                  <a href="index.php" class="btn btn-primary">Enrere</a>
                  <a href="delete-account.php" class="btn btn-danger">Borrar Compte</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
