/* global define */

define(function (require) {
    'use strict';

    var ns = {};
    var util = require('js/api/util');

    ns.getStats = function () {
        return util.makeApiCall('stats');
    };

    return ns;
});
