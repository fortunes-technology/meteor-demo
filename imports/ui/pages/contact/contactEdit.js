import './contactEdit.html'

import { Contacts } from '/imports/api/contacts/contacts.js';
import { insertContact, updateContact } from '/imports/api/contacts/methods.js';

Template.contactEdit.onCreated(function listsShowPageOnCreated() {
    this.getContactId = () => FlowRouter.getParam('_id');

    this.state = new ReactiveDict();
    this.state.setDefault({
        contact: {
        }
    });
    if(this.getContactId())
    {// If edit
        this.autorun(() => {
            if (this.subscriptionsReady()) {
                console.log("HALA HERE", Contacts.findOne({_id: this.getContactId()}));
                let currentContactState = this.state.get('contact');
                if(!currentContactState._id) {
                    let contactTemp = Contacts.findOne({_id: this.getContactId()});
                    if(contactTemp) {
                        if(contactTemp.isEditableBy(Meteor.userId())) {
                            this.state.set('contact', contactTemp);
                        } else {
                            toastr['success']("You are not owner of this contact!")
                            FlowRouter.go('/contacts');
                        }
                    }
                }
            }
        });
    }
});


Template.contactEdit.rendered = function(){
    $('.ladda-button').ladda();
};

Template.contactEdit.onRendered(function contactEditOnRendered() {

});


Template.contactEdit.events({
    'submit #form-contact': function(event){
        event.preventDefault();

        const instance = Template.instance();

        var contactObj = {name: event.target.name.value, phone: event.target.phone.value, email: event.target.email.value};
        $(".ladda-button").ladda('start');

        if(instance.getContactId()) {
            updateContact.call({_id: instance.getContactId(), ...contactObj}, (error) => {
                $(".ladda-button").ladda('stop');
                if (error) {
                    console.log(error);
                    //toastr['error']("Updating contact info failed. Try again.")
                    toastr['error'](error.reason)
                }
                else {
                    toastr['success']("Contact updated!")
                    FlowRouter.go("/contacts");
                }
            });
        }
        else
        {
            const contactId = insertContact.call(contactObj, (error) => {
                $(".ladda-button").ladda('stop');
                if (error) {
                    console.log(error);
                    toastr['error']("Adding contact failed. Try again.")
                }
                else {
                    toastr['success']("Contact inserted!")
                    FlowRouter.go("/contacts");
                }
            });
        }
    },
})

Template.contactEdit.helpers({
    breadcrumbTitle()
    {
        const instance = Template.instance();
        if(instance.getContactId())
        {
            return "Edit Contact";
        }
        return "New Contact"
    },
    contact() {
        const instance = Template.instance();
        return instance.state.get('contact');
    },
    isEditing()
    {
        const instance = Template.instance();
        if(instance.getContactId()) {
            return true;
        }
        return false;
    },
});
