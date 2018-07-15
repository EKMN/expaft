import test from 'ava'

const prettyMs = require('pretty-ms')
const expaft = require('./index')

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

test('No argument', (t) => {
  t.throws(() => {
    expaft.time()
  })
})

test('Empty argument (1/2)', (t) => {
  t.throws(() => {
    expaft.time('')
  })
})

test('Empty argument (2/2)', (t) => {
  t.throws(() => {
    expaft.time(' ')
  })
})

test('Malformatted argument', (t) => {
  t.throws(() => {
    expaft.time('  . 0 . . ')
  })
})

const testCases = {
  'Ten hours and 1 minute ahead': `${new Date()} --> ${new Date(expaft.time('10 hrs 1 min'))}`,
  '365 days 16 hours 52 minutes 500 ms': prettyMs(expaft.delta('365 days 16 hours 52 minutes 500 ms')),
  '23 hours 59 minutes 58 seconds 500 ms': prettyMs(expaft.delta('23 hours 59 minutes 58 seconds 500 ms')),
  '16 days 1 hour 22 minutes 2 seconds': prettyMs(expaft.delta('16 days 1 hour 22 minutes 2 seconds')),
  '72 hours 30 seconds': prettyMs(expaft.delta('72 hours 30 seconds'))
  // '21 hours .3s 0as seconds': prettyMs(expaft('21 hours 30as seconds'))
}

console.log(testCases)
