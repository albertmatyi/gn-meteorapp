'use strict';

App.component('login').expose({
	validateToken: function(token) {
		if (!App.login.isValidToken(token)) {
			throw new Meteor.Error('NOT_AUTHORIZED',
				'User is trying to perform an action without proper authorisation.');
		}
	},
	isValidToken: function(token) {
		return token === '#yolo';
	}
});

Meteor.methods({
	'login.validate': function(token) {
		return App.login.isValidToken(token);
	}
});
