<?php
session_start();

require_once ("config.php");

$_SESSION["last_action_time"] = time();

if ($_SESSION["logged_in"]) {
  if (time() - $_SESSION["last_action_time"] > $conf["session_timeout"]) {
    $_SESSION["logged_in"] = false;
    header("Location: login.php?msg=timeout");
    exit();
  } else {
    header("Location: graf.php");
    exit();
  }
} elseif ($_POST["password"] == $conf["password"]) {
  $_SESSION["logged_in"] = true;
  header("Location: graf.php");
  exit();
} elseif (isset($_POST["password"])) {
  header("Location: login.php?msg=wrong");
  exit();
} else {
  header("Location: login.php?msg=dbg");
  exit();
}

?>
