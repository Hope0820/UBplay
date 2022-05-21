
<div class="container" style="margin-top:30px">
  <div class="row">
    <div class="col-sm-9">
      <?php
        $database = Database::getInstance();
        $database->get('jocs', array(''));
        foreach($database->results() as $joc) {
          echo "<a href='".FRONTEND_JOCS.$joc->nom."'><div class='joc'>
                  <img src='".FRONTEND_ASSET_IMG.$joc->img."' alt='$joc->nom'>
                  <p>$joc->nom</p>
                  
                </div></a>";
        }
      ?>
    </div>
    <div class="col-sm-3">
      Ranking
    </div>
  </div>
</div>
