import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './diary.html';

Template.diary.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.diary.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('diaries.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('diaries.remove', this._id);
  },
  'click #toggle-private'() {
    Meteor.call('diaries.setPrivate', this._id, !this.private);
  },
});
