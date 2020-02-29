function xhr_delete_edge(responseText, status) {
  var ans = JSON.parse(responseText);
  console.log(responseText);
  if (parseInt(ans.status) == 0) {
    var id = String(ans.par.a)+"_"+String(ans.par.b);
    
    delete graf.edges[id];
    s.graph.dropEdge(id);
    s.refresh();
    
    showMsg("Aresta eliminada");
    
  } else {
    alert(ans.msg);
  }
  
}
 
function ajax_delete_edge(id) {
  var spl = id.split("_");
  var a = spl[0];
  var b = spl[1];
  if(a > b) {
    var aux = a;
    a = b;
    b = aux;
  }
  xhr("POST", API_URL, "action=del_edge&a="+a+"&b="+b, xhr_delete_edge);
} 
