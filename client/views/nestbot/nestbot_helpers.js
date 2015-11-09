'use strict';

Template.nestbotUsers.helpers({
	users: function() {
		return UsersCollection.find({username: {$ne: 'nestbot@groupnest.com'}},
			{
				sort: [
					['nestbotLastMessageDate', 'desc'],
					['displayName', 'asc']
				]
			});
	},
	active: function() {
		var selected = Session.get('nestbot.username');
		return selected && selected === this.username ? 'active' : '';
	},
	unread: function() {
		return this.nestbotUnreadCount ? 'unread' : '';
	}
});

Template.nestbotMessenger.helpers({
	showTasks: function() {
		return Session.get('nestbot.showTasks');
	}
});


Template.tasks.helpers({
	tasks: function() {
		return TasksCollection.find();
	}
});
