import test from 'ava'

const prettyMs = require('pretty-ms')
const expaft = require('./index')

const validDate = (date) => date instanceof Date && !isNaN(date)

test('365 days 16 hours 52 minutes 500 ms with PrettyMs', (t) => {
  const time = prettyMs(expaft.delta('365 days 16 hours 52 minutes 500 ms'))
  const expected = '1y 16h 52m 0.5s'
  t.is(time, expected)
})

test('Ten hours and 1 minute ahead', (t) => {
  const time = expaft.delta('10 hours 1 minute')
  const expected = 1000 * 60 * 60 * 10 + 1000 * 60
  t.is(time, expected)
})

test('365 days 16 hours 52 minutes 500 ms ahead', (t) => {
  const time = expaft.delta('365 days 16 hours 52 minutes 500 ms')
  const expected = 1000 * 60 * 60 * 24 * 365 + 1000 * 60 * 60 * 16 + 1000 * 60 * 52 + 500
  t.is(time, expected)
})

test('23 hours 59 minutes 58 seconds 500 ms', (t) => {
  const time = expaft.delta('23 hours 59 minutes 500 ms')
  const expected = 1000 * 60 * 60 * 23 + 1000 * 60 * 59 + 500
  t.is(time, expected)
})

test(`Returns valid timestamp given '23 hours 59 minutes'`, (t) => {
  const timestamp = expaft('23 hours 59 minutes')
  t.true(typeof timestamp === 'number' && validDate(new Date(timestamp)))
})

test('16 days 1 hour 22 minutes 2 seconds', (t) => {
  const time = expaft.delta('16 days 1 hour 22 minutes 2 seconds')
  const expected = 1000 * 60 * 60 * 24 * 16 + 1000 * 60 * 60 * 1 + 1000 * 60 * 22 + 1000 * 2
  t.is(time, expected)
})

test('72 hours 30 seconds', (t) => {
  const time = expaft.delta('72 hours 30 seconds')
  const expected = 1000 * 60 * 60 * 72 + 1000 * 30
  t.is(time, expected)
})

test('No argument', (t) => {
  t.throws(() => {
    expaft()
  })
})

test('Empty argument (1/2)', (t) => {
  t.throws(() => {
    expaft('')
  })
})

test('Empty argument (2/2)', (t) => {
  t.throws(() => {
    expaft(' ')
  })
})

test('Malformatted argument', (t) => {
  t.throws(() => {
    expaft('  . 0 . . ')
  })
})

test('Inversed order (+ extra string)', (t) => {
  t.throws(() => {
    expaft(' milliseconds 500 seconds 5001 seconds ')
  })
})

test('Inversed order (+ extra number)', (t) => {
  t.throws(() => {
    expaft(' 100 secs 500 mins 500')
  })
})

test('Valid format but invalid type', (t) => {
  t.throws(() => {
    expaft(' 100 zec ')
  })
})
