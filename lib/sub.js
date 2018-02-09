if (Meteor.isClient) {
	Meteor.subscribe('Diary');
	Meteor.subscribe('Users');
}
