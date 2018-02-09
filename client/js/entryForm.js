Template.entryForm.rendered = function() {
	$("#diary-link").removeClass('selected');
	$("#private-link").removeClass('selected');
	$("#entryForm-link").addClass('selected');
	$("#login-link").removeClass('selected');
}


Template.entryForm.events({
	"submit .entry-post": function() {
		var entryName = event.target.entryName.value;
		var entryPost = event.target.entryPost.value;

		if (isNotEmpty(entryName) &&
			isNotEmpty(entryPost)) {

			Meteor.call('addEntry', entryName, entryPost);

			event.target.entryName.value = "";
			event.target.entryPost.value = "";

			Bert.alert("Your entry was added to the diary!", "success", "growl-top-right");

		} else {

			Bert.alert("That's embarassing, something went wrong here, sorry", "danger", "growl-top-right");
		}

		return false; // prevent submit
	}
});

// Validation Rules

var isNotEmpty = function(value){
	if (value && value !== ''){
		return true;
	}
	Bert.alert("Please fill in all required fields", "danger", "growl-top-right");
	return false;
};
