// This is a mock data source with static data for testing UI components.

function DataSource() {
    this.Authenticated = true;
    this.SessionToken = "notarealsessiontokenatallinanyway";
    this.DataStore = {};    

    var statecallback = function(Source)
    {
        return function(States){
            Source.DataStore["TaskStates"] = States;
        }
    }
    this.GetTaskStates(statecallback(this));

    var userscallback = function(Source)
    {
        return function(Users)
        {
            Source.DataStore["Users"] = Users;
        }
    }
    this.GetUserList(userscallback(this));
}

DataSource.prototype.Authenticate = function (username, password, successCallback, errorCallback) {
    
}

DataSource.prototype.OnAuthenticated = function () { }
DataSource.prototype.OnLoggedOut = function () { }


// Task Operations
DataSource.prototype.GetTask = function (taskid, successCallback, errorCallback) {

    // We do some nested callback stuff here to build the task before we pass it back to the provided successCallback

    console.log("GetTask: " + this.SessionToken);

    let task = {
        TaskId: taskid,
        Description: "This isn't a real task.",
        Title: "This is the title",
        State: "Complete",          // TODO: Missed this from the data collection!!
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
    setTimeout(function(){successCallback()}, 500);
}

DataSource.prototype.AddNote = function (taskid, notetext, successCallback, errorCallback) {
    console.log("Insert Note for taskid: " + taskid);
   
    setTimeout(function(){successCallback()}, 500);
}

// Get status codes etc...
DataSource.prototype.GetTaskStates = function(successCallback, errorCallback){
    var TaskStates = {
        Identified:{
            "Background-Color":"#990033",
            "Color":"#FFFFFF"
        },
        Specified:{
            "Background-Color":"#FF0000",
            "Color":"#FFFFFF"
        },
        Resourced:{
            "Background-Color":"#FF3300",
            "Color":"#FFFFFF"
        },
        Development:{
            "Background-Color":"#FF9900",
            "Color":"#FFFFFF"
        },
        "Code Review":{
            "Background-Color":"#CC6600",
            "Color":"#FFFFFF"
        },
        "Waiting Test Release":{
            "Background-Color":"#99CC00",
            "Color":"#FFFFFF"
        },
        "Test":{
            "Background-Color":"#009900",
            "Color":"#FFFFFF"
        },
        "Waiting Live Release":{
            "Background-Color":"#006600",
            "Color":"#FFFFFF"
        },
        "Complete":
        {
            "Background-Color":"#339966",
            "Color":"#FFFFFF"
        }
    };

    setTimeout(function(){successCallback(TaskStates);}, 500);
}

DataSource.prototype.GetUserList = function(successCallback, errorCallback){
    let Users = {
        "James.Sumner@ultracomms.com":
        {
            FullName:"James Sumner",
            ShortName:"James S"
        }
    }

    successCallback(Users);
}