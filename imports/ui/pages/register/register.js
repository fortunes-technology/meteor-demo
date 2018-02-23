/**
 * Created by developer on 11/2/16.
 */
import './register.html'
import swal from 'sweetalert2';

Template.register.rendered = function(){
    $('.ladda-button').ladda();
};

Template.register.events({
    'submit #register-form' : function(e, t) {
        e.preventDefault();
        let name = event.target.name.value;
        let password = event.target.password.value;
        let email = event.target.email.value;

        // Trim and validate the input
        $(".ladda-button").ladda('start');

        Accounts.createUser({name:name, email: email, password : password}, function(err){
            $(".ladda-button").ladda('stop');
            if (err) {
                swal({
                    title: "Register Failed!",
                    text: err.reason,
                    type: "warning"
                });
            } else {
                Meteor.call("users.send.verification.email", {});
                FlowRouter.go("/");
            }
        });

        return false;
    }
});