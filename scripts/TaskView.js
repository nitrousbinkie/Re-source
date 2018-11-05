($.fn.taskview = function (d) {

    var callback = function (view) {  // The view is the DOM element the taskview method was called on
        return function (task) {
            console.log(task);
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

            let descriptionPanel = $("<TextArea>");
            descriptionPanel.addClass("TaskViewContent_DescriptionPanel");
            descriptionPanel.text(task.Description);
            dialog.append(descriptionPanel);

            let notePanel = $("<div>");
            notePanel.addClass("TaskViewContent_NotePanel");

            for (var x = 0; x < task.Notes.length; x++) {
                let noteDiv = $("<div>");

                let noteAuthor = $("<div>");
                noteAuthor.text(task.Notes[x].User);
                noteAuthor.addClass("TaskViewContent_NoteAuthor");

                noteDiv.text(task.Notes[x].Content);
                noteDiv.prepend(noteAuthor);

                noteDiv.addClass("TaskViewContent_Note");
                notePanel.append(noteDiv);
            }
            dialog.append(notePanel);

            let updatePanel = $("<div>");
            updatePanel.addClass("TaskViewContent_UpdatePanel");
            let updateBox = $("<textarea>");
            updateBox.attr("placeholder", "Type an update");
            updateBox.addClass("TaskViewContent_UpdateBox");
            updatePanel.append(updateBox);
            dialog.append(updatePanel);

            view.append(mask);
            view.appendTo("body");
            mask.fadeIn(250);

            var h = dialog.height() - (updatePanel.height() + statusPanel.height() + heading.height() + descriptionPanel.height() + 70);
            console.log("Height: " + h);

            notePanel.css("height", h + "px");
        }
    }

    d.Source.GetTask(d.Id, callback(this), function () { });

    // For Reference the below is the task object
    let task = {
        Title: "This is a Test Task",
        State: "Planned",      
        CreatedBy: "James Sumner",
        CreatedDate: "2018-11-01",
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
        Description: "This is the description for the task.",
        Attachments: {            
            1: {
                Label: "A file"
            }
        },
        Notes: [
            {
                TimeStamp: "2018-10-29 09:04",
                User: "James Sumner",
                Content: "This is an update on the ticket. It has an attachment.",
                AttachmentIds:
                [
                    1
                ]
            },
            {
                TimeStamp: "2018-10-29 09:00",
                User: "James Sumner",
                Content: "Did some stuff",
                AttachmentIds:[]
            }
        ]
    }

    

    return this;
});