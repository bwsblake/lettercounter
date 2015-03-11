/* global define */

define(function (require) {
    'use strict';

    var Q = require('q');
    var _ = require('underscore');

    var ns = {
    };

    ns.getApiUri = function(call) {
        return '/api/' + call + '/';
    };

    ns.makeApiCall = function (call, method, data) {

        if (_.isUndefined(method)) {
            method = 'GET';
        }

        var request = new XMLHttpRequest();
        var deferred = Q.defer();

        var url = ns.getApiUri(call);

        if (method === 'GET') {
            url += '?format=json';
        }

        ns.makeApiCall.onLoad = function() {
            if (request.status === 200) {
                deferred.resolve(JSON.parse(request.responseText));
            } else {
                deferred.reject(new Error('Status code was ' + request.status));
            }
        };

        ns.makeApiCall.onError = function() {
            deferred.reject(new Error('Can\'t XHR ' + JSON.stringify(url)));
        };

        ns.makeApiCall.onProgress = function(event) {
            deferred.notify(event.loaded / event.total);
        };

        request.open(method, url, true);
        request.onload = ns.makeApiCall.onLoad;
        request.onerror = ns.makeApiCall.onError;
        request.onprogress = ns.makeApiCall.onProgress;

        if (method == 'POST' || method == 'PUT') {
            request.setRequestHeader("Content-type","application/json");
            request.send(JSON.stringify(data));
        } else {
            request.send();
        }

        return deferred.promise;
    };

    return ns;
});
