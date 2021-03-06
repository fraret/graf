function populateDelEdgeDropdown(id) {
  var neighbors = Object.values(s.graph.neighbors(id));
  
  
  var list = "";
  neighbors.forEach(function (a) {
    list += "<option value=\""+ id+"_"+a.id +"\">"+graf.nodes[id].name+" - "+a.label+"</option>";
  });
  document.getElementById("input-edge").innerHTML = list;
  
  var t = document.getElementById("edge-div");
  t.MaterialSelectfield.init();
    
}

var deleteEdgeDialog = {
  open: function() {
    show("delete-dialog");
    nodeInfoDialog.close();
    hide("stats-dialog");
    hide("config-dialog");
    populateDelEdgeDropdown(openedNode);
  },
  close: function() {
    hide("delete-dialog");
  },
  send: function() {
    var name = document.getElementById("input-edge").value;
    deleteEdgeDialog.close();
    ajax_delete_edge(name);
  }
}
