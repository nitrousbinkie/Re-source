($.fn.taskview = function (d) {

    // d = {
    //      Source: [datasource],
    //      Id: [taskid]
    // }

    var callback = function (view, d) {  // The view is the DOM element the taskview method was called on
        return function (task) {
            console.log(task);
            let mask = $("<div>");
            mask.addClass("TaskViewMask");

            let dialog = $("<div>");
            dialog.addClass("TaskView");

            mask.append(dialog);

            let heading = $("<div>");            
            heading.addClass("TaskViewContent_Heading");

            let titleBox = $("<input type=\"text\">");
            titleBox.val(task.Title);
            titleBox.change(function () {
                d.Source.SaveTaskField(task.TaskId, "Title", $(this).val(), function () { }, function () { });
            });
            heading.append(titleBox);

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
            try{
                state.css("background-color", d.Source.DataStore["TaskStates"][task.State]["Background-Color"]);
                state.css("color", d.Source.DataStore["TaskStates"][task.State]["Color"]);
            }
            catch(Error)
            {
                console.log("The state of the task " + task.TaskId + " " + task.State + " isn't defined, or couldn't be loaded");
            }
            var stateClickHandler = function(task, d, view)
            {
                return function(){
                    let stateSelect = $("<div>");
                    stateSelect.addClass("TaskViewContent_StateSelectDropdown");
                    for(var x in d.Source.DataStore["TaskStates"])
                    {
                        // console.log(x);
                        let thisState = $("<div>");
                        thisState.addClass("TaskViewContent_State");
                        thisState.text(x);
                        thisState.css("background-color", d.Source.DataStore["TaskStates"][x]["Background-Color"]);
                        thisState.css("color", d.Source.DataStore["TaskStates"][x]["Color"]);
                        let s = x;
                        thisState.click(function(){
                            console.log("Set task status for task " + task.TaskId + " from " + task.State + " to " + s);
                            if(task.State != s){
                                d.Source.SaveTaskField(task.TaskId, "State", s, function(){}, function(){});                                
                                task.State = s;
                                state.text(task.State);
                                try{
                                    state.css("background-color", d.Source.DataStore["TaskStates"][task.State]["Background-Color"]);
                                    state.css("color", d.Source.DataStore["TaskStates"][task.State]["Color"]);
                                }
                                catch(Error)
                                {
                                    console.log("The state of the task " + task.TaskId + " " + task.State + " isn't defined, or couldn't be loaded");
                                }
                            }
                            stateSelect.fadeOut(250);
                        });

                        stateSelect.append(thisState);
                    }
                    stateSelect.css("display", "none");
                    dialog.append(stateSelect);
                    stateSelect.fadeIn(250);
                }
            }
            state.click(stateClickHandler(task, d, view));
            statusPanel.append(state);
           
            for (var x = 0; x < task.AssignedUsers.length; x++) {
                let userDiv = $("<div>");
                userDiv.text(task.AssignedUsers[x].Name);
                userDiv.addClass("TaskViewContent_User");
                statusPanel.append(userDiv);
            }

            let assignUserButton = $("<div>");
            assignUserButton.addClass("TaskViewContent_AssignUserButton");
            assignUserButton.text("+");
            statusPanel.append(assignUserButton);

            let historyButton = $("<div>");
            historyButton.text("assignment");
            historyButton.addClass("material-icons");
            historyButton.addClass("TaskViewContent_HistoryButton");
            historyButton.addClass("ToolTipEnabled");
            historyButton.attr("ToolTip", "Show history");
            historyButton.css("float", "right");
            statusPanel.append(historyButton);

            dialog.append(statusPanel);

            let descriptionPanel = $("<TextArea>");
            descriptionPanel.addClass("TaskViewContent_DescriptionPanel");
            descriptionPanel.text(task.Description);
            dialog.append(descriptionPanel);
            descriptionPanel.change(function () {
                d.Source.SaveTaskField(task.TaskId, "Description", $(this).val(), function () { }, function () { });
            });

            let notePanel = $("<div>");
            notePanel.addClass("TaskViewContent_NotePanel");            

            for (var x = 0; x < task.Notes.length; x++) {
                let noteDiv = $("<div>");

                let noteAuthor = $("<div>");
                noteAuthor.text(task.Notes[x].User + " on " + task.Notes[x].TimeStamp);
                noteAuthor.addClass("TaskViewContent_NoteAuthor");

                noteDiv.text(task.Notes[x].Content);
                noteDiv.prepend(noteAuthor);

                noteDiv.addClass("TaskViewContent_Note");
                notePanel.append(noteDiv);
            }
            if (task.Notes.length == 0) {
                notePanel.text("There are no notes on this task yet");
            }
            dialog.append(notePanel);

            let updatePanel = $("<div>");
            updatePanel.addClass("TaskViewContent_UpdatePanel");
            let updateBox = $("<textarea>");
            updateBox.attr("placeholder", "Type an update to add a note.");
            updateBox.addClass("TaskViewContent_UpdateBox");
            updatePanel.append(updateBox);
            var saveButton = $("<button>");
            saveButton.text("Send Update");
            saveButton.css("position", "relative");
            saveButton.css("left", "680px");
            saveButton.css("top", "-45px");

            var saveCallback = function (notepanel, notetext) {
                return function (data) {
                    let note = $("<div>");
                    let noteAuthor = $("<div>");
                    noteAuthor.text("You, just now.");
                    noteAuthor.addClass("TaskViewContent_NoteAuthor");
                    note.text(notetext);
                    note.prepend(noteAuthor);
                    note.addClass("TaskViewContent_Note");
                    note.css("display","none");
                    notepanel.append(note);
                    note.fadeIn(250);
                }
            }

            saveButton.click(function () {
                if (updateBox.val() != "") {
                    d.Source.AddNote(task.TaskId, updateBox.val(),
                        saveCallback(notePanel, updateBox.val()),
                        function () {
                        });
                    updateBox.val("");
                }
            });
            updatePanel.append(saveButton);
            dialog.append(updatePanel);

            view.append(mask);
            view.appendTo("body");
            mask.fadeIn(250);

            var h = dialog.height() - (updatePanel.height() + statusPanel.height() + heading.height() + descriptionPanel.height() + 70);
            console.log("Height: " + h);

            notePanel.css("height", h + "px");

        }
    }

    d.Source.GetTask(d.Id, callback(this, d), function () { });

    // For Reference the below is a sample task object
    let task = {
        TaskId: 1,
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