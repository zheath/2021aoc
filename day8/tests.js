const helpers = require('./helpers')

test1 = {
    cypher: [
      'efab',   'cbedg',
      'aedfbc', 'bfcad',
      'geacfd', 'ea',
      'fabdcg', 'adbfgce',
      'ade',    'ecabd'
    ],
    answers: [ 'fdceba', 'bfceda', 'ecgdfa', 'aefcdg' ]
}

console.log('/****************************/')
console.log('Running Test 1')
const decoder = helpers.getDecoder(test1.cypher)
console.log(decoder)
// const answer = helpers.decode(decoder, test1.answers)
// console.log(answer.length === 0 ? 'Error' : answer)