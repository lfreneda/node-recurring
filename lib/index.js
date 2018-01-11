'use strict';
const moment = require('moment');
const _ = require('lodash');

exports = module.exports = function (config) {

    config.options = config.options || {};
    config.options.format = config.options.format || 'YYYY-MM-DD';
    config.options.iterations = config.options.iterations || 50;

    config.start = moment(config.start);
    config.end = moment(config.end);

    let occurrence = config.start;

    if (config.dayOfMonth) {

        while(true) {
            if (occurrence.date() === config.dayOfMonth) {
                break;
            }
            occurrence.add(1, 'd');
        }
    }

    if (config.weekday) {

        while(true) {
            if (occurrence.weekday() === config.weekday) {
                break;
            }
            occurrence.add(1, 'd');
        }
    }

    let results = [];
    let iterations = 0;

    while(true) {
        
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

        results.push(result);

        occurrence.add(config.every, config.operator);

        if (occurrence.isAfter(config.end) || iterations > config.options.iterations) {
            break;
        }
    }

    return _.uniq(results);
};