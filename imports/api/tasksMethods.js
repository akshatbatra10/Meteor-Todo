import { check } from 'meteor/check';
import { TasksCollection } from './TaskCollection';

Meteor.methods({
    'tasks.insert'(text) {
        check(text, String);

        if(!this.userId) {
            throw new Meteor.Error('Not Authorized');
        }

        const task = TasksCollection.findOne({ userId: this.userId });

        if (!task) {
          throw new Meteor.Error('Access denied');
        }

        TasksCollection.insert({
            text,
            createdAt: new Date(),
            userId: this.userId,
        })
    },

    'tasks.remove'(taskId) {
        check(taskId, String);

        if(!this.userId) {
            throw new Meteor.Error('Not Authorized');
        }

        const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

        if (!task) {
          throw new Meteor.Error('Access denied');
        }

        TasksCollection.remove(taskId);
    },

    'tasks.setIsChecked'(taskId, isChecked) {
        check(isChecked, Boolean);
        check(taskId, String);

        if(!this.userId) {
            throw new Meteor.Error('Not Authorized');
        }

        const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

        if (!task) {
          throw new Meteor.Error('Access denied');
        }

        TasksCollection.update(taskId, {
            $set: {
                isChecked
            }
        });
    }
})