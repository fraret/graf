function xhr_add_node(responseText, status) {
  var ans = JSON.parse(responseText);
  console.log(responseText);
  if (parseInt(ans.status) == 0) {
    var id = ans.par.id
    var sex = ans.par.sex;
    var name = ans.par.name;
    var year = ans.par.year;
    var x = ans.par.x;
    var y = ans.par.y;
    
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
}

function ajax_add_node(id,name,year,sex,x,y) {
    xhr("POST", "ns/inserter.php", "action=add_node&id="+String(id)+"&name="+name+"&year="+String(year)+"&sex="+sex+"&x="+String(x)+"&y="+String(y), xhr_add_node);
    
    
}
