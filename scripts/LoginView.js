($.fn.loginview = function (dataSource) {

    let mask = $("<div>");
    mask.addClass("LoginViewMask");

    let dialog = $("<div>");
    dialog.addClass("LoginView");

    let txtUsername = $("<input>");
    txtUsername.attr("placeholder", "UserName");
    txtUsername.attr("type", "text");
    let divUsername = $("<div>");
    
    let txtPassword = $("<input>");
    txtPassword.attr("type", "password");
    txtPassword.attr("placeholder", "Password");
    let divPassword = $("<div>");

    let btnLogin = $("<button>");
    btnLogin.text("Login");
    let divButton = $("<div>");
    
    divUsername.append(txtUsername);    
    divPassword.append(txtPassword);
    divButton.append(btnLogin);

    dialog.append(divUsername);
    dialog.append(divPassword);
    dialog.append(divButton);

    mask.append(dialog);

    $(this).append(mask);
    $(this).appendTo("body");
    mask.fadeIn(250);

    btnLogin.click(function () {
        var username = txtUsername.val();
        var password = txtPassword.val();

        var successCallback = function () {
            console.log(dataSource);
            dataSource.OnAuthenticated();
        }
        var errorCallback = function () { }
        dataSource.Authenticate(username, password, successCallback, errorCallback);
        
    });

    return this;
});