'use strict';
var updateHandle;

/**
 * This file contains the logic that updates the `nestbotLastMessageDate`
 * property on every `user` object in the `users` mongodb collection, by watching
 * every newly added message that is added in a nestbot group.
 */

var updateUserData = function() {

	var nestbotGroupIds = GroupsCollection
		.find({members: 'nestbot@groupnest.com'}).fetch()
		.map(function(obj) {
			return obj.UUID;
		});
	//console.log('nestbotGroupIds:', nestbotGroupIds);
	if (updateHandle) {
		//console.log('stop handle');
		updateHandle.stop();
	}
	updateHandle = MessagesCollection
		.find({group: {$in: nestbotGroupIds}}, {sort: {_createdAt: -1}})
		.observeChanges({
			added: function(_collection, doc) {
				//console.log(arguments);
				var group = GroupsCollection.findOne({UUID: doc.group});
				var username = group.members[0];

				if (username === 'nestbot@groupnest.com') {
					username = group.members[1];
				}
				var user = UsersCollection.findOne({username: username});
				var nestbotLastMessageDate = doc._createdAt;
				if (user && user.nestbotLastMessageDate &&
					doc._createdAt < user.nestbotLastMessageDate) {
					nestbotLastMessageDate = user.nestbotLastMessageDate;
				}
				var modifier = {
					$set: {nestbotLastMessageDate: nestbotLastMessageDate}
				};
				if (doc.from !== 'nestbot@groupnest.com') {
					modifier.$inc = {nestbotUnreadCount: 1};
				} else {
					modifier.$set.nestbotUnreadCount = 0;
				}
				var updated = UsersCollection.update(
					{username: username},
					modifier);
				if (!updated) {
					console.warn('No users updated for change via: ', doc);
				}
			}
		});
};
Meteor.startup(function() {
	updateUserData();

	GroupsCollection
		.find({members: 'nestbot@groupnest.com'})
		.observeChanges({
			added: function() {
				updateUserData();
			}
		});
});

Meteor.methods({
	markAsRead: function(username) {
		UsersCollection.update({username: username}, {
			$set: {nestbotUnreadCount: 0}
		});
	}
});
