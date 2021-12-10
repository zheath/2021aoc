const input = require('./test1')
const fs = require('fs')
const Node = require('./Node')
const width = 10
const field = []
const basins = {'1': 0}
let currBasin = 1
const segments = []
let segment = []

let i = 0;
while(i < input.length){
    field.push(input.slice(i,i+width).replace(/[0-8]/g, '*').split(''))
    i+=width
}

field.forEach((row, y) => {
    row.forEach((p,x) => {
        const n = new Node(y, x, p)
        if(p === '*'){
            segment.push(n)
        } else {
            if(segment.length > 0){segments.push(segment)}
            segment = []
        }
    })
})

console.log(segments)

// nodes.forEach(node => solveNode(node))

// function solveNode(n){
//     console.log(n)
// }

console.table(field.map(r => r.map(n => n.value)))
// field.forEach((row, y) => {
//     row.forEach((p,x) => {
//         if(p === '*'){
//             const basinId = searchField(y, x);
//             basins[basinId] = basins[basinId] ? basins[basinId] + 1 : 1
//             field[y][x] = basinId
//         } else {
//             currBasin += 1
//         }
//     })
//     console.log('')
//     console.log('***************************************')
//     console.log('')
//     console.table(field)
// })
// console.table(field)
// writeCSV();
// console.log(basins)
// console.log(Object.values(basins).sort((a, b) => b-a))
// console.log(Object.values(basins).sort((a, b) => b-a).slice(0,3).reduce((acc, x) => acc * x, 1))

function searchField(y, x){
    const above = searchUp(y,x)
    if(above){return above}

    const left = searchLeft(y,x)
    if(left){return left}

    const right = searchRight(y,x)
    if(right){return right}

    if(!field[y+1] || field[y+1][x] === '9'){return currBasin}

    return searchField(y+1, x)
}

function searchUp(y,x){
    let above = '*'
    let inc = 1
    while(above === '*'){
        above = field[y-inc] && field[y-inc][x] !== '9' ? field[y-inc][x] : null
        inc += 1
    }
    return above
}

function searchLeft(y,x){
    let left = '*'
    let inc = 1
    while(left === '*'){
        const test = field[y][x-inc] && field[y][x-inc] !== '9' ? searchUp(y, x-inc) : null
        if(test){return test}
        left = field[y][x-inc] && field[y][x-inc] !== '9' ? field[y][x-inc] : null
        inc += 1
    }
    return left
}

function searchRight(y,x){
    let right = '*'
    let inc = 1
    while(right === '*'){
        const test = field[y][x+inc] && field[y][x+inc] !== '9' ? searchUp(y, x+inc) : null
        if(test){return test}
        right = field[y][x+inc] && field[y][x+inc] !== '9' ? field[y][x+inc] : null
        inc += 1
    }
    return right
}

function writeCSV(){
    let data = ''
    field.forEach(row => {
        const rowString = row.join(',') + '\n'
        data = data + rowString
    })
    fs.writeFile('field.csv',data, () => {})
}