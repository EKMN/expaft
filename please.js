const prettyMs = require('pretty-ms')

// units
const millisecond = 1
const second = 1000 * millisecond
const minute = 60 * second
const hour = 60 * minute
const day = 24 * hour

const milliseconds = (time) => time * millisecond
const seconds = (time) => time * second
const minutes = (time) => time * minute
const hours = (time) => time * hour
const days = (time) => time * day

const now = () => +new Date()

const tokenize = (dateString) => {
  const tokens = dateString.split(' ').map((token) => {
    return !isNaN(+token) ? +token : token
  })

  const types = tokens.filter((token) => typeof token === 'string')
  const values = tokens.filter((token) => typeof token === 'number')

  if (types.length !== values.length) {
    const guiltyParty = types.length > values.length ? 'string' : 'number'
    const oppositeParty = guiltyParty === 'string' ? 'number' : 'string'
    const failReason = guiltyParty === 'string' ? types[types.length - 1] : values[values.length - 1]
    let message = `Tokenizer error: Invalid argument. Expected a ${guiltyParty} but found a ${oppositeParty}. Failed item: ${failReason}`
    throw Error(message)
  }

  return types.map((type, i) => {
    return {
      type,
      value: values[i]
    }
  })
}

const timeFrom = (token) => {
  const { type, value } = token
  switch (type.toLowerCase()) {
    case 'milliseconds':
    case 'millisecond':
    case 'ms':
      return milliseconds(value)
    case 'seconds':
    case 'second':
    case 'secs':
    case 's':
      return seconds(value)
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return minutes(value)
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return hours(value)
    case 'days':
    case 'day':
    case 'd':
      return days(value)
    default:
      const message = `Invalid token type "${type}"`
      throw Error(message)
  }
}

const expaft = {
  time: (time) => {
    const currently = now()
    return tokenize(time).reduce((timeTotal, token) => {
      return timeTotal + timeFrom(token)
    }, currently)
  },
  delta: (time) => {
    const currently = now()
    return (
      tokenize(time).reduce((timeTotal, token) => {
        return timeTotal + timeFrom(token)
      }, currently) - currently
    )
  }
}

console.log(tokenize('16 days 1 hour 22 minutes 2 seconds'))

const testCases = {
  'Ten hours and 1 minute ahead': `${new Date()} --> ${new Date(expaft.time('10 hrs 1 min'))}`,
  '365 days 16 hours 52 minutes 500 ms': prettyMs(expaft.delta('365 days 16 hours 52 minutes 500 ms')),
  '23 hours 59 minutes 58 seconds 500 ms': prettyMs(expaft.delta('23 hours 59 minutes 58 seconds 500 ms')),
  '16 days 1 hour 22 minutes 2 seconds': prettyMs(expaft.delta('16 days 1 hour 22 minutes 2 seconds')),
  '72 hours 30 seconds': prettyMs(expaft.delta('72 hours 30 seconds'))
  // '21 hours .3s 0as seconds': prettyMs(expaft('21 hours 30as seconds'))
}

console.log(testCases)

module.exports = expaft
