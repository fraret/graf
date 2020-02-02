// *********** HERE STARTS dialog.js *************

const EditModes = Object.freeze({
  "ADD" : 0, 
  "EDIT" : 1
});

var editMode = EditModes.EDIT;

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

    var list = "";
    neighbors.forEach(function (a) {
      list += "<li><b>"+graf.nodes[id].name+" - "+a.label+":</b> "+(graf.edges[id+"_"+a.id] ? graf.edges[id+"_"+a.id].votes : graf.edges[a.id+"_"+id].votes)+" vots</li>";
    });
    this.fill("edges", list, true);

    if (window.innerWidth > 700) {
      document.querySelector("#dialog").style.display = "block";
      document.querySelector("#backdrop-container").style.display = "block";
    } else {
      document.querySelector("#summary-dialog").style.display = "block";
    }
  },
  close: function() {
    document.querySelector("#dialog").style.display = "none";
    document.querySelector("#summary-dialog").style.display = "none";
    document.querySelector("#backdrop-container").style.display = "none";

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
    document.querySelector("#summary-dialog").style.display = "none";
    document.querySelector("#dialog").style.display = "block";
  },
  min: function() {
    document.querySelector("#dialog").style.display = "none";
    document.querySelector("#summary-dialog").style.display = "block";
  },
  addEdge: function() { 
    document.querySelector("#edge-list").style.display = "none";
    setModeAddEdge();
    dialog.close();
    lastNode = document.getElementById("node-id").innerText.substr(1);
    // Focus on the addEdge input bar
   document.querySelector("#search-input").focus();
  }
  
};

var editDialog = {
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
  close: function() {
    document.querySelector("#edit-dialog").style.display = "none";
  },
  openEdit: function() {
    lastNode = document.getElementById("node-id").innerText.substr(1);
    var id = lastNode;
    dialog.close();
    document.getElementById("input-name").parentElement.MaterialTextfield.change(graf.nodes[id].name);
    document.getElementById("input-year").value = graf.nodes[id].year;
    document.getElementById("input-sex").value = graf.nodes[id].sex;
    editDialog.fill("edit-title","Edita");
    document.querySelector("#edit-dialog").style.display = "block";
    editMode = EditModes.EDIT;
    lastNode = document.getElementById("node-id").innerText.substr(1);
  },
  save: function() {
    if(editMode == EditModes.EDIT) {
      var id = lastNode;
      var name = document.getElementById("input-name").value;
      var year = document.getElementById("input-year").value;
      var sex = document.getElementById("input-sex").value;
      
      xhr("POST", "ns/inserter.php", "action=edit_node&id="+String(id)+"&name="+name+"&year="+String(year)+"&sex="+sex, function(responseText, status) {
        var ans = JSON.parse(responseText);
        console.log(responseText);
        if (parseInt(ans.status) == 0) {
          graf.nodes[id] = {
            name: name,
            year: year,
            sex: sex,
          };
          s.graph.nodes(id).label = name;
          s.graph.nodes(id).year = year;
          s.graph.nodes(id).sex = sex;
          s.refresh();
          var not = document.querySelector('.mdl-js-snackbar');
          not.MaterialSnackbar.showSnackbar({ message: 'Node modificat!' });
        } else {
          alert(ans.msg);
        }
      });
      
      
      editDialog.close();
    } else {
    }
  }
}

function initDialog() {
  document.querySelector("#quit-dialog").addEventListener("click", dialog.close);
  document.querySelector("#quit2-dialog").addEventListener("click", dialog.close);
  document.querySelector("#max-dialog").addEventListener("click", dialog.max);
  document.querySelector("#min-dialog").addEventListener("click", dialog.min);
  document.querySelector("#addedge-button").addEventListener("click", dialog.addEdge);
  document.querySelector("#editnode-button").addEventListener("click",editDialog.openEdit);
  document.querySelector("#canceledit-button").addEventListener("click",editDialog.close);
  document.querySelector("#saveedit-button").addEventListener("click",editDialog.save);
}

