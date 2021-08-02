import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../imports/api/taskCollection';

const insertTask = taskText => TasksCollection.insert({ text: taskText });

Meteor.startup(() => {
  if(TasksCollection.find().count() === 0) {
    [
      'Winning one million dollars',
      'Spending one million dollars',
      'Going broke'
    ].forEach(insertTask);
  }
});