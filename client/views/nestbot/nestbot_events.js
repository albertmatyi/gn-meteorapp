'use strict';

var sendMessage = function(group, messageBody, username) {
	var message = {
		'UUID': Meteor.uuid(),
		'from': username,
		'group': group.UUID,
		category: 'Text',
		'body': messageBody,
		'_createdAt': new Date(),
		'_modifiedAt': new Date(),
		__v: 0,
		// needed for authentification
		token: App.login.token()
	};
	MessagesCollection.insert(message);
};

Template.nestbotMessageForm.events({
	'submit form': function(e) {
		e.preventDefault();

		var $input = $('input');
		var messageBody = $input.val();

		App.nestbot.validateMessage(messageBody);
		var group = App.nestbot.groupFor(Session.get('nestbot.username'));
		if (!group) {
			alert('And who are you talking to again?');
			throw 'up';
		}

		sendMessage(group, messageBody, 'nestbot@groupnest.com');

		$input.val('');
	},
	'click .read.btn': function() {
		Meteor.call('markAsRead', Session.get('nestbot.username'));
	},
	'click .tasks.btn': function() {
		Session.set('nestbot.showTasks', !Session.get('nestbot.showTasks'));
	}
});

Template.nestbotUsers.events({
	'click .user': function() {
		Session.set('nestbot.username', this.username);
		Session.set('messages.username', this.username);
		$('.message-form .form-control').focus();
	}
});

