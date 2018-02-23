/**
 * Created by developer on 11/2/16.
 */
import swal from 'sweetalert2'
import './login.html'


Template.login.rendered = function(){
    $('.ladda-button').ladda();
};

Template.login.events({

    'submit #form-login': function(event){

        event.preventDefault();
        let email = event.target.email.value;
        let passwd = event.target.password.value;
        $(".ladda-button").ladda('start');

        Meteor.loginWithPassword(email, passwd, function(error){
            $(".ladda-button").ladda('stop');
           if (error){
               swal({
                   title: "Login Failed!",
                   text: "Wrong username or password.Please try again!",
                   type: "warning"
               });
                //template.find('#form-messages').html(error.reason);
            }else{
                FlowRouter.go("/contacts");
            }
        });
    },
})