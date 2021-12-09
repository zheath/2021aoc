const input = require('./input')
const width = 100
const field = []
const lowPoints = []

let i = 0;
while(i < input.length){
    field.push(input.slice(i,i+width).split(''))
    i+=width
}

field.forEach((row, y) => {
    //console.log('Processing Row',y)
    row.forEach((position, x) => {
        //console.log(`(${x}, ${y}): ${position}`)
        const a1 = field[y][x-1] ? field[y][x-1] : 99 //left of current
        const a2 = field[y][x+1] ? field[y][x+1] : 99 //right of current
        const a3 = field[y-1] && field[y-1][x] ? field[y-1][x] : 99 //above current
        const a4 = field[y+1] && field[y+1][x] ? field[y+1][x] : 99 //below current
        //console.log(`a1: ${a1}, a2: ${a2}, a3: ${a3}, a4: ${a4}`)
        if(position < a1 && position < a2 && position < a3 && position < a4){lowPoints.push(parseInt(position)+1)}
    })
})

console.log(lowPoints.reduce((a,b)=>a+b))