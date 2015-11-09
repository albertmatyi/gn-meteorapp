'use strict';

Template.messages.helpers({
    messages: function () {
        return App.nestbot.messagesFor(Session.get('messages.username'));
    },
    user: function () {
        return UsersCollection.findOne({
            username: this.from
        });
    }
});

var scrollTimeout;

Meteor.startup(function () {
    Tracker.autorun(function () {
        var groupId;
        var group = App.nestbot.groupFor(Session.get('messages.username'));
        if (group) {
            groupId = group.UUID;
        }
        //console.log('subscribe for messages with group: ' + groupId);
        Meteor.subscribe('tasks', App.login.token(), groupId);
        Meteor.subscribe('messages', App.login.token(), groupId);
    });

    MessagesCollection
        .find()
        .observeChanges({
            added: function () {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(function () {
                    $('.messages').animate({scrollTop: 999999});
                }, 250);
            }
        });
});
