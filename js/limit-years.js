// *********** HERE STARTS limit-years.js *************

var limitYears = false;
var showYears = new Set();

function repaint(old_mode = false) {
    //targetYear: graf.nodes[e.source].year,
    if (limitYears) {
        var visible_nodes = new Set();

        s.graph.nodes().forEach(function (n) {
            var numNeig = old_mode ? s.graph.numNeighborsFromYears(n.id, showYears) : 1;

            var ne = s.graph.neighbors(n.id);
            var keys = Object.keys(ne);

            /* TODO: maybe remove?
            var hasFriend = false;
            for (var i=0; i<keys.length; i++) {
                if (showYears.has("" + ne[keys[i]].year)) hasFriend = true;
            }
            */

            // to make inclusive, decomment 1 and comment 2
            if (	//!hasFriend &&
                (numNeig == 0
                    || (n.year == 0 && (n.sex == 'F' || n.sex == 'M'))
                    || (!showYears.has("" + n.year) && (n.year != 0)))) {
                n.hidden = true;
            } else {
                n.hidden = false;
                visible_nodes.add(n.id);
            }

        });

        s.graph.edges().forEach(function (e) {
            if (visible_nodes.has(e.source) || visible_nodes.has(e.target)) {
                e.hidden = false;
            } else e.hidden = true;
        });
    } else {
        s.graph.nodes().forEach(function (n) {
            n.hidden = false;
        });

        s.graph.edges().forEach(function (e) {
            e.hidden = false;
        });
    }
}

function first_day(year) {
    start_course = new Date(year + '-09-01');
    return start_course;
}


function addYearList() {
    var ylistspan = document.querySelector("#year-list-span")
    var year = 2007;
    var today = new Date();
    while (first_day(year) < today) {

        var checkbox = document.getElementById("checkbox-" + String(year));

        if (checkbox != null) {
            checkbox.addEventListener("change", function () {
                limitYears = true;

                if (this.checked) {
                    showYears.add(this.name);
                } else {
                    showYears.delete(this.name);
                }

                if (showYears.size == 0) limitYears = false;

                repaint();

                s.refresh();
            });
        } else {
            console.error("Year" + String(year) + "checkbox is null");
        }

        ++year;
    }

}

function deactivateTab(btn) {
    if (document.getElementById(btn).classList.contains('active'))
        document.getElementById(btn).classList.toggle('active');
}

function activateTab(btn) {
    document.getElementById(btn).classList.add("active");
}

var configDialog = {
    show: function () {
        if (window.innerWidth > 700) {
            document.querySelector("#config-dialog").style.display = "block";
            document.querySelector("#backdrop-container").style.display = "block";

        } else {
            document.querySelector("#config-dialog").style.margin = "10px";
            document.querySelector("#config-dialog").style.width = "Calc(100% - 20px)";
            document.querySelector("#config-dialog").style.height = "Calc(100% - 10px)";
            document.querySelector("#config-dialog").style.display = "block";
        }
    },

    close: function () {
        document.querySelector("#config-dialog").style.display = "none";
        document.querySelector("#backdrop-container").style.display = "none";

    },

    changeEdit: function () {
        document.querySelector("#year-selection").style.display = "none";
        document.querySelector("#edit-options").style.display = "block";
        deactivateTab("years-tab");
        activateTab("edit-tab");
    },

    changeYears: function () {
        document.querySelector("#year-selection").style.display = "block";
        document.querySelector("#edit-options").style.display = "none";
        deactivateTab("edit-tab");
        activateTab("years-tab");

    }
};

function initConfig() {
    document.querySelector("#settings").addEventListener("click", function () {
        if (document.querySelector("#config-dialog").style.display == "none")
            configDialog.show();
        else configDialog.close();
    });

    document.querySelector("#config-quit-dialog").addEventListener("click", configDialog.close);

    document.querySelector("#edit-tab-btn").addEventListener("click", configDialog.changeEdit);
    document.querySelector("#years-tab-btn").addEventListener("click", configDialog.changeYears);
}
