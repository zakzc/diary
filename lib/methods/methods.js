if (Meteor.isServer) {
	Meteor.methods({
		// Method for adding entries to the diary
		addEntry: function(entryName, entryPost) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				return false;
			} else {
				var username = Meteor.user().username;
				var year = new Date().getFullYear();
				var month = new Date().getMonth() + 1;
				var day = new Date().getDate();
				var date = (month + "/" + day + "/" + year).toString();

				Diary.insert({
					entryName: entryName,
					entryPost: entryPost,
					author: username,
					date: date,
					createdAt: new Date(),
					userId: Meteor.userId(),
				});

			}
		},
		removeEntry: function(entryId) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Diary.remove(entryId);
			}
		},
  });
}
