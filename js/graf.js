// *********** HERE STARTS graf.js *************

// s is the sigma graph
// graf is the JSON graph
var s, graf;

// Function to query an online resource
// Later used to GET the JSON for the graph
function xhr(method, url, params, callback) {
  var http = new XMLHttpRequest();
  if (method == "POST") {
    http.open(method, url, true);
  } else {
    if (params != "") {
      http.open(method, url+"?"+params, true);
    } else {
      http.open(method, url, true);
    }
  }
  http.onload = function() {
    if(this.status != 200) {
      console.warn("Attention, status code "+this.status+" when loading via xhr url "+url);
    }
    callback(this.responseText, this.status);
  };
  if (method == "POST") {
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    http.send(params);
  } else {
    http.send();
  }
}

function colornode(nodeId) {
    
    toKeep = s.graph.neighbors(nodeId);
    //(de)Color nodes
    s.graph.nodes().forEach(function(n) {
        if (toKeep[n.id] || n.id == nodeId) {
          n.color = n.originalColor;
        } else {
          n.color = '#333';
        }
      });

    //(de)Color edges
      s.graph.edges().forEach(function(e) {
        if ((e.source == nodeId || e.target == nodeId) && (toKeep[e.source] || toKeep[e.target])) {
          e.color = '#fff';
        } else {
          e.color = '#333';
        }
      });
    
}

function initGraf() {
  // create new methods for sigma library
  updateSigma();

  // create graf, s is the sigma graf
  s = new sigma({
    renderers: [{
      container: "graf",
      type: "webgl"
    }],
    settings: {
      defaultEdgeColor: "#fff",
      edgeColor: "default",
      defaultLabelColor: "#fff",
      autoRescale: false,
      zoomMax: 30,
      // enableEdgeHovering: true,
      font: "Roboto",
      labelThreshold: 5
    }
  });


  // query for JSON for graph data
  xhr("GET", "api.php", "action=getgraf", function(responseText, status) {
    // graf is the JSON data
    graf = JSON.parse(responseText);


    var sizegraf = 0;
    for (var i in graf.nodes) {
      sizegraf++;
    }
    var nnode = 0;
    for (var i in graf.nodes) {
      var ncolor = null;


      if(graf.nodes[i].sex =="F") ncolor = "#d61c08";
      else if(graf.nodes[i].sex == "M") ncolor = "#0159aa";
      else ncolor = "#0ca80a";

      // post-processing for year corrections

      var y = graf.nodes[i].year;
      if(1970 < y && y < 2004) graf.nodes[i].year += 18;

      s.graph.addNode({
        // we add color, originalColor, size, originalX..Y, circleX..Y atributes
        id: graf.nodes[i].id,
        year: graf.nodes[i].year,
        sex: graf.nodes[i].sex,
        label: graf.nodes[i].name,
        x: graf.nodes[i].x,
        y: graf.nodes[i].y,
        originalX: graf.nodes[i].x,
        originalY: graf.nodes[i].y,
        size: 10,
        color: ncolor,
        originalColor: ncolor
      });

      nnode++;

    }

    for (var i in graf.edges) {

      s.graph.addEdge({
        id: i,
        source: graf.edges[i].a,
        target: graf.edges[i].b,
        size: Math.min(4, Math.max((7/(2*Math.pow(20, 2)))*Math.pow(graf.edges[i].votes, 2) + 1/2, 0.5)),
        vots: graf.edges[i].votes,
      });

    }
    
    s.bind('clickNode', function(e) {
      statsDialog.close();
      var nodeId = e.data.node.id;
      
      colornode(nodeId);

      s.refresh();
      dialog.show(nodeId, toKeep);
    });

    initDialog();
    initCamera();
    initSearchBar();

    s.refresh();
    autocomplete(document.querySelector("#search-input"), graf.nodes, "search");
    initStats();
  });
}


function updateSigma() {
  // returns set of neighouts
  sigma.classes.graph.addMethod("neighbors", function(nodeId) {
    var k,
    neighbors = {},
    index = this.allNeighborsIndex[nodeId] || [];

    for (k in index) {
      neighbors[k] = this.nodesIndex[k];
    }

    return neighbors;
  });

  // returns number of neighbours from a set of years
  sigma.classes.graph.addMethod("numNeighborsFromYears", function(nodeId, showYearsCopy) {
    var k,
    neighbors = 0,
    index = this.allNeighborsIndex[nodeId] || [];

    for (k in index) {
      if(this.nodesIndex){
        if (showYearsCopy.has("" + this.nodesIndex[k].year)) neighbors++;
        else if (this.nodesIndex[k].year == 0) neighbors++;
      }
    }

    return neighbors;
  });

  sigma.classes.graph.addMethod("numNeighbors", function(nodeId) {
     return Object.keys(s.graph.neighbors(nodeId)).length
  });

  
  sigma.classes.graph.addMethod("numVots", function(nodeId) {
    var vots = 0
    s.graph.edges().forEach(function(e) {

      if (e.source == nodeId) vots += e.vots;
      if (e.target == nodeId) vots += e.vots;
      
    });
    return vots;
  });


}
