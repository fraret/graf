function showMsg(msg) {
  var not = document.querySelector('.mdl-js-snackbar');
  not.MaterialSnackbar.showSnackbar({ message: msg });
}

function initUI() {
    if(is_touch_device())  {
    document.querySelector("#zoomin").style.display = "none";
    document.querySelector("#zoomout").style.display = "none";
    document.querySelector("#stats").style.bottom = "110px";
    document.querySelector("#cancel").style.bottom = "110px";
    document.querySelector("#add").style.bottom = "110px";
    document.querySelector("#accept").style.bottom = "160px";
    document.querySelector("#settings").style.bottom = "60px";
    document.querySelector("#search").style.bottom = "10px";
  }
    
}

function show(thing) {
  document.getElementById(thing).style.display= "block";
}

function hide(thing) {
  document.getElementById(thing).style.display= "none";
}

function cancelBtn() {
  if (moving) {
    cancelMove();
  } else {
    cancelAddEdge();
  }
}

function showMoveBtns() {
  show("accept");
  show("cancel");
  hide("add");
}

function hideMoveBtns() {
  hide("accept");
  hide("cancel");
  show("add");
}

function modeEdit() {
  hide("stats");
  show("add");
  show("editnode-box");
  show("addedge-button");
  
}

function modeShow() {
  show("stats");
  hide("add");
  hide("editnode-box");
  hide("addedge-button");
  
}

function editModeBtnChanged() {
  if (document.getElementById("edit-toggle").checked) {
    modeEdit();
  } else {
    modeShow();
  }
}

function initButtons() {
  
  document.querySelector("#add").addEventListener("click", editDialog.openAdd);
  document.querySelector("#accept").addEventListener("click", endMove);
  document.querySelector("#cancel").addEventListener("click", cancelBtn);
  document.querySelector("#edit-toggle").addEventListener("change", editModeBtnChanged);
  
  if(!is_touch_device()) {
    document.querySelector("#zoomin").addEventListener("click", cameraZoomIn);
    document.querySelector("#zoomout").addEventListener("click", cameraZoomOut);
  }
}

