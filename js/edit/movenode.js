var moveUpdater = null;
var moving = false;

function updateMove() {
  var x = Math.round(s.camera.x);
  var y = Math.round(s.camera.y);
  
  s.graph.nodes(lastNode)["x"] = x;
  s.graph.nodes(lastNode)["originalX"] = x;
  s.graph.nodes(lastNode)["read_cam0:x"] = x;
  
  s.graph.nodes(lastNode)["y"] = y;
  s.graph.nodes(lastNode)["originalY"] = y;
  s.graph.nodes(lastNode)["read_cam0:y"] = y;
  
  s.refresh();
}

function resetNodePosition(id) {
  var x = graf.nodes[id].x;
  y = graf.nodes[id].y;
  s.graph.nodes(lastNode)["x"] = x;
  s.graph.nodes(lastNode)["originalX"] = x;
  s.graph.nodes(lastNode)["read_cam0:x"] = x;
  
  s.graph.nodes(lastNode)["y"] = y;
  s.graph.nodes(lastNode)["originalY"] = y;
  s.graph.nodes(lastNode)["read_cam0:y"] = y;
  
  s.refresh();
}

function startMove() {
  dialog.close();
  editDialog.close();
  lastNode = openedNode;
  var id = lastNode;
  moveUpdater = setInterval(updateMove, 500);
  moving = true;
  showMoveBtns();
}

function xhr_move_node(responseText, status) {
  var ans = JSON.parse(responseText);
  console.log(responseText);
  
  if (parseInt(ans.status) == 0) {
    var id = ans.par.id;
    var x = ans.par.id;
    var y = ans.par.id;
    
    graf.nodes[id].x = x;
    graf.nodes[id].y = y;
    var not = document.querySelector('.mdl-js-snackbar');
    not.MaterialSnackbar.showSnackbar({ message: 'Node desplaçat!' });
  } else {
    alert(ans.msg);
    
    resetNodePosition(lastNode);
  }
}

function ajax_mode_node(id,x,y) {
  xhr("POST", API_URL, "action=move_node&id="+String(id)+"&x="+String(x)+"&y="+String(y), xhr_move_node);
}


function endMove() {
  if (moving) {
    clearInterval(moveUpdater);
    setTimeout(endMove2, 500);
    moving = false;
    hideMoveBtns();
  } else {
    console.log("Tried to end move when not moving");
  }
}

function cancelMove() {
  if (moving) {
    clearInterval(moveUpdater);
    moving = false;
    resetNodePosition(lastNode);
    hideMoveBtns();
  } else {
    console.log("Tried to cancel move when not moving");
  }
}

function endMove2() {
  var x = Math.round(s.camera.x);
  var y = Math.round(s.camera.y);
  
  updateMove();
  
  ajax_mode_node(lastNode,x,y);
}



