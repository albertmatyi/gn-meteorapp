'use strict';

Router.route('nestbot', {
	path: '/nestbot',
	name: 'nestbot',
	waitOn: function() {
		return [
			Meteor.subscribe('users', App.login.token()),
			Meteor.subscribe('groups', App.login.token())
		];
	}
});

