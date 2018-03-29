Template.private.rendered = function() {
  	$("#diary-link").removeClass('selected');
  	$("#private-link").addClass('selected');
  	$("#entryForm-link").removeClass('selected');
  	$("#login-link").removeClass('selected');
}

Template.private.helpers({
	email: function() {
		if(!Meteor.user()) {
			Bert.alert("you are not logged in, permission denied", "danger", "growl-top-right");
			return false;
		} else {
			return Meteor.user().emails[0].address;
		}
	},

	username: function() {
		if(!Meteor.user()) {
			Bert.alert("you are not logged in, permission denied", "danger", "growl-top-right");
			return false;
		} else {
			return Meteor.user().username;
		}
	},

	userEntries: function() {
		var username = Meteor.user().username;
		var userId = Meteor.userId();
		var userEntries = Diary.find({userId: userId}, {sort: {createdAt: -1}});
		return userEntries;
	},

});

Template.private.events({
	"click #delete-entry": function() {
		Meteor.call("removeEntry", this._id);
		Bert.alert("Your entry was successfully deleted", "success", "growl-top-right");
	},

});
