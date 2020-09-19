// *********** HERE STARTS init.js *************
const API_URL = "api/api.php";

function init_pre() {
  initGraf();
  addYearList();
  initConfig();
}

function init_post() {
  initCamera();
  initUI();
  initButtons();
  initSearchBar();
  initStats();
  modeShow();
}

window.addEventListener("load", init_pre);
