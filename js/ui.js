function showMsg(msg) {
  var not = document.querySelector('.mdl-js-snackbar');
  not.MaterialSnackbar.showSnackbar({ message: msg });
}

function initUI() {
    if(isTouchDevice())  {
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
  show("addedge-box");
  
}

function modeShow() {
  show("stats");
  hide("add");
  hide("editnode-box");
  hide("addedge-box");
  
}

function editModeBtnChanged() {
  if (document.getElementById("edit-toggle").checked) {
    modeEdit();
  } else {
    modeShow();
  }
}

function initButtons() {
  
  //edit buttons
  document.querySelector("#add").addEventListener("click", nodeEditDialog.openAdd);
  document.querySelector("#accept").addEventListener("click", endMove);
  document.querySelector("#cancel").addEventListener("click", cancelBtn);
  
  //config toggle
  document.querySelector("#edit-toggle").addEventListener("change", editModeBtnChanged);
 
  //zoom buttons
  if(!isTouchDevice()) {
    document.querySelector("#zoomin").addEventListener("click", cameraZoomIn);
    document.querySelector("#zoomout").addEventListener("click", cameraZoomOut);
  }
  
  
  //Buttons in the info dialog 
  document.querySelector("#quit-dialog").addEventListener("click", nodeInfoDialog.close);
  document.querySelector("#quit2-dialog").addEventListener("click", nodeInfoDialog.close);
  document.querySelector("#max-dialog").addEventListener("click", nodeInfoDialog.max);
  document.querySelector("#min-dialog").addEventListener("click", nodeInfoDialog.min);
  document.querySelector("#editnode-button").addEventListener("click",nodeEditDialog.openEdit);
  document.querySelector("#deletenode-button").addEventListener("click",nodeInfoDialog.deleteNode);
  document.querySelector("#addedge-button").addEventListener("click", nodeInfoDialog.addEdge);
  document.querySelector("#deleteedge-button").addEventListener("click", deleteEdgeDialog.open);
  
  //Buttons in the edit/add dialog
  document.querySelector("#canceledit-button").addEventListener("click",nodeEditDialog.close);
  document.querySelector("#saveedit-button").addEventListener("click",nodeEditDialog.save);
  document.querySelector("#movenode-button").addEventListener("click",startMove);
  
  //Buttons in the delete edge dialog
  document.querySelector("#canceledge-button").addEventListener("click",deleteEdgeDialog.close);
  document.querySelector("#savedelete-button").addEventListener("click",deleteEdgeDialog.send);
}

