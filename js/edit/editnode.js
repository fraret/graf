function xhr_edit_node(responseText, status) {
  var ans = JSON.parse(responseText);
  console.log(responseText);
  if (parseInt(ans.status) == 0) {
    var sex = ans.par.sex;
    var id = ans.par.id;
    var name = ans.par.name;
    var year = ans.par.year;
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
}

function ajax_edit_node(id,name,year,sex) {
  xhr("POST", "ns/inserter.php", "action=edit_node&id="+String(id)+"&name="+name+"&year="+String(year)+"&sex="+sex, xhr_edit_node);
}
