'use strict';

var assert = require('chai').assert;
var recurring = require('./../lib/index');

describe('lib/recurring', function () {

    describe('recurring daily', function () {

        it('given options for daily recurring every 2 days, result should be as expected', function () {

            let result = recurring({
                interval: 'd',
                every: 2,
                start: '2018-01-11',
                end: '2018-02-01'
            });

            let expectedResult = {
                results: [
                    '2018-01-11',
                    '2018-01-13',
                    '2018-01-15',
                    '2018-01-17',
                    '2018-01-19',
                    '2018-01-21',
                    '2018-01-23',
                    '2018-01-25',
                    '2018-01-27',
                    '2018-01-29',
                    '2018-01-31'
                ],
                iterations: 11
            };

            assert.deepEqual(result, expectedResult);
        });

        it('given options for daily recurring every 2 days ignoring weekends, result should be as expected', function () {

            let result = recurring({
                interval: 'd',
                every: 2,
                start: '2018-01-11',
                end: '2018-02-01',
                options: {
                    skipWeekend: true
                }
            });

            let expectedResult = {
                results: [
                    '2018-01-11',
                    '2018-01-15',
                    '2018-01-17',
                    '2018-01-19',
                    '2018-01-22',
                    '2018-01-23',
                    '2018-01-25',
                    '2018-01-29',
                    '2018-01-31'
                ],
                iterations: 11
            };

            assert.deepEqual(result, expectedResult);
        });

        it('given options for daily recurring every 3 days with no end date, result should be as expected', function () {

            let result = recurring({
                interval: 'd',
                every: 3,
                start: '2018-01-11',
                iterations: 12
            });

            let expectedResult = {
                results: [
                    '2018-01-11',
                    '2018-01-14',
                    '2018-01-17',
                    '2018-01-20',
                    '2018-01-23',
                    '2018-01-26',
                    '2018-01-29',
                    '2018-02-01',
                    '2018-02-04',
                    '2018-02-07',
                    '2018-02-10',
                    '2018-02-13',
                ],
                iterations: 12
            };

            assert.deepEqual(result, expectedResult);
        });
    });

    describe('recurring weekly', function () {

        it('given options for weekly recurring every 3 months, result should be as expected', function () {

            let result = recurring({
                interval: 'w',
                every: 3,
                start: '2018-01-11',
                end: '2019-02-01'
            });

            let expectedResult = {
                results: [
                    '2018-01-11',
                    '2018-02-01',
                    '2018-02-22',
                    '2018-03-15',
                    '2018-04-05',
                    '2018-04-26',
                    '2018-05-17',
                    '2018-06-07',
                    '2018-06-28',
                    '2018-07-19',
                    '2018-08-09',
                    '2018-08-30',
                    '2018-09-20',
                    '2018-10-11',
                    '2018-11-01',
                    '2018-11-22',
                    '2018-12-13',
                    '2019-01-03',
                    '2019-01-24'
                ],
                iterations: 19
            };

            assert.deepEqual(result, expectedResult);
        });

        it('given options for weekly recurring every 2 weeks on wednesday, result should be as expected', function () {

            let result = recurring({
                interval: 'w',
                weekday: 3,
                every: 2,
                start: '2018-01-11',
                end: '2018-05-01'
            });

            let expectedResult = {
                results: [
                    '2018-01-17',
                    '2018-01-31',
                    '2018-02-14',
                    '2018-02-28',
                    '2018-03-14',
                    '2018-03-28',
                    '2018-04-11',
                    '2018-04-25'
                ],
                iterations: 8
            };

            assert.deepEqual(result, expectedResult);
        });
    });

    describe('recurring monthly', function () {

        it('given options for monthly recurring every 4 months, result should be as expected', function () {

            let result = recurring({
                interval: 'M',
                every: 4,
                start: '2018-01-11',
                end: '2020-02-01'
            });

            let expectedResult = {
                results: [
                    '2018-01-11',
                    '2018-05-11',
                    '2018-09-11',
                    '2019-01-11',
                    '2019-05-11',
                    '2019-09-11',
                    '2020-01-11'
                ],
                iterations: 7
            };

            assert.deepEqual(result, expectedResult);
        });

        it('given options for monthly recurring every 3 months on day 15, result should be as expected', function () {

            let result = recurring({
                interval: 'M',
                every: 3,
                dayOfMonth: 15,
                start: '2018-01-11',
                end: '2020-02-01'
            });

            let expectedResult = {
                results: [
                    '2018-01-15',
                    '2018-04-15',
                    '2018-07-15',
                    '2018-10-15',
                    '2019-01-15',
                    '2019-04-15',
                    '2019-07-15',
                    '2019-10-15',
                    '2020-01-15'
                ],
                iterations: 9
            };

            assert.deepEqual(result, expectedResult);
        });

        it('given options for monthly recurring every 1 months on day 30 (including February), result should be as expected', function () {

            let result = recurring({
                interval: 'M',
                every: 1,
                dayOfMonth: 30,
                start: '2018-01-11',
                end: '2018-05-01'
            });

            let expectedResult = {
                results: [
                    '2018-01-30',
                    '2018-02-28',
                    '2018-03-30',
                    '2018-04-30',
                ],
                iterations: 4
            };

            assert.deepEqual(result, expectedResult);
        });

        it('given options for monthly recurring every 1 months on day 30 (including February on a leap year), result should be as expected', function () {

                        let result = recurring({
                            interval: 'M',
                            every: 1,
                            dayOfMonth: 30,
                            start: '2020-01-11',
                            end: '2020-05-01'
                        });

                        let expectedResult = {
                            results: [
                                '2020-01-30',
                                '2020-02-29',
                                '2020-03-30',
                                '2020-04-30',
                            ],
                            iterations: 4
                        };

                        assert.deepEqual(result, expectedResult);
                    });
    });


    describe('recurring yearly', function () {

        it('given options for yearly recurring every 1 year, result should be as expected', function () {

            let result = recurring({
                interval: 'y',
                every: 1,
                start: '2018-01-11',
                end: '2021-02-01',
            });

            let expectedResult = {
                results: ['2018-01-11', '2019-01-11', '2020-01-11', '2021-01-11'],
                iterations: 4
            };

            assert.deepEqual(result, expectedResult);
        });
    });
});
