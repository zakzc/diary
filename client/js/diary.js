Template.diary.rendered = function() {
	$("#diary-link").addClass('selected');
	$("#private-link").removeClass('selected');
	$("#entryForm-link").removeClass('selected');
	$("#login-link").removeClass('selected');
}

Template.diary.helpers({
	diary: function() {
		var diary = Diary.find({}, {sort: {createdAt: -1}});
		return diary;
	}
});
