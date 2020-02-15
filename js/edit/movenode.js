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

function startMove() {
  dialog.close();
  editDialog.close();
  lastNode = document.getElementById("node-id").innerText.substr(1);
  var id = lastNode;
  moveUpdater = setInterval(updateMove, 500);
}

function xhr_move_node(responseText, status) {
  var ans = JSON.parse(responseText);
  console.log(responseText);
  if (parseInt(ans.status) == 0) {
    graf.nodes[id].x = x;
    graf.nodes[id].y = y;
    var not = document.querySelector('.mdl-js-snackbar');
    not.MaterialSnackbar.showSnackbar({ message: 'Node desplaçat!' });
  } else {
    alert(ans.msg);
    
    x = graf.nodes[id].x;
    y = graf.nodes[id].y;
    s.graph.nodes(lastNode)["x"] = x;
    s.graph.nodes(lastNode)["originalX"] = x;
    s.graph.nodes(lastNode)["read_cam0:x"] = x;
    
    s.graph.nodes(lastNode)["y"] = y;
    s.graph.nodes(lastNode)["originalY"] = y;
    s.graph.nodes(lastNode)["read_cam0:y"] = y;
    
    s.refresh();
    
  }
}

function ajax_mode_node(id,x,y) {
  xhr("POST", "ns/inserter.php", "action=move_node&id="+String(id)+"&x="+String(x)+"&y="+String(y), xhr_move_node);
}


function endMove() {
  clearInterval(moveUpdater);
  setTimeout(endMove2, 500);
  
}

function endMove2() {
  var x = Math.round(s.camera.x);
  var y = Math.round(s.camera.y);
  
  updateMove();
  
  var id = lastNode;
  
  ajax_mode_node(id,x,y);
}


