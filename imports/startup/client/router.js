var OnBeforeActions;
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import common
import '/imports/ui/common/footer.js';
import '/imports/ui/common/page-heading.js';
import '/imports/ui/common/top-navbar.js';

// Import Layouts
import '/imports/ui/layouts/main.js';
import '/imports/ui/layouts/not-found.html';

import '/imports/ui/pages/home/home.js';
import '/imports/ui/pages/login/login.js';
import '/imports/ui/pages/register/register.js';
import '/imports/ui/pages/contact/contactEdit.js';

export const AllSubs = new SubsManager();
export const SingleSubs = new SubsManager();

let PublicGroup = FlowRouter.group();

let NonLoggedinGroup = FlowRouter.group({
    triggersEnter: [function(context, redirect) {
        if (Meteor.userId()) {
            redirect('/home');
        }
    }]
});

let LoggedinGroup = FlowRouter.group({
    triggersEnter: [function(context, redirect) {
        if (!Meteor.userId()) {
            var route = FlowRouter.current();
            if(route.route.name != 'login')
            {
                Session.set("redirectAfterLogin", route.path);
                redirect('/login');
            }
        }
    }]
});

NonLoggedinGroup.route('/login', {
    action: function() {
        BlazeLayout.render("mainLayout", {not_logged_content: "login"});
    }
});

NonLoggedinGroup.route('/register', {
    action: function() {
        BlazeLayout.render("mainLayout", {not_logged_content: "register"});
    }
});

LoggedinGroup.route('/', {
    action: function() {
        BlazeLayout.render("mainLayout", {content: "home", not_logged_content: "login"});
    },
    subscriptions: function(params, queryParams) {
        this.register('contacts', AllSubs.subscribe('contacts'));
    }
});

LoggedinGroup.route('/contacts', {
    action: function() {
        BlazeLayout.render("mainLayout", {content: "home"});
    },
    subscriptions: function(params, queryParams) {
        this.register('contacts', AllSubs.subscribe('contacts.user'));
    }
});
LoggedinGroup.route('/contacts/new', {
    action: function() {
        BlazeLayout.render("mainLayout", {content: "contactEdit"});
    },
});

LoggedinGroup.route('/contacts/:_id', {
    action: function() {
        BlazeLayout.render("mainLayout", {content: "contactEdit"});
    },
    subscriptions: function(params, queryParams) {
        this.register('contacts.single', SingleSubs.subscribe('contacts.single', {_id: params._id}));
    }
});

PublicGroup.route('/*', {
    action: function() {
        BlazeLayout.render("mainLayout", {content: "notFound", not_logged_content: "notFound"});
    }
});
