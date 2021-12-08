const input = require('./input')
const helpers = require('./helpers')
const data = input.map(el => ({
    cypher: el.slice(0, el.indexOf('|') - 1).split(' '),
    answers: el.slice(el.indexOf('|') + 2).split(' ')
}))

const answer = data.map(line => helpers.decode(line)).reduce((a, b) => a + parseInt(b), 0)
console.log(answer)
