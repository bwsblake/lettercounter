/* global define */

define(function (require) {
    'use strict';

    var ns = {};
    var util = require('js/api/util');

    ns.getCounts = function () {
        return util.makeApiCall('counts');
    };

    ns.putCounts = function (letter, count) {
        return util.makeApiCall('counts', 'PUT', {
            "letter": letter,
            "count": count
        });
    };

    return ns;
});
