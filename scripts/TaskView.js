($.fn.taskview = function (d) {
    //alert("View Task " + d.Id);

    // TODO: Perform an Ajax get of the task and render the html to display it
    let task = {
        Title: "This is a Test Task",
        State: "Planned",
        AssignedUsers: [
            {
                Id: 1, 
                Name: "Andres Martin"
            },
            {
                Id: 2,
                Name: "James Sumner"
            }
        ],
        Story: "This is the story for the task."
    }

    let mask = $("<div>");
    mask.addClass("TaskViewMask");

    let dialog = $("<div>");
    dialog.addClass("TaskView");

    mask.append(dialog);

    let heading = $("<div>");
    heading.text(task.Title);
    heading.addClass("TaskViewContent_Heading");
    let closeButton = $("<div>");
    closeButton.addClass("TaskViewContent_CloseButton");
    closeButton.text("X");
    closeButton.click(function () {
        mask.fadeOut(250);
    });
    heading.append(closeButton);
    dialog.append(heading);

    let statusPanel = $("<div>");
    statusPanel.addClass("TaskViewContent_StatusPanel")
    let state = $("<div>");
    state.addClass("TaskViewContent_State");
    state.text(task.State);
    statusPanel.append(state);
    for (var x = 0; x < task.AssignedUsers.length; x++) {
        let userDiv = $("<div>");
        userDiv.text(task.AssignedUsers[x].Name);
        userDiv.addClass("TaskViewContent_User");
        statusPanel.append(userDiv);
    }
    dialog.append(statusPanel);

    let storyPanel = $("<TextArea>");
    storyPanel.addClass("TaskViewContent_StoryPanel");
    storyPanel.text(task.Story);
    dialog.append(storyPanel);

    $(this).append(mask);
    $(this).appendTo("body");
    mask.fadeIn(250);


    return this;
});