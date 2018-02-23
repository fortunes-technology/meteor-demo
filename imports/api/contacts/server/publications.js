/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Contacts } from '../contacts.js';

Meteor.publish("contacts.user", function () {
    if(!this.userId) {
        return this.ready();
    }
    return Contacts.find({userId: this.userId});
});
Meteor.publish("contacts.single", function (params) {
    new SimpleSchema({
        _id: { type: String, optional: true },
    }).validate(params);
    const { _id } = params;

    if(!this.userId) {
        return this.ready();
    }
    return Contacts.find({userId: this.userId, _id: _id});
});
