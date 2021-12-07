const input = require('./input')
const inputArr = input.split(',')

const set = new Set();
inputArr.forEach(d => set.add(d))
const options = Array.from(set);
const min = Math.min(...options)
const max = Math.max(...options)
const avg = inputArr.reduce((a, b) => parseInt(a) + parseInt(b), 0) / inputArr.length
const median = inputArr[Math.round(inputArr.length/2)]
console.log(`Min: ${min}, Max: ${max}, Avg: ${avg}, Med: ${median}`)
let out1 = 9999999999999999999
for(let i = min; i <= max; i++){
    const test = calcFuel1(i)
    out1 = test < out1 ? test : out1
}
let out2 = 9999999999999999999
for(let i = min; i <= max; i++){
    const test = calcFuel2(i)
    out2 = test < out2 ? test : out2
}


// console.log(calcFuel2(min))
// console.log(calcFuel2(max))
console.log('/*******************************/')
console.log('/Part 1/')
console.log('Avg:',calcFuel1(avg))
console.log('Avg Round:',calcFuel1(Math.round(avg)))
console.log('Avg Floor:',calcFuel1(Math.floor(avg)))
console.log('Answer:',out1)
console.log('')
console.log('/*******************************/')
console.log('/Part 2/')
console.log('Avg:',calcFuel2(avg))
console.log('Avg Round:',calcFuel2(Math.round(avg)))
console.log('Avg Floor:',calcFuel2(Math.floor(avg)))
console.log('Answer:',out2)

function calcFuel1(position){
    return inputArr.reduce(((out, crab) => parseInt(out) + parseInt(Math.abs(crab - position))),0)
}

function calcFuel2(position){
    return inputArr.reduce(((out, crab) => {
        const distance = Math.abs(crab - position)
        let cost = 0
        for(let i = 1; i <= distance; i++){
            cost += i
        }
        return out + cost
    }),0)
}
