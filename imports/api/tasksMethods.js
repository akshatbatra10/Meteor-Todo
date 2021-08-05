import { check } from 'meteor/check';
import { TasksCollection } from './TaskCollection';

Meteor.methods({
    'tasks.insert'(text) {
        check(text, String);

        if(!this.userId) {
            throw new Meteor.error('Not Authorized');
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
            throw new Meteor.error('Not Authorized');
        }

        TasksCollection.remove(taskId);
    },

    'tasks.setIsChecked'(taskId, isChecked) {
        check(isChecked, Boolean);
        check(taskId, String);

        if(!this.userId) {
            throw new Meteor.error('Not Authorized');
        }

        TasksCollection.update(taskId, {
            $set: {
                isChecked
            }
        });
    }
})