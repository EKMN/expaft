# expaft
⏱️Tiny Expiration Helper For Node

## API
### expaft(string)
Expects a string and returns a (then > now) unix timestamp for a later date
### expaft.delta(string)
Expects a string and returns the delta between now and a later date in milliseconds

## How to use
```js
const expaft = require('expaft')

const laterDate = expaft('16 hrs 200 mins 500 secs')
const deltaNowThen = expaft.delta('16 hrs 200 mins 500 secs 200 ms')

console.log(laterDate)
// => a valid timestamp for a later date

console.log(new Date(laterDate))
// => a valid future date

console.log(deltaNowThen)
// => the time (in milliseconds) between now and the future timestamp
```

## Format
### There are two types of keys
- A **Type** that represents a unit of time (e.g. 'minute', 'hour', 'hours', 'seconds')
- An **Amount** integer

### The order of those keys should be as follows:

```
'amount type amount type amount type...'

or

'type amount type amount type amount ...'
```

## Available time units & their aliases
*All time units are case-insensitive*

### Milliseconds
- milliseconds
- millisecond
- msecs
- msec
- ms

### Seconds
- seconds
- second
- secs
- sec
- s

### Minutes
- minutes
- minute
- mins
- min
- m

### Hours
- hours
- hour
- hrs
- hr
- h

### Days
- days
- day
- d

