import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { Contacts } from './contacts.js';

export const insertContact = new ValidatedMethod({
  name: 'contacts.insert',
  validate: Contacts.simpleSchema().pick(['name', 'email', 'phone']).validator({ clean: true, filter: false }),
  run({ name,  email, phone }) {
    if (!this.userId) {
      throw new Meteor.Error("contacts.insert", "Need to login to create new contact");
    }

    const contact = {
      name,
      email,
      phone,
      userId: this.userId,
    };
    let contactId = Contacts.insert(contact);
    return contactId;
  }
});

export const updateContact = new ValidatedMethod({
  name: 'contacts.update',
  validate: Contacts.simpleSchema().pick(['_id', 'name', 'email', 'phone']).validator({ clean: true, filter: false }),
  run({ _id, name,  email, phone }) {
    let contact = Contacts.findOne(_id);
    if (!contact.isEditableBy(this.userId)) {
      throw new Meteor.Error("contacts.update", "Not authorized to update contact");      
    }

    Contacts.update(_id, {
      $set: {
        name,
        email,
        phone,
      }
    });
  }
});

export const removeContact = new ValidatedMethod({
  name: 'contacts.remove',
  validate: new SimpleSchema({
    _id: Contacts.simpleSchema().schema('_id')
  }).validator({ clean: true, filter: false }),
  run({ _id }) {
    let contact = Contacts.findOne(_id);
    if (!contact.isEditableBy(this.userId)) {
      throw new Meteor.Error("contacts.update", "Not authorized to update contact");      
    }
    Contacts.remove(_id);
  }
});

// Get contact of all method names on Contacts
const CONTACTS_METHODS = _.pluck([
  insertContact,
  updateContact,
  removeContact,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 contacts operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(CONTACTS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; }
  }, 5, 1000);
}