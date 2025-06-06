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
                iterations: 11,
                info: {
                    lastBaseOccurrence: '2018-01-31'
                }
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
                    '2018-01-23',
                    '2018-01-25',
                    '2018-01-29',
                    '2018-01-31'
                ],
                iterations: 8,
                info: {
                    lastBaseOccurrence: '2018-01-31'
                }
            };

            assert.deepEqual(result, expectedResult);
        });

        it('given options for daily recurring every 2 days ignoring weekends and with limit, result should be as expected', function () {

            let result = recurring({
                interval: 'd',
                every: 2,
                start: '2018-01-11',
                limit: 3,
                options: {
                    skipWeekend: true
                }
            });

            let expectedResult = {
                results: [
                    '2018-01-11',
                    '2018-01-15',
                    '2018-01-17'
                ],
                iterations: 3,
                info: {
                    lastBaseOccurrence: '2018-01-17'
                }
            };

            assert.deepEqual(result, expectedResult);
        });

        it('given options for daily recurring every 2 days ignoring weekends and with iterations, result should be as expected', function () {

            let result = recurring({
                interval: 'd',
                every: 2,
                start: '2018-01-11',
                iterations: 3,
                options: {
                    skipWeekend: true
                }
            });

            let expectedResult = {
                results: [
                    '2018-01-11',
                    '2018-01-15',
                    '2018-01-17'
                ],
                iterations: 3,
                info: {
                    lastBaseOccurrence: '2018-01-17'
                }
            };

            assert.deepEqual(result, expectedResult);
        });

        it('given options for daily recurring every 3 days ignoring weekends, result should be as expected', function () {
            let result = recurring({
                interval: 'd',
                every: 3,
                start: '2018-01-11',
                end: '2018-02-01',
                options: {
                    skipWeekend: true
                }
            });
            let expectedResult = {
                results: [
                    '2018-01-11',
                    '2018-01-16',
                    '2018-01-19',
                    '2018-01-24',
                    '2018-01-29',
                    '2018-02-01'
                ],
                iterations: 6,
                info: {
                    lastBaseOccurrence: '2018-02-01'
                }
            };
            assert.deepEqual(result, expectedResult);
        });

        it('given options for daily recurring every 4 days ignoring weekends, result should be as expected', function () {
            let result = recurring({
                interval: 'd',
                every: 4,
                start: '2018-01-11',
                end: '2018-02-01',
                options: {
                    skipWeekend: true
                }
            });
            let expectedResult = {
                results: [
                    '2018-01-11',
                    '2018-01-17',
                    '2018-01-23',
                    '2018-01-29'
                ],
                iterations: 4,
                info: {
                    lastBaseOccurrence: '2018-01-29'
                }
            };
            assert.deepEqual(result, expectedResult);
        });

        it('given options for daily recurring every 5 days ignoring weekends, result should be as expected', function () {
            let result = recurring({
                interval: 'd',
                every: 5,
                start: '2018-01-11',
                end: '2018-02-01',
                options: {
                    skipWeekend: true
                }
            });
            let expectedResult = {
                results: [
                    '2018-01-11',
                    '2018-01-18',
                    '2018-01-25',
                    '2018-02-01'
                ],
                iterations: 4,
                info: {
                    lastBaseOccurrence: '2018-02-01'
                }
            };
            assert.deepEqual(result, expectedResult);
        });

        it('given options for daily recurring every 6 days ignoring weekends, result should be as expected', function () {
            let result = recurring({
                interval: 'd',
                every: 6,
                start: '2018-01-11',
                end: '2018-02-01',
                options: {
                    skipWeekend: true
                }
            });
            let expectedResult = {
                results: [
                    '2018-01-11',
                    '2018-01-19',
                    '2018-01-29'
                ],
                iterations: 3,
                info: {
                    lastBaseOccurrence: '2018-01-29'
                }
            };
            assert.deepEqual(result, expectedResult);
        });

        it('given options for daily recurring every 45 days ignoring weekends, result should be as expected', function () {
            let result = recurring({
                interval: 'd',
                every: 45,
                start: '2018-01-11',
                end: '2018-12-01',
                options: {
                    skipWeekend: true
                }
            });
            let expectedResult = {
                results: [
                    '2018-01-11',
                    '2018-03-15',
                    '2018-05-17',
                    '2018-07-19',
                    '2018-09-20',
                    '2018-11-22'
                ],
                iterations: 6,
                info: {
                    lastBaseOccurrence: '2018-11-22'
                }
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
                iterations: 19,
                info: {
                    lastBaseOccurrence: '2019-01-24'
                }
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
                iterations: 8,
                info: {
                    lastBaseOccurrence: '2018-04-25'
                }
            };

            assert.deepEqual(result, expectedResult);
        });

        it('given options for weekly recurrence every 1 weeks on sunday result should be as expected', function () {

            let result = recurring({
                interval: 'w',
                weekday: 0,
                every: 1,
                start: '2023-08-28',
                end: '2023-12-31'
            });
    
            let expectedResult = {
                results: [
                    "2023-09-03",
                    "2023-09-10",
                    "2023-09-17",
                    "2023-09-24",
                    "2023-10-01",
                    "2023-10-08",
                    "2023-10-15",
                    "2023-10-22",
                    "2023-10-29",
                    "2023-11-05",
                    "2023-11-12",
                    "2023-11-19",
                    "2023-11-26",
                    "2023-12-03",
                    "2023-12-10",
                    "2023-12-17",
                    "2023-12-24",
                    "2023-12-31"
                ],
                iterations: 18,
                info: {
                    lastBaseOccurrence: '2023-12-31'
                }
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
                iterations: 7,
                info: {
                    lastBaseOccurrence: '2020-01-11'
                }
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
                iterations: 9,
                info: {
                    lastBaseOccurrence: '2020-01-15'
                }
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
                    '2018-03-30',
                    '2018-04-30',
                ],
                iterations: 4,
                info: {
                    lastBaseOccurrence: '2018-04-28'
                }
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

                    '2020-03-30',
                    '2020-04-30',
                ],
                iterations: 4,
                info: {
                    lastBaseOccurrence: '2020-04-29'
                }
            };

            assert.deepEqual(result, expectedResult);
        });

        it('given options for monthly recurring every 1 month on day 31 (including February), result should be as expected', function () {

            let result = recurring({
                interval: 'M',
                every: 1,
                dayOfMonth: 31,
                start: '2019-12-23',
                end: '2020-05-23'
            });

            let expectedResult = {
                results: [
                    '2019-12-31',
                    '2020-01-31',
                    '2020-03-31'
                ],
                iterations: 5,
                info: {
                    lastBaseOccurrence: '2020-04-29'
                }
            };

            assert.deepEqual(result, expectedResult)
        });

        it('given options for monthly recurring every 1 month on day 30 (including February on a leap year) skiping weekend, result should be as expected', function () {

            let result = recurring({
                interval: 'M',
                every: 1,
                dayOfMonth: 30,
                start: '2019-12-23',
                end: '2020-06-30',
                options: {
                    skipWeekend: true
                }
            });

            let expectedResult = {
                results: [
                    '2019-12-30',
                    '2020-01-30',
                    '2020-03-30',
                    '2020-04-30',
                    '2020-06-01',
                    '2020-06-30'
                ],
                iterations: 7,
                info: {
                    lastBaseOccurrence: '2020-06-29'
                }
            };

            assert.deepEqual(result, expectedResult)
        });

        it('given options for monthly recurring every 1 month on day 31 (including February) skip weekend, result should be as expected', function () {

            let result = recurring({
                interval: 'M',
                every: 1,
                dayOfMonth: 31,
                start: '2019-12-23',
                end: '2020-10-23',
                options: {
                    skipWeekend: true
                }
            });

            let expectedResult = {
                results: [
                    '2019-12-31',
                    '2020-01-31',
                    '2020-03-31',
                    '2020-06-01',
                    '2020-07-31',
                    '2020-08-31'
                ],
                iterations: 10,
                info: {
                    lastBaseOccurrence: '2020-09-29'
                }
            };

            assert.deepEqual(result, expectedResult)
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
                iterations: 4,
                info: {
                    lastBaseOccurrence: '2021-01-11'
                }
            };

            assert.deepEqual(result, expectedResult);
        });
    });
});
