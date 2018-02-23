import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { Roles } from 'meteor/alanning:roles';
import { ROLES } from '../users/users.js';


import { UserSchema } from './users.js';

export const updateProfile= new ValidatedMethod({
    name: 'users.update.profile',
    validate: new SimpleSchema({
        name: UserSchema.schema('name'),
    }).validator({ clean: true, filter: false }),
    run({ name }) {
        if (!this.userId) {
            throw new Meteor.Error("users.update.profile", "Not authorized to update profile");
        }
        Meteor.users.update(this.userId, {
            $set: {
                name: name,
            }
        });
    }
});
