<?php
require_once ("config.php");

session_start();

if (isset($_SESSION["last_action_time"])){
  if (time() - $_SESSION["last_action_time"] > $conf["session_timeout"]) {
    $_SESSION["logged_in"] = false;
    header("Location: login.php?msg=timeout");
    exit();
  }
}
$_SESSION["last_action_time"] = time();

if (!isset($_SESSION["logged_in"]) or !$_SESSION["logged_in"]) {
  header("Location: login.php");
  exit();
}
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Graf alternatiu FME</title>

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="manifest" href="manifest.json">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <!-- own css stylesheets -->
    <link rel="stylesheet" href="css/general.css">
    <link rel="stylesheet" href="css/graf.css">
    <link rel="stylesheet" href="css/dialog.css">
    <link rel="stylesheet" href="css/stats-dialog.css">
    <link rel="stylesheet" href="css/config-dialog.css">
    <link rel="stylesheet" href="css/option-buttons.css">
    <link rel="stylesheet" href="css/year-list.css">
    <link rel="stylesheet" href="css/search-bar.css">

    <!-- imported css stylesheets -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.blue-green.min.css" /> 
    <link rel="stylesheet" href="https://cdn.rawgit.com/kybarg/mdl-selectfield/mdl-menu-implementation/mdl-selectfield.min.css" /> <!-- mdl dropdown. Should find an alternative/way not to rely on a cdn that sets cookies -->

    <!-- Apple web app -->
    <meta name="apple-mobile-web-app-title" content="Graf FME">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    
    <!--- icons -->
    <link rel="chrome_web_icon" sizes="192x192" href="img/graf192.png">
    <link rel="apple-touch-icon" href="img/graf180.png">
    <link rel="shortcut icon" href="img/favicon.ico">
    
  </head>
  <body>
    <!-- side buttons -->
    <div id="option-buttons">
      <button id="accept" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--accent"><i class="material-icons">check</i></button>
      <button id="cancel" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--accent"><i class="material-icons">close</i></button>
      <button id="add" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--accent"><i class="material-icons">add</i></button>
      <button id="stats" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--primary"><i class="material-icons">assignment</i></button>
      <button id="settings" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--primary"><i class="material-icons">settings</i></button>
      <button id="search" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--primary"><i class="material-icons">search</i></button>
      <button id="zoomin" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--primary"><i class="material-icons">zoom_in</i></button>
      <button id="zoomout" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--primary"><i class="material-icons">zoom_out</i></button>
    </div>

    <!-- Search container -->
    <div id="backdrop-container" style="display: none;">
      <div id="backdrop"></div>
    </div>

    <!-- Dialog container -->
    <div id="dialog" class="mdl-shadow--2dp" style="display: none;">
      <button id="quit-dialog" class="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect"><i class="material-icons">close</i></button>
      <button id="min-dialog" class="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect"><i class="material-icons">remove</i></button>

      <div id="dialog-vertex">
        <h2 id="name-text" data-fill="name"></h2>
        
        <ul>
          <li id="year-text"><b>Any:</b> <span data-fill="year"></span></li>
          <li id="sex-text"><b>Sexe:</b> <span data-fill="sex"></span></li>
          
          
          <li><b>ID:</b> <span data-fill="id" id="node-id"></span></li>
          
          
        </ul>
        
        
        <div id="editnode-box">
          <button id="editnode-button" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"><i class="material-icons">edit</i></button>
          <button id="movenode-button" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"><i class="material-icons">open_with</i></button>
          <button id="deletenode-button" class="mdl-button mdl-js-button mdl-button--raised mdl-color--red"><i class="material-icons">delete</i></button>
        </div>
        <br>
        <!--
        <div id="movenode-box">
          
        </div>
        -->
        <div id="edge-list">
          <h3>Arestes (<span data-fill="n-edges"></span>):</h3>
          <ul data-fill="edges">
          </ul>
        </div>
        
        <div id="addedge-box">
          <button id="addedge-button" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"><i class="material-icons">add</i></button>
          <button id="deleteedge-button" class="mdl-button mdl-js-button mdl-button--raised mdl-color--red"><i class="material-icons">remove</i></button>
        </div>
    
      </div>
      <div id="dialog-edge" style="display: none;"></div>
    </div>
    
    
    <div id="summary-dialog" class="mdl-shadow--2dp" style="display: none;">
      <button id="quit2-dialog" class="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect"><i class="material-icons">close</i></button>
      <button id="max-dialog" class="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect"><i class="material-icons">add</i></button>
      <div id="summary-vertex">
        <h2 data-fill="name"></h2>
        <p><span data-fill="year"></span>, <span data-fill="sex"></span>, <span data-fill="id"></span></p>
      </div>
      
    </div>
    
    <!-- Edit dialog -->
    <div id="edit-dialog" class="mdl-shadow--2dp" style="display: none;">
      <h2 id="edit-title" data-fill="edit-title"> Edita </h2>
      <div id="name-field" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: 300px;">
        <input class="mdl-textfield__input" type="text" pattern="^[^;<>]{3,240}$" id="input-name">
        <label class="mdl-textfield__label" for="input-name">Nom</label>
        <span class="mdl-textfield__error">Nom no vàlid (3-240 caràcters, excepte ; &lt &gt)</span>
      </div>
      <br>
      <div id = "year-div" class="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label">
        <select class="mdl-selectfield__select" id="input-year" name="input-year">
          <?php
            $max_year = (int) date("Y");
            if (((int) date("m")) < 9) {
                --$max_year;
            }
            for ($i = $max_year; $i >= 2007; --$i) {
              echo '<option value="'.$i.'">'.$i.'</option>';
            }
          ?>
        </select>
        <label class="mdl-selectfield__label" for="year" style="color: #007bff;">Any</label>
      </div>
      
      <div id = "sex-div" class="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label">
        <select class="mdl-selectfield__select" id="input-sex" name="input-sex">
          <option value="U">U</option>
          <option value="F">F</option>
          <option value="M">M</option>
        </select>
        <label class="mdl-selectfield__label" for="input-sex" style="color: #007bff;">Sexe</label>
      </div>
      
      
      <div id="addnode-cancel">
          <div class="mdl-layout-spacer"></div>
          <button id="canceledit-button" class="mdl-button mdl-js-button mdl-button--primary"><i class="material-icons" style="color: rgb(108, 117, 125);">cancel</i></button>
      </div>
      
      <div id="addnode-save">
          <div class="mdl-layout-spacer"></div>
          <button id="saveedit-button" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"><i class="material-icons">save</i></button>
      </div>
      
    </div>

    
    
    <div id="delete-dialog" class="mdl-shadow--2dp" style="display: none;">
      <h2 id="delete-title"> Esborra aresta </h2>
      <br>
      <div id = "edge-div" class="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label">
        <select class="mdl-selectfield__select" id="input-edge" name="input-edge">
            <option value="Potato"> i </option>
            <option value="Potato2"> i2 </option>
        </select>
        <label class="mdl-selectfield__label" for="edge" style="color: #007bff;">Aresta</label>
      </div>
      
      <div id="deleteedge-cancel">
          <div class="mdl-layout-spacer"></div>
          <button id="canceledge-button" class="mdl-button mdl-js-button mdl-button--primary"><i class="material-icons" style="color: rgb(108, 117, 125);">cancel</i></button>
      </div>
      
      <div id="deleteedge-save">
          <div class="mdl-layout-spacer"></div>
          <button id="savedelete-button" class="mdl-button mdl-js-button mdl-button--raised mdl-color--red"><i class="material-icons">delete</i></button>
      </div>
    </div>
    <!-- Stats dialog container -->
    <div id="stats-dialog" class="mdl-shadow--2dp" style="display: none;">
      <button id="stats-quit-dialog" class="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect"><i class="material-icons">close</i></button>
      
      <div class="btn-group btn-group-toggle" data-toggle="buttons"
            style="margin-top: 50px; margin-left:0%; width:100%">
        <label class="btn btn-secondary active" style="border-radius:0px;display:block;width:100%">
          <input type="radio" name="options" id="option1" autocomplete="off" checked> Ranking
        </label>
        <label class="btn btn-secondary" style="border-radius:0px;display:block;width:100%">
          <input type="radio" name="options" id="option2" autocomplete="off"> Stats
        </label>
        <label class="btn btn-secondary" style="border-radius:0px;display:block;width:100%">
          <input type="radio" name="options" id="option2" autocomplete="off"> Distance
        </label>

      </div>
      
      <div id="stats-dialog-section">
   
        <ul id="ranking" data-fill="section-ranking">
        </ul>
      </div>
    </div>
    
    <div id="config-dialog" class="mdl-shadow--2dp" style="display: none;">
      <button id="config-quit-dialog" class="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect"><i class="material-icons">close</i></button>
      
      <div class="btn-group btn-group-toggle" data-toggle="buttons"
            style="margin-top: 50px; margin-left:0%; width:100%">
            
        <label id="years-tab" class="btn btn-secondary active" style="border-radius:0px;display:block;width:100%">
          <input type="radio" name="options" id="years-tab-btn" autocomplete="off" checked> Anys
        </label>
        
        <label class="btn btn-secondary" style="border-radius:0px;display:block;width:100%">
          <input type="radio" name="options" id="option2" autocomplete="off"> TBD
        </label>
        
        <label id="edit-tab" class="btn btn-secondary" style="border-radius:0px;display:block;width:100%">
          <input type="radio" name="options" id="edit-tab-btn" autocomplete="off"> Edit
        </label>

      </div>
      
      <div id="year-selection">
   
        <?php
          $max_year = (int) date("Y");
          if (((int) date("m")) < 9) {
            --$max_year;
          }
          for ($year = 2007; $year <= $max_year; ++$year) {

            echo
            '<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect custom-checkbox" for="checkbox-' .$year. '">

            <input type="checkbox" class="mdl-checkbox__input" name="' .$year. '" id="checkbox-'.$year.'">

            <span class="mdl-checkbox__label">' .$year. ' </span>

            </label>
            <br>';
          }
        ?>
      </div>
      
      <div id="edit-options" style="display: none;">
        
          <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="edit-toggle">
            <input type="checkbox" id="edit-toggle" class="mdl-switch__input">
            <span class="mdl-switch__label"> Mode d'edició </span>
          </label>
        
      </div>
    </div>
    

    <!-- MD Search Box -->
    <div class="md-google-search__metacontainer" style="display: none;">
      <div class="md-google-search__container">
        <div id="search-bar" class="md-google-search">
          <button class="md-google-search__search-btn">
            <svg height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
          </button>
          <div class="md-google-search__field-container">
            <input id="search-input" class="md-google-search__field" autocomplete="off" placeholder="Cerca" value="" name="search" type="text" spellcheck="false" style="outline: none;">
          </div>
          <button class="md-google-search__empty-btn" style="display: none;">
            <svg focusable="false" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
          </button>
        </div>
      </div>
    </div>

    <div class="autocomplete-container" style="display: none;">
      <div id="autocomplete-list" class="autocomplete-items"></div>
    </div>
    
    <div class="mdl-snackbar mdl-js-snackbar"><div class="mdl-snackbar__text"></div><button type="button" class="mdl-snackbar__action"></button></div>
    
    <div id="graf"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/sigma.js/1.2.1/sigma.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/sigma.js/1.2.1/plugins/sigma.layout.forceAtlas2.min.js"></script>
    <!-- s.startForceAtlas2({scalingRatio: 500,gravity:200,weight:1}) has been found to produce good results-->
    
    <!-- Our scripts -->
    
    <!-- edit scripts -->
    <script src="js/edit/addnode.js"></script>
    <script src="js/edit/editnode.js"></script>
    <script src="js/edit/deletenode.js"></script>
    <script src="js/edit/movenode.js"></script>
    <script src="js/edit/addedge.js"></script>
    <script src="js/edit/deleteedge.js"></script>
    
    <!-- dialogs-->
    <script src="js/dialogs/nodeinfo.js"></script>
    <script src="js/dialogs/nodeedit.js"></script>
    <script src="js/dialogs/edgedelete.js"></script>
    <script src="js/dialogs/stats.js"></script>
    

    <script src="js/graf.js"></script>
    <script src="js/autocomplete.js"></script>
    <script src="js/limit-years.js"></script>
    <script src="js/search-bar.js"></script>
    <script src="js/camera.js"></script>
    <script src="js/statistics.js"></script>
    <script src="js/ui.js"></script>
    
    <!-- Last one!! -->
    <script src="js/init.js"></script>  

    <!-- imported scripts -->
    <script src="https://code.getmdl.io/1.3.0/material.min.js"></script> 
    <script src="https://cdn.rawgit.com/kybarg/mdl-selectfield/mdl-menu-implementation/mdl-selectfield.min.js"></script> <!-- mdl dropdown. Should find an alternative/way not to rely on a cdn that sets cookies -->
    <!-- <script src="js/service-worker.js"></script> -->
  </body>
</html>
