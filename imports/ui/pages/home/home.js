import './home.html';
import { Contacts } from '/imports/api/contacts/contacts.js';
import '/imports/ui/components/contactItem.js';

Template.home.onCreated(function homePageOnCreated() {
});


Template.home.helpers({
    contacts: function ()
    {
        const instance = Template.instance();
        const arr = Contacts.find({userId: Meteor.userId()}).fetch();
        return arr ? arr : [];
    },
});


Template.home.rendered = function(){
};