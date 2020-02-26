// *********** HERE STARTS init.js *************
var API_URL = "ns/inserter.php";

function init_pre() {
  initGraf();
  addYearList();
  initConfig();
}

function init_post() {
  initDialog();
  initEditDialog();
  initCamera();
  initUI();
  initButtons();
  initSearchBar();
  initStats();
  modeShow();
}

window.addEventListener("load", init_pre);
