($.fn.userassignmentview = function(d){
	// d = {
	//		Source: dataSource
	//		SelectionCallback: function(agentList);
	// }
	let mask = $("<div>");
	mask.addClass("UserAssignmentViewMask");

	let dialog = $("<div>");
	dialog.addClass("UserAssignmentView");

	let heading = $("<div>");
	heading.text("Assign Users");
	heading.addClass("UserAssignmentView_Heading");

	let searchBar = $("<div>");
	let searchBox = $("<input type=\"text\">");
	searchBox.attr("placeholder", "Search");
	searchBox.addClass("UserAssignmentView_SearchBox");
	searchBox.change(function(){searchCallback();});
	searchBar.append(searchBox);
	searchBar.addClass("UserAssignmentView_SearchBar");

	let userList = $("<div>");
	userList.addClass("UserAssignmentView_UserList");
	let users = d.Source.DataStore["Users"];
	for(var x in users)
	{
		// x will be the users email address (which is their unique id)
		let ud = $("<div>");
		ud.text(users[x].FullName);
		ud.addClass("UserAssignmentView_User");
		ud.attr("data-email", x);
		ud.click(function(){
			if($(this).hasClass("UserAssignmentView_User_Selected")){
				$(this).removeClass("UserAssignmentView_User_Selected");
			}
			else{
				$(this).addClass("UserAssignmentView_User_Selected");
			}
		})
		userList.append(ud);
	}

	let searchCallback = function(searchTerm, userDiv)
	{
		userDiv.children().each(function(){
			if($(this).text().toLowerCase().indexOf(searchTerm.toLowerCase())>-1)
			{
				$(this).show();
			}
			else
			{
				$(this).hide();
			}
		});
	}
	searchBox.keyup(function(){searchCallback($(this).val(), userList);});

	let buttonPanel = $("<div>");
	let selectButton = $("<button>");
	selectButton.text("Save Selection");
	let selectButtonHandler = function(view, container){
		return function(){
			let list = [];			
			container.children(".UserAssignmentView_User_Selected").each(function(){
				list.push($(this).attr("data-email"));
				console.log($(this).text());
			});

			console.log(list);
			view.fadeOut(250);
			
			let removal = function(view)
			{
				return function(){
				view.remove();
				}
			}
			setTimeout(removal(view), 300);	// Clean up the DOM after the fade effect
			d.SelectionCallback(list);
		}
	}
	selectButton.click(selectButtonHandler(this, userList));

	let cancelButton = $("<button>");
	cancelButton.text("Cancel");
	let cancelHandler = function(view){
		return function(){
			view.fadeOut(250);
			
			let removal = function(view)
			{
				return function(){
				view.remove();
				}
			}
			setTimeout(removal(view), 300);	// Clean up the DOM after the fade effect
		}
	}
	cancelButton.click(cancelHandler(this));
	buttonPanel.append(selectButton);
	buttonPanel.append("&nbsp;");
	buttonPanel.append(cancelButton);
	buttonPanel.addClass("UserAssignmentView_ButtonPanel");

	dialog.append(heading);
	dialog.append(searchBar);
	dialog.append(userList);
	dialog.append(buttonPanel);

	mask.append(dialog);

	this.append(mask);
	this.appendTo("body");

	mask.fadeIn(250);
	userList.css("height", dialog.height() - 145 + "px");


	return this;
});