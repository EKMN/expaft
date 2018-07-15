// time units
const millisecond = 1
const second = 1000 * millisecond
const minute = 60 * second
const hour = 60 * minute
const day = 24 * hour

// time methods
const milliseconds = (time) => time * millisecond
const seconds = (time) => time * second
const minutes = (time) => time * minute
const hours = (time) => time * hour
const days = (time) => time * day

// returns the current UNIX timestamp
const now = () => +new Date()

const tokenize = (dateString) => {
  // throw an error if dateString is missing
  if (!dateString) {
    throw Error('Invalid argument: argument is missing')
  }

  // remove leading and trailing spaces
  dateString = dateString.trim()

  // throw an error if dateString is empty
  if (!dateString.length) {
    throw Error(`Invalid argument: argument cannot be empty`)
  }

  // split the string into tokens and converts int-able strings into proper ints
  const tokens = dateString.split(' ').map((token) => {
    return !isNaN(+token) ? +token : token
  })

  // extract the types and values from the tokens
  const types = tokens.filter((token) => typeof token === 'string')
  const values = tokens.filter((token) => typeof token === 'number')

  // fail if we don't have any tokens
  if (!tokens) {
    throw Error(`Invalid argument: improperly formatted string`)
  }

  // fail if we don't have equally many types and values
  if (types.length !== values.length) {
    const guiltyParty = types.length > values.length ? 'string' : 'number'
    const oppositeParty = guiltyParty === 'string' ? 'number' : 'string'
    const failReason = guiltyParty === 'string' ? types[types.length - 1] : values[values.length - 1]
    let message = `Tokenizer error: Invalid argument. Expected a ${oppositeParty} but found a ${guiltyParty}. Failed token: ${failReason}`
    throw Error(message)
  }

  return types.map((type, i) => {
    return {
      type,
      value: values[i]
    }
  })
}

// provided a valid token, this will return the correct time (in milliseconds)
const timeFrom = (token) => {
  const { type, value } = token
  switch (type.toLowerCase()) {
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return milliseconds(value)
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
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

// core function - returns a (then > now) unix timestamp for a later date
const expaft = (time) => {
  const currently = now()
  return tokenize(time).reduce((timeTotal, token) => {
    return timeTotal + timeFrom(token)
  }, currently)
}

// delta function - returns the delta between now and a later date in milliseconds
expaft.delta = (time) => {
  const currently = now()
  return (
    tokenize(time).reduce((timeTotal, token) => {
      return timeTotal + timeFrom(token)
    }, currently) - currently
  )
}

module.exports = expaft
