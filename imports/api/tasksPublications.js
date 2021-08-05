import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TaskCollection";

Meteor.publish('tasks', function publishTask() {
    return TasksCollection.find({ userId: this.userId });
})