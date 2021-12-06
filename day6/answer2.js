const input = require('./input')
const _ = require('lodash')

const fishCount = {'0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0}
input.split(',').forEach(fish => fishCount[fish] += 1)

console.log(solve(fishCount, 1))

function solve(fishCount, day){
    // console.log(`Day ${day}:`)
    // console.log(fishCount)
    if(day === 257){return _.reduce(fishCount, (acc, val) => acc += val, 0)}
    const next = shiftCounts(fishCount) 
    return solve(next, day + 1)    
}

function shiftCounts(fishCount){  
    return {
        '0': fishCount['1'],
        '1': fishCount['2'],
        '2': fishCount['3'],
        '3': fishCount['4'],
        '4': fishCount['5'],
        '5': fishCount['6'],
        '6': fishCount['7'] + fishCount['0'],
        '7': fishCount['8'],
        '8': fishCount['0'],
    }
}