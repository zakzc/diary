import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Diaries = new Mongo.Collection('diaries');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('diaries', function diariesPublication() {
    return Diaries.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'diaries.insert'(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Diaries.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'diaries.remove'(diaryId) {
    check(diaryId, String);

    const diary = Diaries.findOne(diaryId);
    if (diary.private && diary.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Diaries.remove(diaryId);
  },
  'diaries.setChecked'(diaryId, setChecked) {
    check(diaryId, String);
    check(setChecked, Boolean);

    const diary = Diaries.findOne(diaryId);
    if (diary.private && diary.owner !== this.userId) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Diaries.update(diaryId, { $set: { checked: setChecked } });
  },
  'diaries.setPrivate'(diaryId, setToPrivate) {
    check(diaryId, String);
    check(setToPrivate, Boolean);

    const diary = Diaries.findOne(diaryId);

    // Make sure only the task owner can make a task private
    if (diary.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Diaries.update(diaryId, { $set: { private: setToPrivate } });
  },
});
