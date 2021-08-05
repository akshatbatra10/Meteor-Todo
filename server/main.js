import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/api/TaskCollection.js';
import '/imports/api/tasksMethods.js';
import '/imports/api/tasksPublications.js';

const insertTask = (taskText, user) => 
TasksCollection.insert({ 
  text: taskText,
  userId: user._id,
  createdAt: new Date(),
});

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';
 
Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (TasksCollection.find().count() === 0) {
    [
      'Winning a million dollars',
      'Spending a million dollars',
      'Going broke'
    ].forEach(taskText => insertTask(taskText, user))
  }
});