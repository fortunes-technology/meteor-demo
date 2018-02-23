import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './main.html';
import { $ } from 'meteor/jquery';

Template.mainLayout.rendered = function(){
};


Template.mainLayout.helpers({
    //
    showContent: function () {
        if(Meteor.userId())
        {
            return true;
        }
        return this.content;
    },

});

Template.mainLayout.destroyed = function(){

};