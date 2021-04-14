var statsDialog = {
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
    show: function() {
        //this.fill("section-name", "Ranking");
        //this.fill("section-name", "Ranking Vots");

        var rank = rankingLios();
        //var rank = rankingVots();
        var list = "";
        var it = 0;
        var it2 = 1;
        var last = 0;
        rank.forEach(function (a) {
            it++;
            if (it != 1 && last != s.graph.numNeighbors(a.id)) it2 = it;
            last = s.graph.numNeighbors(a.id);
            if (it == 1) {
                list += "<li style='border-radius:5px;margin-left: 20%; margin-right: 20%; background-color: gold; list-style-type: none; float: left; width: 30%; text-align:center;margin-top: 20px'>" + a.label.split(' ')[0] + "</li>";
                list += "<li style='float: left; width: 30%; list-style-type: none; text-align:center;margin-top: 20px'><b>" + s.graph.numNeighbors(a.id) + "</b></li>";
            }
            else if (it == 2) {
                list += "<li style='border-radius:5px;margin-left: 10%; margin-right: 10%; background-color: silver; list-style-type: none; float: left; width: 50%; text-align:center;'>" + a.label + "</li>";
                list += "<li style='float: left; width: 30%; list-style-type: none; text-align:center;'><b>" + s.graph.numNeighbors(a.id) + "</b></li>";
            }
            else if (it == 3) {
                list += "<li style='border-radius:5px;background-color: #CD7F32; list-style-type: none; float: left; width: 70%; text-align:center;' margin-bottom: 20px>" + a.label + "</li>";
                list += "<li style='float: left; width: 30%; list-style-type: none; text-align:center; margin-bottom: 20px'><b>" + s.graph.numNeighbors(a.id) + "</b></li>";
            }
            else if(it == 20) {
                list += "<li style='float: left; width: 70%; margin-bottom: 20px;list-style-type: none;'>" + it2 + ". " + a.label + "</li>";
                list += "<li style='float: left; width: 30%; list-style-type: none; text-align:center; margin-bottom: 20px'><b>" + s.graph.numNeighbors(a.id) + "</b></li>";
            }
            else {
                list += "<li style='float: left; width: 70%; list-style-type: none'>" + it2 + ". " + a.label + "</li>";
                list += "<li style='float: left; width: 30%; list-style-type: none; text-align:center;'><b>" + s.graph.numNeighbors(a.id) + "</b></li>";
            }
            //list += "<li><b>" + a.label + " - " + s.graph.numVots(a.id) + "</li>";
        });
        this.fill("section-ranking", list, true);

        if (window.innerWidth > 700) {
            document.querySelector("#stats-dialog").style.display = "block";
            document.querySelector("#backdrop-container").style.display = "block";

        } else {
            document.querySelector("#stats-dialog").style.margin = "10px";
            document.querySelector("#stats-dialog").style.width = "Calc(100% - 20px)";
            document.querySelector("#stats-dialog").style.height = "Calc(100% - 10px)";
            document.querySelector("#stats-dialog").style.display = "block";
        }
    },
    close: function() {
        document.querySelector("#stats-dialog").style.display = "none";
        document.querySelector("#backdrop-container").style.display = "none";

    }
};
