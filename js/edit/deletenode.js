 
function xhr_delete_node(responseText, status) {
  var ans = JSON.parse(responseText);
  console.log(responseText);
  if (parseInt(ans.status) == 0) {
    var id = parseInt(ans.par.id);
    
    delete graf.nodes[id];
    s.graph.dropNode(id);
    s.refresh();
    
    showMsg("Node eliminat");
    
  } else {
    alert(ans.msg);
  }
  
}
 
function ajax_delete_node(id) {
  xhr("POST", API_URL, "action=del_node&id="+String(id), xhr_delete_node);
  
}
