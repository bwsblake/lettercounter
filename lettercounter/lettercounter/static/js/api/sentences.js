/* global define */

define(function (require) {
    'use strict';

    var ns = {};
    var util = require('js/api/util');

    ns.putSentences = function (sentence) {
        return util.makeApiCall('sentences', 'PUT', {
            "sentence": sentence
        });
    };

    return ns;
});
