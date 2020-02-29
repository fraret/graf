// *********** HERE STARTS dialog.js *************

const EditModes = Object.freeze({
  "ADD" : 0, 
  "EDIT" : 1
});

var editMode = EditModes.EDIT;

var openedNode = -2;

var dialog = {
  fill: function(data, text, html=false) {
    var el = document.querySelectorAll("*[data-fill=\""+data+"\"]");
    for (var i in el) {
      if (html === true) {
        el[i].innerHTML = text;
      } else {
        el[i].innerText = text;
      }
    }
  },
  show: function(id) {
    var neighbors = Object.values(s.graph.neighbors(id));
    this.fill("name", graf.nodes[id].name);
    this.fill("year", graf.nodes[id].year);
    this.fill("sex", graf.nodes[id].sex);
    this.fill("id", "#"+id);
    this.fill("n-edges", neighbors.length);
    
    openedNode = id;
    
    var list = "";
    neighbors.forEach(function (a) {
      list += "<li><b>"+graf.nodes[id].name+" - "+a.label+":</b> "+(graf.edges[id+"_"+a.id] ? graf.edges[id+"_"+a.id].votes : graf.edges[a.id+"_"+id].votes)+" vots</li>";
    });
    this.fill("edges", list, true);

    if (window.innerWidth > 700) {
      show("dialog");
      show("backdrop-container");
    } else {
      show("summary-dialog");
    }
  },
  close: function() {
    hide("dialog");
    hide("summary-dialog");
    hide("backdrop-container");

    s.graph.nodes().forEach(function(n) {
      n.color = n.originalColor;
    });

    s.graph.edges().forEach(function(e) {
      e.color = e.originalColor;
    });

    s.graph.nodes().forEach(function (n) {
      n.x = n.originalX;
      n.y = n.originalY;
      n.size = 10;
    });

    s.refresh();

  },
  max: function() {
    hide("summary-dialog");
    show("dialog");
  },
  min: function() {
    hide("dialog");
    show("summary-dialog");
  },
  addEdge: function() { 
    hide("edge-list");
    setModeAddEdge();
    dialog.close();
    lastNode = openedNode;
    // Focus on the addEdge input bar
   document.querySelector("#search-input").focus();
  },
  deleteNode: function() {
    dialog.close();
    ajax_delete_node(openedNode);
  }
  
};




