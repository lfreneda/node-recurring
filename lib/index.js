'use strict';
const moment = require('moment');
const _ = require('underscore')._;

if (!Number.prototype.pad) {
    Number.prototype.pad = function (size) {
        var s = String(this);
        while (s.length < (size || 2)) {
            s = "0" + s;
        }
        return s;
    };
}

exports = module.exports = function (config) {

    config.options = config.options || {};
    config.options.format = config.options.format || 'YYYY-MM-DD';
    config.iterations = config.iterations || 50;
    config.limit = config.limit || null;
    config.start = moment(config.start);
    config.end = config.end ? moment(config.end) : null;

    let occurrence = config.start;

    if (config.dayOfMonth) {

        while (true) {

            if (occurrence.date() === config.dayOfMonth) {
                break;
            }

            occurrence.add(1, 'd');
        }
    }

    if (config.weekday) {

        while (true) {
            if (occurrence.weekday() === config.weekday) {
                break;
            }
            occurrence.add(1, 'd');
        }
    }

    let results = [];
    let iterations = 0;
    let lastBaseOccurrence = null;

    while (true) {

        iterations++;

        let result = occurrence.format(config.options.format);

        if (config.options.skipWeekend) {

            if (occurrence.weekday() === 0) {
                result = occurrence.clone().add(1, 'd').format(config.options.format);
            }

            if (occurrence.weekday() === 6) {
                result = occurrence.clone().add(2, 'd').format(config.options.format);
            }
        }

        if (config.dayOfMonth) {

            var isFebruary = (occurrence.month() == 1);
            if (isFebruary && config.dayOfMonth > 28) {
                result = moment(result).endOf('month').format(config.options.format);
            } else {
                var expectedDate = moment(result).format('YYYY-MM-') + config.dayOfMonth.pad(2);
                result = moment(expectedDate).format(config.options.format);
            }
        }

        if (!_.contains(results, result)) {
            results.push(result);
        }
        
        lastBaseOccurrence = occurrence.format(config.options.format);
        occurrence.add(config.every, config.interval);

        if (config.end !== null && occurrence.isAfter(config.end)) {
            break;
        }

        if (config.limit !== null && results.length >= config.limit) {
            break;
        }

        if (iterations >= config.iterations) {
            break;
        }
    }

    return {
        results: results,
        iterations: iterations,
        info: { 
            lastBaseOccurrence: lastBaseOccurrence
        }
    }
};
