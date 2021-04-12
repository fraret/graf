<?php
$conf = parse_ini_file("config.ini");
if ($conf === false) {
  syslog(LOG_EMERG, "Configuration file for graf frontend not found, program aborts");
  exit(1);
}
?>
