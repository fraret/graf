// *********** HERE STARTS dialog.js *************

const EditModes = Object.freeze({
  "ADD" : 0, 
  "EDIT" : 1
});

var editMode = EditModes.EDIT;

var moveUpdater = null;

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
  },
  openAdd: function() {
    dialog.close();
    editDialog.fill("edit-title","Afegeix");
    document.querySelector("#edit-dialog").style.display = "block";
    editMode = EditModes.ADD;
  },
  save: function() {
    document.getElementById("edit-dialog").style.cursor = "wait";
    if(editMode == EditModes.EDIT) {
      var id = lastNode;
      var name = document.getElementById("input-name").value;
      var year = document.getElementById("input-year").value;
      var sex = document.getElementById("input-sex").value;
      
      xhr("POST", "ns/inserter.php", "action=edit_node&id="+String(id)+"&name="+name+"&year="+String(year)+"&sex="+sex, function(responseText, status) {
        var ans = JSON.parse(responseText);
        console.log(responseText);
        if (parseInt(ans.status) == 0) {
          var ncolor = null;
          if(sex =="F") ncolor = "#d61c08";
          else if(sex == "M") ncolor = "#0159aa";
          else ncolor = "#0ca80a";
          graf.nodes[id].name = name;
          graf.nodes[id].year = year;
          graf.nodes[id].sex = sex;
          s.graph.nodes(id).label = name;
          s.graph.nodes(id).year = year;
          s.graph.nodes(id).sex = sex;
          s.graph.nodes(id).color = ncolor;
          s.graph.nodes(id).originalColor = ncolor;
          s.refresh();
          var not = document.querySelector('.mdl-js-snackbar');
          not.MaterialSnackbar.showSnackbar({ message: 'Node modificat!' });
        } else {
          alert(ans.msg);
        }
      });
      
      
      editDialog.close();
    } else {
      var name = document.getElementById("input-name").value;
      var year = document.getElementById("input-year").value;
      var sex = document.getElementById("input-sex").value;
      var x = Math.round(s.camera.x);
      var y = Math.round(s.camera.y);
      xhr("POST", "ns/inserter.php", "action=add_node&id="+String(id)+"&name="+name+"&year="+String(year)+"&sex="+sex+"&x="+String(x)+"&y="+String(y), function(responseText, status) {
        var ans = JSON.parse(responseText);
        console.log(responseText);
        if (parseInt(ans.status) == 0) {
          var id = ans.par.id
          
          
          
          var ncolor = null;
          if(sex =="F") ncolor = "#d61c08";
          else if(sex == "M") ncolor = "#0159aa";
          else ncolor = "#0ca80a";
          graf.nodes[id] = {
            id: id,
            name: name,
            year: year,
            sex: sex,
            x: x,
            y: y
          };
          
          s.graph.addNode({
            // we add color, originalColor, size, originalX..Y, circleX..Y atributes
            id: id,
            year: year,
            sex: sex,
            label: name,
            x: x,
            y: y,
            originalX: x,
            originalY: y,
            size: 10,
            color: ncolor,
            originalColor: ncolor
          });
            
          s.refresh();
          var not = document.querySelector('.mdl-js-snackbar');
          not.MaterialSnackbar.showSnackbar({ message: 'Node afegit!' });
        } else {
          alert(ans.msg);
        }
        editDialog.close();
      });
    }
    document.getElementById("edit-dialog").style.cursor = "default";
  }
}

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

function endMove2() {
  var x = Math.round(s.camera.x);
  var y = Math.round(s.camera.y);
  
  updateMove();
  
  var id = lastNode;
  
  xhr("POST", "ns/inserter.php", "action=move_node&id="+String(id)+"&x="+String(x)+"&y="+String(y), function(responseText, status) {
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
      });
  
  
}

function endMove() {
  clearInterval(moveUpdater);
  setTimeout(endMove2, 500);
  
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
  document.querySelector("#movenode-button").addEventListener("click",startMove);
}

