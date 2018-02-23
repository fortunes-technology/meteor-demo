import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class ContactsCollection extends Mongo.Collection {
  insert(doc, callback) {
    const result = super.insert(doc, callback);
    return result;
  }
  remove(selector, callback) {
    return super.remove(selector, callback);
  }
}

export const Contacts = new ContactsCollection('contacts');

// Deny all client-side updates since we will be using methods to manage this collection
Contacts.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Contacts.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  name: { type: String},
  email: { type: String, regEx: SimpleSchema.RegEx.Email},
  phone: {type: String},
  userId: {type: String, regEx: SimpleSchema.RegEx.Id },
});

Contacts.attachSchema(Contacts.schema);

Contacts.publicFields = {
  name: 1,
  email: 1,
  phone:1,
  userId:1,
};

Contacts.helpers({
  isEditableBy(userId) {
    if (userId && this.userId == userId) {
      return true;
    }
    return false;
  },
});
