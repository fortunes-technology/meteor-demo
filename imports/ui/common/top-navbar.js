import './top-navbar.html'
import { ROLES } from '/imports/api/users/users.js';
import { Roles } from 'meteor/alanning:roles';

Template.topNavbar.rendered = function(){

    // FIXED TOP NAVBAR OPTION
    // Uncomment this if you want to have fixed top navbar
    $('body').addClass('fixed-nav');
    $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');

};

Template.topNavbar.events({
    // Toggle right sidebar
    'click .alink-sign-out': function(event){
        event.preventDefault();
        Meteor.logout(function(err) {
            FlowRouter.go('/login');
        });
    },
    'submit #top-search-form': function(event)
    {
        event.preventDefault();
    }
});

Template.topNavbar.helpers({
});