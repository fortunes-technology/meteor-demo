/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

Meteor.publish(null, function() {
    return Meteor.users.find({_id: this.userId}, {fields: {name: 1}});
});