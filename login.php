<?php
session_start();
if (isset($_SESSION["logged_in"]) and $_SESSION["logged_in"]) {
  header("Location: graf.php");
  exit();
}

?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Graf alternatiu FME</title>

    <meta name=viewport content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.blue_grey-blue.min.css" />

    <style>
    .page-content {
      display: block;
      max-width: 500px;
      margin-top: 16px;
      margin-left: auto;
      margin-right: auto;
      padding: 16px;
    }
    </style>
    
    <!--- icons -->
    <link rel="chrome_web_icon" sizes="192x192" href="img/graf192.png">
    <link rel="apple-touch-icon" href="img/graf180.png">
    <link rel="shortcut icon" href="img/favicon.ico">
  </head>
  <body>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
          <!-- Title -->
          <span class="mdl-layout-title">Graf alternatiu FME</span>
        </div>
      </header>
      <main class="mdl-layout__content">
        <div class="page-content mdl-shadow--4dp">
          <form action="auth.php" method="POST">
            <div class="mdl-textfield mdl-textfield--floating-label mdl-js-textfield"><input class="mdl-textfield__input" type="password" name="password" id="password"><label class="mdl-textfield__label" for="password">Contrasenya</label></div>
            <p><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" type="submit">Entrar</button></p>
          </form>
        </div>
      </main>
    </div>
    <div class="mdl-snackbar mdl-js-snackbar"><div class="mdl-snackbar__text"></div><button type="button" class="mdl-snackbar__action"></button></div>
    
    <script src="https://code.getmdl.io/1.3.0/material.min.js"></script> 

    <?php
    if (isset($_GET["msg"])) {
      if  ($_GET["msg"] == "wrong") {
        $msg = "Contrasenya incorrecta";
      } elseif ($_GET["msg"] == "timeout") {
        $msg = "Sessió expirada";
      }
      echo "<script>window.addEventListener('load', function() { var notification = document.querySelector('.mdl-js-snackbar'); notification.MaterialSnackbar.showSnackbar({ message: '$msg' }); });</script>";
    }
    ?>  
   </body>
</html>
