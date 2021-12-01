const input = require('./input1')
console.log(input.length)

let count = 0

input.reduce((prev, curr) => {
    if(prev < curr){count += 1}
    return curr
})

console.log(count)