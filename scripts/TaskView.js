($.fn.taskview = function (d) {
    //alert("View Task " + d.Id);

    // Perform an Ajax get of the task and render the html to display it

    let mask = $("<div>");
    this.css("position", "fixed");
    this.css("top", "0px");
    this.css("left", "0px");
    this.css("bottom", "0px");
    this.css("right", "0px");
    this.css("display", "block");
    this.css("background-color", "rgba(0,0,0,0.8)");

    $(this).appendTo("body");
    

    return this;
});