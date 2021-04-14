var nodeEditDialog = {
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
    hide("edit-dialog");
  },
  openEdit: function() {
    lastNode = openedNode;
    var id = lastNode;
    nodeInfoDialog.close();
    document.getElementById("input-name").parentElement.MaterialTextfield.change(graf.nodes[id].name);
    document.getElementById("input-year").value = graf.nodes[id].year;
    document.getElementById("input-sex").value = graf.nodes[id].sex;
    nodeEditDialog.fill("edit-title","Edita");
    show("edit-dialog");
    editMode = EditModes.EDIT;
  },
  openAdd: function() {
    nodeInfoDialog.close();
    nodeEditDialog.fill("edit-title","Afegeix");
    show("edit-dialog");
    editMode = EditModes.ADD;
  },
  save: function() {
    document.getElementById("edit-dialog").style.cursor = "wait";
    if(editMode == EditModes.EDIT) {
      var id = lastNode;
      var name = document.getElementById("input-name").value;
      var year = document.getElementById("input-year").value;
      var sex = document.getElementById("input-sex").value;
      
      ajax_edit_node(id,name,year,sex);
      
      nodeEditDialog.close();
    } else {
      var name = document.getElementById("input-name").value;
      var year = document.getElementById("input-year").value;
      var sex = document.getElementById("input-sex").value;
      var x = Math.round(s.camera.x);
      var y = Math.round(s.camera.y);
      
      ajax_add_node(id,name,year,sex,x,y);
      
    }
    document.getElementById("edit-dialog").style.cursor = "default";
  }
}
