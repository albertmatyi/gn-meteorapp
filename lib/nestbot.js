'use strict';

App.component('nestbot').expose({
    messagesFor: function (username) {
        var group = App.nestbot.groupFor(username);
        if (!group) {
            console.warn('No nestbot group for ' + username);
            return [];
        } else {
            return MessagesCollection.find({
                    group: group.UUID
                },
                {sort: {_createdAt: 1}});
        }
    },
    validateMessage: function (value) {
        if (!value || !value.trim()) {
            if (Meteor.isClient) {
                alert('Be more creative!');
            }
            throw 'up';
        }
    },
    groupFor: function (username) {
        var qry = GroupsCollection.find(
            {$and: [{members: username}, {members: 'nestbot@groupnest.com'}]}
        );
        if (qry.count() > 1) {
            throw new Meteor.Error('MULTI_NESTBOT_GROUP', 'Multiple nestbot groups found for user ' + username);
        }
        return qry.fetch()[0];
    }
});

