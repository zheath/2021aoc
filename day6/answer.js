const input = require('./input')

console.log(solve(input.split(','), 1))

function solve(fishList, day){
    // console.log(`Day ${day}: ${fishList.join(',')}`)
    if(day === 257){return fishList.length}
    const spawners = fishList.filter(fish => fish === 0)
    const next = fishList.map(f => f === 0 ? 6 : f - 1)
    spawners.forEach(s => next.push(8))    
    return solve(next, day + 1)    
}