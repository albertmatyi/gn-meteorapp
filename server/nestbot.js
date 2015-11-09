'use strict';

Meteor.publish('users', function(token) {
	App.login.validateToken(token);
	return UsersCollection.find();
});

Meteor.publish('groups', function(token) {
	App.login.validateToken(token);
	return GroupsCollection.find();
});

Meteor.publish('tasks', function(token, group) {
	App.login.validateToken(token);
	return TasksCollection.find({group: group});
});

Meteor.publish('messages', function(token, group) {
	App.login.validateToken(token);
	return MessagesCollection.find({group: group});
});
var VALID_KEYS = {
	'UUID': 'someuuid',
	'from': 'nestbot@groupnest.com',
	'group': 'someid',
	'category': 'Text',
	'body': 'hello',
	'_createdAt': new Date(),
	'_modifiedAt': new Date(),
	'__v': 0
};

MessagesCollection.allow({
	insert: function(uid, doc) {
		App.login.validateToken(doc.token);
		delete doc.token;

		Object.keys(doc).forEach(function(key) {
			if (typeof VALID_KEYS[key] === 'undefined') {
				throw new Meteor.Error('INVALID_MESSAGE',
					'Invalid document key: ' + key);
			}
		});
		doc.__v = VALID_KEYS.__v;
		doc._createdAt = new Date();
		doc._modifiedAt = new Date();
		doc.category = VALID_KEYS.category;
		return true;
	}
});
