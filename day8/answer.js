const input = require('./input')
const data = input.map(el => {
    const delimIndex = el.indexOf('|')
    const prefix = el.slice(0, delimIndex - 1)
    const suffix = el.slice(delimIndex + 2)
    // console.log(delimIndex)
    // console.log(prefix)
    // console.log(suffix)
    return {
        prefix: prefix.split(' '),
        suffix: suffix.split(' ')
    }
})
let count = 0
data.forEach(el => {
    const c = el.suffix.filter(x => [2,3,4,7].includes(x.length)).length
    count += c
})
console.log(count)