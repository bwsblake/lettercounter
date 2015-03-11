/* global requirejs */

requirejs.config({
    baseUrl: '/',
    packages: [],
    map: {
        '*': {
            'css': 'bower_components/require-css/css.min',
        },
    },
    paths: {
        'q': 'bower_components/q/q',
        'jquery': 'bower_components/jquery/dist/jquery.min',
        'underscore': 'bower_components/underscore/underscore',
        'jade': 'bower_components/jade/jade',
        'highcharts': 'bower_components/highcharts/highcharts',
        'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap.min',
        'respond': 'bower_components/respond/dest/respond.min',
        'html5shiv': 'bower_components/html5shiv/dist/html5shiv.min',
    },

    shim: {

        'jquery-ui' : ['jquery'],

        'bootstrap': {
            deps: ['jquery', 'respond', 'html5shiv']
        },

        'highcharts': {
            deps: ['jquery']
        },

        'underscore' : {
            exports: '_',
        },

    },

    deps: ['bootstrap','q', 'highcharts'],

    waitSeconds: 0,
});
