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
  // remove leading and trailing spaces
  dateString = dateString.trim()

  // throw an error if dateString is empty
  if (!dateString || !dateString.length) {
    throw Error(`Invalid argument: argument cannot be empty`)
  }

  // splits the string into tokens and converts int-able strings into proper ints
  const tokens = dateString.split(' ').map((token) => {
    return !isNaN(+token) ? +token : token
  })

  const types = tokens.filter((token) => typeof token === 'string')
  const values = tokens.filter((token) => typeof token === 'number')

  // fail if we don't have any tokens or if dateString is empty
  if (!tokens) {
    throw Error(`Invalid argument: improperly formatted string`)
  }

  // fail if we don't have as many types as values
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

module.exports = expaft
