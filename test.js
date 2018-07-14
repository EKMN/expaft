import test from 'ava'

const prettyMs = require('pretty-ms')
const expaft = require('../index')

test('Ten hours and 1 minute ahead', (t) => {
  const time = expaft.delta('10 hours 1 minute')
  const expected = 1000 * 60 * 60 * 10 + 1000
  t.is(time, expected)
})

const testCases = {
  'Ten hours and 1 minute ahead': `${new Date()} -> ${new Date()}`,
  '365 days 16 hours 52 minutes 500 ms': prettyMs(expaft.delta('365 days 16 hours 52 minutes 500 ms')),
  '23 hours 59 minutes 58 seconds 500 ms': prettyMs(expaft.delta('23 hours 59 minutes 58 seconds 500 ms')),
  '16 days 1 hour 22 minutes 2 seconds': prettyMs(expaft.delta('16 days 1 hour 22 minutes 2 seconds')),
  '72 hours 30 seconds': prettyMs(expaft.delta('72 hours 30 seconds'))
  // '21 hours .3s 0as seconds': prettyMs(expaft('21 hours 30as seconds'))
}

console.log(testCases)
