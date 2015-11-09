'use strict';

Router.route('login', {
	path: '/login',
	template: 'login'
});


Template.login.events({
	'submit .login-form': function(e) {
		// prevent default POST behavior of the form (ie. Full page refresh)
		e.preventDefault();

		var val = $('.login-input').val();

		var serverResponseCallback = function(e, validToken) {
			if (!e && validToken) {
				Session.set('login.token', val);
				Router.go('nestbot');
			} else {
				alert('You aren\'t trying to hack around here now are you?');
			}
		};

		Meteor.call('login.validate', val, serverResponseCallback);
	}
});

App.component('login').expose({
	token: function() {
		return Session.get('login.token');
	}
});
