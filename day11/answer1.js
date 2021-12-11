const Octopus = require('./Octopus');
const input = require('./input');
const flashCounts = []
const octoList = []
const field = input
                .map((row, y) => row.split('')
                .map((octopus, x) => {
                    const o = new Octopus(octopus, y, x)
                    octoList.push(o)
                    return o
                }))
setNeighbors()

let stop = false
let i = 1
while(!stop){
    stop = step(i)
    if(stop){console.log('Synchronized on step',i)}
    i += 1
}

// console.log(flashCounts.reduce((tot, cnt) => tot + cnt, 0))

function setNeighbors(){
    octoList.forEach(octo => {
        const {y, x} = octo
        if(field[y-1]){octo.neighbs.push(field[y-1][x])}
        if(field[y-1] && field[y][x+1]){octo.neighbs.push(field[y-1][x+1])}
        if(field[y][x+1]){octo.neighbs.push(field[y][x+1])}
        if(field[y+1] && field[y][x+1]){octo.neighbs.push(field[y+1][x+1])}
        if(field[y+1]){octo.neighbs.push(field[y+1][x])}
        if(field[y+1] && field[y][x-1]){octo.neighbs.push(field[y+1][x-1])}
        if(field[y][x-1]){octo.neighbs.push(field[y][x-1])}
        if(field[y-1] && field[y][x-1]){octo.neighbs.push(field[y-1][x-1])}
    })
}

function step(stepNum){
    octoList.forEach(o => o.powerUp())
    const flashers = octoList.filter(o => o.flashed)    
    flashCounts.push(flashers.length)
    if(flashers.length === octoList.length){ return true }
    flashers.forEach(o => o.flashed = false)
    return false
    // console.log('Results for step',stepNum)
    // console.table(field.map(row => row.map(o => o.power)))
    // console.log('')
    // console.log('')
}