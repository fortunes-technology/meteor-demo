import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';
import { Contacts } from '/imports/api/contacts/contacts.js';
import { removeContact } from '/imports/api/contacts/methods.js';
import './contactItem.html';
import swal from 'sweetalert2'

Template.contactItem.onCreated(function contactItemOnCreated() {
});


Template.contactItem.helpers({
});

Template.contactItem.events({
    'click .btn-remove'(event) {
        removeContact.call({_id: this._id}, (error) => {
            $(".ladda-button").ladda('stop');
            if (error) {
                console.log(error);
                toastr['error']("Removing contact failed. Try again.")
            }
            else {
                toastr['success']("Contact removed!")
            }
        });        
    }
});
