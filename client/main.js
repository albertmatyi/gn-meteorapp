'use strict';


var isLoggedIn = function() {
	return !!Session.get('login.token');
};

Router.configure({
	onBeforeAction: function() {
		if (isLoggedIn() || Router.current().route.getName() === 'login') {
			this.next();
		} else {
			Router.go('login');
		}
	}
});
