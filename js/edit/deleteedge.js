function xhr_delete_edge(responseText, status) {
  let ans = JSON.parse(responseText);
  console.log(responseText);
  if (parseInt(ans.status) == 0) {
    let id = String(ans.par.a)+"_"+String(ans.par.b);
    
    delete graf.edges[id];
    s.graph.dropEdge(id);
    s.refresh();
    
    showMsg("Aresta eliminada");
    
  } else {
    alert(ans.msg);
  }
  
}
 
function ajax_delete_edge(id) {
  let [a, b] = id.split("_");
  if(a > b) {
    let aux = a;
    a = b;
    b = aux;
  }
  xhr("POST", API_URL, "action=del_edge&a="+a+"&b="+b, xhr_delete_edge);
} 
