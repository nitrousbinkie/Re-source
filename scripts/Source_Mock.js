// This is a mock data source with static data for testing UI components.

function DataSource() {
    this.Authenticated = true;
    this.SessionToken = "notarealsessiontokenatallinanyway";
    this.DataStore = {};    
}

DataSource.prototype.Authenticate = function (username, password, successCallback, errorCallback) {
    
}

DataSource.prototype.OnAuthenticated = function () { }
DataSource.prototype.OnLoggedOut = function () { }

DataSource.prototype.GetTask = function (taskid, successCallback, errorCallback) {

    // We do some nested callback stuff here to build the task before we pass it back to the provided successCallback

    console.log("GetTask: " + this.SessionToken);

    let task = {
        TaskId: taskid,
        Description: "This isn't a real task.",
        Title: "This is the title",
        State: "Planned",           // TODO: Missed this from the data collection!!
        CreatedBy: "nobody",
        CreatedDate: "2018-11-01T11:30:00",
        AssignedUsers: [],
        Notes: [
            {
                TimeStamp: "2018-11-01T11:31:23",
                User: "Nobdy Else",
                Content: "This is a note! We're all happy.",
                AttachmentIds:[]
            }
        ],
        Attachments: {}
    };

    setTimeout(function () { successCallback(task) }, 500);    
}

DataSource.prototype.SaveTaskField = function (taskid, field, newValue, successCallback, errorCallback) {
    console.log("Save field " + field + " in taskid: " + taskid);
    var fields = {};
    fields[field] = newValue;

    var where = [
        {
            f: "TaskId",
            c: "=",
            v: taskid
        }
    ];

    this.UpdateData("Resource_Tasks", where, fields, successCallback, errorCallback);
}

DataSource.prototype.AddNote = function (taskid, notetext, successCallback, errorCallback) {
    console.log("Insert Note for taskid: " + taskid);
    var rows = [];
    rows.push(
        {
            Note: notetext,
            TaskId: taskid
        });

    this.InsertData("Resource_Task_Notes", rows, successCallback, errorCallback);
}