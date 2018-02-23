import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

Meteor.startup(() => {
    console.log("Meteor.startup");
    if (Meteor.users.find({}).count() === 0) {
        let user = {
            username: 'User',
            email: 'user@gmail.com',
            password: 'password',
            firstName: 'Test',
            lastName: 'User',
        };
        Accounts.createUser(user);
    }
});


