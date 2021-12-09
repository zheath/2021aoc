const input = require('./sample')
const fs = require('fs')
const width = 10
const field = []
const basins = {'1': 0}
let currBasin = 1

let i = 0;
while(i < input.length){
    field.push(input.slice(i,i+width).replace(/[0-8]/g, '*').split(''))
    i+=width
}

// console.table(field)
field.forEach((row, y) => {
    row.forEach((p,x) => {
        if(p === '*'){
            const basinId = searchField(y, x);
            basins[basinId] = basins[basinId] ? basins[basinId] + 1 : 1
            field[y][x] = basinId
        } else {
            currBasin += 1
        }
    })
    // console.log('')
    // console.log('***************************************')
    // console.log('')
    // console.table(field)
})
console.table(field)
writeCSV();
// console.log(basins)
// console.log(Object.values(basins).sort((a, b) => b-a))
console.log(Object.values(basins).sort((a, b) => b-a).slice(0,3).reduce((acc, x) => acc * x, 1))

function searchField(y, x){
    if(!['*','9'].includes(field[y][x])){return field[y][x]}
    
    const left = field[y][x-1] && !['*','9'].includes(field[y][x-1]) ? field[y][x-1] : null
    if(left){return left}

    const above = field[y-1] && field[y-1][x] && field[y-1][x] !== '9' ? field[y-1][x] : null
    if(above){return above}

    const right = field[y][x+1] && field[y][x+1] !== '9' ? searchField(y, x+1) : null
    if(right){return right}

    const below = field[y+1] ? field[y+1][x] : null
    if(below === '9' || !field[y+1]){return currBasin}

    const downLeft = searchBack(y+1, x)
    if(downLeft){return downLeft}

    return searchForward(y+1, x)
}

function next(y, x){
    const above = !['*','9'].includes(field[y-1][x]) ? field[y-1][x] : null
    if(above){return above}
    if(!field[y][x-1] || field[y][x-1] === '9'){return null}
    
    const back = searchBack(y, x-1)
    const next = field[y+1] && field[y+1][x] === '*'  searchBack(y+1, x) : null

    return searchBack(y, x-1)
}

function searchForward(y, x){
    let above = '*'
    let inc = 1
    while(above === '*'){
        above = field[y-inc] && field[y-inc][x] !== '9' ? field[y-inc][x] : null
        inc += 1
    }
    if(above){return above}
    if(!field[y][x+1] || field[y][x+1] === '9'){return currBasin}
    return searchForward(y, x+1)
}

function writeCSV(){
    let data = ''
    field.forEach(row => {
        const rowString = row.join(',') + '\n'
        data = data + rowString
    })
    fs.writeFile('field.csv',data, () => {})
}