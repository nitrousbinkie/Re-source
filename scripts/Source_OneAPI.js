// Data source compatible with using UCMS as the data store via one api
function DataSource() {
    this.Authenticated = false;
    this.SessionToken = "";
    this.DataStore = {};

    this.BaseURL = "https://one.ultraasp.net";
}

DataSource.prototype.Authenticate = function (username, password, successCallback, errorCallback) {
    var data = "user=" + username + "&password=" + password + "&domain=ultraasp";
    var url = this.BaseURL + "/Auth";

    var successcallback = function (source) {        
        return function (data) {
            data = $.parseJSON(data);
            console.log(data);
            source.Authenticated = true;
            console.log("Token is: " + data.Token);
            source.SessionToken = data.Token;            
            successCallback();
        }
    }

    $.ajax({
        url: url,
        method: "POST",
        crossDomain: true,
        data: data,
        cache: false,
        success: successcallback(this),
        error: function () { }
    });
} 

DataSource.prototype.OnAuthenticated = function () { }
DataSource.prototype.OnLoggedOut = function () { }

DataSource.prototype.GetTask = function (taskid, successCallback, errorCallback) {

    // We do some nested callback stuff here to build the task before we pass it back to the provided successCallback

    console.log("GetTask: " + this.SessionToken);
    var url = this.BaseURL + "/11008/data/Resource_Tasks";

    let where= [
        {
            f: "TaskId",
            c: "=",
            v:taskid
        }
    ]
    
    
    var loadCallback = function (source, callback) {
        return function (data) {

            var notecallback = function (callback, task) {
                return function (data) {
                    for (var x = 0; x < data.Rows.length; x++) {
                        let note = {
                            TimeStamp:data.Rows[x]._CreatedStamp,
                            User: data.Rows[x]._CreatedBy,
                            Content: data.Rows[x].Note,
                            AttachmentIds: []
                        };
                        task.Notes.push(note);
                    }
                    callback(task);
                }
            }
            var notefailcallback = function (callback, task) {
                return function () {
                    callback(task);
                }
            }

            let task = {
                Id: data.Rows[0].TaskId,
                Description: data.Rows[0].Description,
                Title: data.Rows[0].Title,
                State: "Planned",           // TODO: Missed this from the data collection!!
                CreatedBy: data.Rows[0]._CreatedBy,
                CreatedDate: data.Rows[0]._CreatedStamp,
                AssignedUsers: [],
                Notes: [],
                Attachments: {}
            };

            // We now load the notes...
            source.GetData("Resource_Task_Notes", [{ f: "TaskId", c: "=", v: task.Id }], [], notecallback(callback, task), notefailcallback(callback, task));
        }
    }

    this.GetData("ReSource_Tasks", where, [], loadCallback(this, successCallback), errorCallback);    
}

// Below should be considered private, it's not part of the public interface
DataSource.prototype.GetData = function (dataset, where, order, successcallback, errorcallback) {

    var url = this.BaseURL + "/11008/data/" + dataset;
    var setHeader = function (Source) {
        return function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + Source.SessionToken);
        }
    }

    var d = {
        where: where,
        order: order
    };

    $.ajax({
        url: url,
        method: "POST",
        crossDomain: true,
        data: JSON.stringify(d),
        cache: false,
        beforeSend: setHeader(this),
        success: successcallback,
        error: errorcallback
    });
}