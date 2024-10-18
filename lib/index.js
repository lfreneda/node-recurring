'use strict'
const moment = require('moment')
const _ = require('underscore')._

if (!Number.prototype.pad) {
  Number.prototype.pad = function (size) {
    var s = String(this)
    while (s.length < (size || 2)) {
      s = '0' + s
    }
    return s
  }
}

exports = module.exports = function (config) {
  config.options = config.options || {}
  config.options.format = config.options.format || 'YYYY-MM-DD'
  config.iterations = config.iterations || 50
  config.limit = config.limit || null
  config.start = moment(config.start)
  config.end = config.end ? moment(config.end) : null

  const occurrence = config.start.clone()

  if (config.dayOfMonth) {
    while (occurrence.date() !== config.dayOfMonth) {
      occurrence.add(1, 'd')
    }
  }

  if (config.weekday || config.weekday === 0) {
    while (occurrence.weekday() !== config.weekday) {
      occurrence.add(1, 'd')
    }
  }

  const results = []
  let iterations = 0
  let lastBaseOccurrence = null

  while (true) {
    iterations++

    let result = occurrence.clone()

    if (config.dayOfMonth) {
      const expectedDate = moment(result).format('YYYY-MM-') + config.dayOfMonth.pad(2)
      result = moment(expectedDate)
    }

    if (config.options.skipWeekend) {
      if (config.interval === 'd') {
        let daysToAdd = config.every
        while (daysToAdd > 0) {
          occurrence.add(1, 'd')
          if (occurrence.weekday() !== 0 && occurrence.weekday() !== 6) {
            daysToAdd--
          }
        }
      } else if (config.interval === 'M') {
        occurrence.add(config.every, 'M')
        result.date(config.dayOfMonth)

        if (result.weekday() === 0) {
          result.add(1, 'd')
        } else if (result.weekday() === 6) {
          result.add(2, 'd')
        }
      }
    } else {
      occurrence.add(config.every, config.interval)
    }

    if (result.isValid()) {
      const formattedResult = result.format(config.options.format)
      if (!_.contains(results, formattedResult)) {
        results.push(formattedResult)
      }

      lastBaseOccurrence = result.format(config.options.format)
    }

    if (config.end && occurrence.isAfter(config.end)) {
      break
    }

    if (config.limit !== null && results.length >= config.limit) {
      break
    }

    if (iterations >= config.iterations) {
      break
    }
  }

  return {
    results: results,
    iterations: iterations,
    info: {
      lastBaseOccurrence: lastBaseOccurrence
    }
  }
}
