
function rankingLios() {
  var c = [];
  var mdeg = 0;
  
  s.graph.nodes().forEach(function(n) {
    if (n.year >= 2015) c.push(n);
  });
  
  c.sort(function(a, b) {
    var na = s.graph.numNeighbors(a.id);
    var nb = s.graph.numNeighbors(b.id);
    
    var va = s.graph.numVots(a.id);
    var vb = s.graph.numVots(b.id);
    if (na == nb) return vb - va;
    else return nb - na;
  });
  
  
  return c.splice(0, 20);
}

function numNodes() {
  return Object.keys(s.graph.nodes()).length;
}

function numEdges() {
  return Object.keys(s.graph.edges()).length;
}

function dictionaryIds() {
  var dict = new Map();
  var it = 0;
  s.graph.nodes().forEach(function(n) {
    if (!dict.has(n.id))dict[n.id] = it++;
  });
  
  return dict;
}

function parseGraphAdjMatrix() {
  var n = numNodes();
  var memo = Array(n).fill(0).map(() => new Array(n).fill(0));
  var dict = dictionaryIds();
  
  s.graph.edges().forEach(function(e) {  
    memo[dict[e.target]][dict[e.source]] = 1;
    memo[dict[e.source]][dict[e.target]] = 1;
  });
  
  return memo;
}

function diameter() {
  var n = numNodes();
  var INF = 1000000;
  var memo = Array(n).fill(INF).map(() => new Array(n).fill(INF));
  var G = parseGraphAdjMatrix();
  var dict = dictionaryIds();

  
  for (var i=0; i<n; i++) {
    for (var j=0; j<n; j++) {
      
      if (G[i][j] == 1) memo[i][j] = 1;
      if (i == j) memo[i][j] = 0;
    
    }
  }
  
  for (var k=0; k<n; k++) {
    for (var i=0; i<n; i++) {
      for (var j=0; j<n; j++) {
        
        if (memo[i][k] + memo[k][j] < memo[i][j]) {
          memo[i][j] = memo[i][k] + memo[k][j]; 
        }
      
      }
    }
  }
  
  //console.log(memo[dict[606]][dict[2]]);
  var mx = 0;
  for (var i=0; i<n; i++) {
    for (var j=0; j<n; j++) {
      if (mx < memo[i][j] && memo[i][j] != INF) mx = memo[i][j];
    }
  }
  
  for (var i=0; i<n; i++) {
    for (var j=i+1; j<n; j++) {
      if (mx == memo[i][j]) {
        /*
        s.graph.nodes().forEach(function(n){
          if(n.id == Object.keys(dict)[i]) console.log(n);
          if(n.id == Object.keys(dict)[j]) console.log(n);
        });*/
      }
    }
  }

  
  return mx;
}

function initStats() {
  document.querySelector("#stats").addEventListener("click", function() {
    if (document.querySelector("#stats-dialog").style.display == "none") 
      statsDialog.show();
    else statsDialog.close();
  });
  
  document.querySelector("#stats-quit-dialog").addEventListener("click", statsDialog.close);
  
  console.log("nodes: " + numNodes());
  console.log("edges: " + numEdges());
  //console.log("diameter: " + diameter());
}

