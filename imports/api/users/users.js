import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Accounts } from 'meteor/accounts-base';

Schema = {};

Schema.User = new SimpleSchema({
    username: {
        type: String,
        optional: true
    },
    emails: {
        type: Array,
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
        type: Date,
        optional: true
    },
    name: { type: String, optional: true},
});

Meteor.users.attachSchema(Schema.User);

export const UserSchema = Schema.User;

// Deny all client-side updates to user documents
Meteor.users.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});


if(Meteor.isServer) {
    Accounts.onCreateUser(function(options, user) {
        if(options.name)
        {
            user.name = options.name;
        }
        return user;
    });
}
