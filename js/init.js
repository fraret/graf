// *********** HERE STARTS init.js *************
const API_URL = "api/api.php";

function initPre() {
  initGraf();
  addYearList();
  initConfig();
}

function initPost() {
  initCamera();
  initUI();
  initButtons();
  initSearchBar();
  initStats();
  modeShow();
}

window.addEventListener("load", initPre);
