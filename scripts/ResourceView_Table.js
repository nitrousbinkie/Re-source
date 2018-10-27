($.fn.resourceview = function (d) {

    var html = "<div class=\"ResourceView\"><table>";

    let px = 210;
    let py = 10;

    let dayNames = [
        "",         // So they're where we would think they would be!!
        "Monday",   // 1
        "Tuesday",  // 2
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"    // 7!! \o/ 
    ]

    let date = new Date();
    let today = date.getDay();    

    html += "<tr><th class=\"FixedColumn\">&nbsp;</th>";
    for (var x = 0; x < 14; x++) {
        let day = (x > 6 ? x % 7 : x) + 1;
        if (x+1 == today) {
            html += "<th class=\"Today\">" + dayNames[day] + "</th>";
        }
        else {
            html += "<th>" + dayNames[day] + "</th>";
        }        
    }
    html += "</tr>";

    for (var u = 0; u < d.Users.length; u++) {
        //console.log(u);
        let user = d.Users[u];

        html += "<tr class=\"UserRow\"><th class=\"FixedColumn\">" + user.Name + "</th>";
        
        for (var x = 0; x < 14; x++) {

            let day = (x > 6 ? x % 7 : x) + 1;    // Day of week (by standard 1-indexed)

            //console.log("x: " + x + " -Day of week: " + day);

            // Since we're always looking ahead, the first instance of the current day of the week will be today.
            if (x + 1 == today) {
                html += "<td class=\"Today\">";
            }
            else {
                html += "<td " + (day > 5 ? "style=\"Background-color:#F0F0F0;\"" : "style=\"background-color:white;\"") + ">";
            }

            if (d.Users[u].Schedule && d.Users[u].Schedule.length > x) {
                if (d.Users[u].Schedule[x].Tasks) {
                    //console.log(d.Users[u].Name + " has a schedule");
                    
                    for (var t = 0; t < d.Users[u].Schedule[x].Tasks.length; t++) {
                        let task = d.Users[u].Schedule[x].Tasks[t];
                        //console.log(task.Label);
                        html += "<div class=\"Task " + task.State + "\" data-taskid=\"" + task.Id + "\">" + task.Label + "</div>";
                    }
                }
            }            
        }       
        html += "</tr>";
    }

    html += "<tr class=\"UserRow\"><th class=\"FixedColumn\">Events</th>";
    for (var x = 0; x < 14; x++) {
        html += "<td class=\"EventRow\">";
        if (d.Events[x].Tasks) {
            for (var t = 0; t < d.Events[x].Tasks.length; t++) {
                let task = d.Events[x].Tasks[t];
                html += "<div class=\"Task " + task.State + "\" data-taskid=\"" + task.Id + "\">" + task.Label + "</div>";
            }
        }
        html += "</td>";
    }
    html += "</tr>";

    html += "<tr class=\"UserRow\"><th class=\"FixedColumn\">Unallocated</th>";
    for (var x = 0; x < 14; x++) {
        html += "<td class=\"EventRow\">";
        if (x + 1 == today) {
            for (var t = 0; t < d.Unallocated.length; t++) {
                let task = d.Unallocated[t];
                html += "<div class=\"Task " + task.State + "\" data-taskid=\"" + task.Id + "\">" + task.Label + "</div>";
            }
        }        
        html += "</td>";
    }
    html += "</tr>";

    html += "</table></div>";

    this.html(html);
    $(".ResourceView .Task").click(function () {
        let t = $(this).attr("data-taskid");

        let w = $("<div>");
        w.taskview({Id:t});
    })
    $(".ResourceView .UserRow th").css("height", $(this).next().height() + "px");

    return this;
});