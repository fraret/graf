// *********** HERE STARTS init.js *************

function init_pre() {
  initGraf();
  addYearList();
  initConfig();
}

function init_post() {
  initDialog();
  initEditDialog();
  initCamera();
  initSearchBar();
  initStats();
}

window.addEventListener("load", init_pre);
