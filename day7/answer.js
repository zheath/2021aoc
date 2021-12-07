const input = require('./input')
const inputArr = input.split(',')

const set = new Set();
inputArr.forEach(d => set.add(d))
const options = Array.from(set);
const min = Math.min(...options)
const max = Math.max(...options)
let out = 9999999999999999999
for(let i = min; i <= max; i++){
    const test = calcFuel2(i)
    out = test < out ? test : out
}

console.log(out)

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
