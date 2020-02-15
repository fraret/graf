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
      
      ajax_edit_node(id,name,year,sex);
      
      editDialog.close();
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

function initEditDialog() {
  document.querySelector("#editnode-button").addEventListener("click",editDialog.openEdit);
  document.querySelector("#canceledit-button").addEventListener("click",editDialog.close);
  document.querySelector("#saveedit-button").addEventListener("click",editDialog.save);
  document.querySelector("#movenode-button").addEventListener("click",startMove);
    
}
