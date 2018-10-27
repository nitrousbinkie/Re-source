($.fn.resourceview = function (d) {

    var html = "<svg top=\"0px\" left=\"0px\" width=\"100%\" height=\"100%\" viewbox=\"0 0 1920 1080\">";

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
    
    for (var x = 0; x < 14; x++) {
        html += "<rect x=\"" + px + "px\" y=\"" + py + "px\" width=\"150px\" height=\"30px\" stroke=\"#c0c0c0\" fill=\"none\"/>";
        px += 75;   // Half    
        html += "<text text-anchor=\"middle\" x=\"" + px + "\" y=\"" + (py + 20) + "\" stroke=\"none\" fill=\"#004040\" font-size=\"10pt\">" + dayNames[(x > 6 ? x % 7 : x)+1] + "</text>";
        px += 75;   // The other half
    }
    py += 30;
    
    for (var u = 0; u < d.Users.length; u++) {
        //console.log(u);
        px = 10;
        html += "<rect x=\"" + px + "\" y=\"" + py + "\" width=\"200px\" height=\"45px\" stroke=\"#C0C0C0\" fill=\"none\"/>";
        px += 75;
        html += "<text text-anchor=\"left\" x=\"" + px + "\" y=\"" + (py+30) + "\" stroke=\"none\" fill=\"#004040\" font-size=\"12pt\">" + d.Users[u].Name + "</text>";
        
        px = 210;
        for (var x = 0; x < 14; x++) {
            var day = (x > 6 ? x % 7 : x) + 1;    // Day of week (by standard 1-indexed)
            //console.log(day);
            if (x+1 == today) {
                html += "<rect x=\"" + px + "px\" y=\"" + py + "px\" width=\"150px\" height=\"45px\" stroke=\"#C0C0C0\" fill=\"#00a0a0\" fill-opacity=\"0.2\" />";
            }
            else {
                html += "<rect x=\"" + px + "px\" y=\"" + py + "px\" width=\"150px\" height=\"45px\" stroke=\"#C0C0C0\" fill=\"" + (day > 5 ? "#505050" : "#FFFFFF") + "\" fill-opacity=\"0.2\" />";
            }
            

            if (d.Users[u].Schedule && d.Users[u].Schedule.length > x) {
                if (d.Users[u].Schedule[x].Tasks) {
                    console.log(d.Users[u].Name + " has a schedule");
                    let offset = 0;
                    for (var t = 0; t < d.Users[u].Schedule[x].Tasks.length; t++) {
                        var task = d.Users[u].Schedule[x].Tasks[t];
                        console.log(task.Label);
                        html += "<rect x=\"" + (px + 3) + "px\" y=\"" + (py + offset + 3) + "px\" width=\"144px\" height=\"14px\" stroke=\"" + task.Color + "\" stroke-width=\"1px\" fill=\"" + task.Color + "\" fill-opacity=\"0.2\" />";
                        html += "<text text-anchor=\"middle\" x=\"" + (px + 75) + "\" y=\"" + (py + offset + 15) + "\" stroke=\"none\" fill=\"" + task.Color + "\" font-size=\"10pt\" onclick=\"alert('" + task.Label + "');\">" + task.Label + "</text>";

                        offset += 25;
                    }
                }
            }
            px += 150;
        }
        py += 45;
    }

    html += "</svg>";

    this.html(html);

    return this;
});