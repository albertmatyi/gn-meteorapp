'use strict';

Blaze.registerHelper('moment', function (date) {
    //date = date || new Date();
    //return moment(date).format('Do MMM YYYY');
    return date ? moment(date).calendar() : '';
});