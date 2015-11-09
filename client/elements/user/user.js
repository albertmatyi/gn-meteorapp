'use strict';
var colors = [
    '#F7C808',
    '#E98813',
    '#22B5BF',
    '#8767A6',
    '#E24B75',
    '#F3F7E3',
    '#88C134'];

Template.user.helpers({
    userLetters: function () {
        var name = this.displayName || '- -';
        var unames = name.split(' ');
        var letters = name[0];
        if (unames.length > 1) {
            letters += unames[1][0];
        } else {
            letters += name[1];
        }
        return letters;
    },
    badgeColor: function () {
        if (!this.username) {
            return '#999';
        } else {
            var n = this.username;
            var idx = n.charCodeAt(0) + n.charCodeAt(1) + n.charCodeAt(2);
            return colors[idx % colors.length];
        }
    }
});