import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TaskCollection.js';

const insertTask = taskText => TasksCollection.insert({ text: taskText });
 
Meteor.startup(() => {
  if (TasksCollection.find().count() === 0) {
    [
      'Winning a million dollars',
      'Spending a million dollars',
      'Going broke'
    ].forEach(insertTask)
  }
});