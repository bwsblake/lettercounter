/* global define */

define(function (require) {
    'use strict';

    var $ = require('jquery');
    var apiCounts = require('js/api/counts');
    var apiStats = require('js/api/stats');
    var apiSentences = require('js/api/sentences');

    require('css!/css/system.css');

    var ns = {
        headerTemplate: require('js/templates/header.tmpl'),
        entryTemplate: require('js/templates/entry.tmpl'),
        chartTemplate: require('js/templates/chart.tmpl'),
    };

    ns.renderPieChart = function (stats) {
        // Build the chart

        var $chartContainer = $('.right_side #container');

        if ($chartContainer.length === 0) {
            $chartContainer = $(ns.chartTemplate());
            $chartContainer.appendTo('body');

            $chartContainer = $chartContainer.children().first();
        } else {
            $chartContainer.empty();
        }

        var keys = _.keys(stats);
        var data = [];
        var largestKey = 0;

        _(keys).each(function (key, index) {

            if (stats[key] > stats[keys[largestKey]])
                largestKey = index;

            data.push({
                name: key,
                y: stats[key],
                sliced: false,
                selected: true
            });
        });

        data[largestKey].sliced = true;
        data[largestKey].selected = true;

        $chartContainer.highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Letter Counts Since Site Launch'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                type: 'pie',
                name: 'Letter share',
                data: data
            }]
        });
    };

    ns.pieChart = function() {
        apiStats.getStats().then(ns.renderPieChart);
    };

    ns.menu = function () {
        $(ns.headerTemplate({
                    branding: document.title
                })).appendTo('body');
    };

    ns.update = function ($element) {
        apiSentences.putSentences($element.val()).then(function (counts) {
            $element.val('');
            ns.pieChart();
        });
    };

    ns.screen = function (counts) {
        var $entrySection = $(ns.entryTemplate());

        $entrySection.appendTo('body');

        $('.compute', $entrySection).click(function () {
            ns.update($('#letters', $entrySection));
        });

        ns.pieChart();
    };

    ns.initialize = function () {
        ns.displayScreen(ns.screen);
    };

    ns.displayScreen = function (displayCode) {
        // Hit one of the fast APIs to be sure the server is accessable before loading
        apiCounts.getCounts().then(function (counts) {
            $('body').empty();
            document.title = 'Letter Counter';
            ns.menu();

            displayCode(counts);
        });
    };

    return ns;
});
