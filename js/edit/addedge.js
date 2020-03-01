const Modes = Object.freeze({
  "SEARCH" : 0, 
  "ADD_EDGE" : 1
});

function addEdge(x, y) {
  if (parseInt(x) == parseInt(y)) {
    alert("No es pot fer una aresta d'un node a ell mateix");
    
  } else {
    var edgeName = Math.min(x, y) + "_" + Math.max(x, y);
    if (!graf.edges[edgeName]) {
      var a = Math.min(x, y);
      var b = Math.max(x, y);
      xhr("POST", API_URL, "action=add_edge&a="+String(a)+"&b="+String(b), function(responseText, status) {
        var ans = JSON.parse(responseText);
        console.log(responseText);
        if (parseInt(ans.status) == 0) {
          graf.edges[edgeName] = {
            votes: 1,
            a: a,
            b: b,
          };
          s.graph.addEdge({
            id: edgeName,
            source: a,
            target: b,
            size: 0.5,
            vots: 1
          });
          s.refresh();
          var not = document.querySelector('.mdl-js-snackbar');
          not.MaterialSnackbar.showSnackbar({ message: 'Aresta afegida!' });
        } else {
          alert(ans.msg);
        }
      });
      
    } else {
      alert("L'aresta ja existeix");
    }
  }
  
  // Empty the input bar
  document.querySelector("#search-input").value = "";
  document.querySelector(".md-google-search__empty-btn").style.display = "none";
  
  // Return to default view
  dialog.close();
  setModeSearch();
  
}

function cancelAddEdge() {
  setModeSearch();   
}
