const input = require('./input')
const Node = require('./Node')
const fs = require('fs')
const field = []
const width = 100
const basins = {}
const lowPoints = []

let i = 0;
while(i < input.length){
    field.push(input.slice(i,i+width).split(''))
    i+=width
}

field.forEach((row, y) => row.forEach((pVal, x) => field[y][x] = new Node(y, x, pVal)))
field.forEach((row) => {
    row.forEach(node => {
        node.left = field[node.y][node.x-1] ? field[node.y][node.x-1] : null //left of current
        node.right = field[node.y][node.x+1] ? field[node.y][node.x+1] : null //right of current
        node.up = field[node.y-1] ? field[node.y-1][node.x] : null //above current
        node.down = field[node.y+1] ? field[node.y+1][node.x] : null //below current
        if((node.value < (node.left?.value ?? 99)) && 
           (node.value < (node.right?.value ?? 99)) && 
           (node.value < (node.up?.value ?? 99)) && 
           (node.value < (node.down?.value ?? 99))){lowPoints.push({y: node.y, x: node.x})}        
    })
})
lowPoints.forEach(lp => basins[JSON.stringify(lp)] = [])

// console.log(basins)

// console.log(getNode({y: 0, x: 1}))

console.log(Object.keys(basins)
    .map(basinKey => getNode(JSON.parse(basinKey)))
    .map((node,i) => searchBasin(node, i))
    .sort((a, b) => b-a)
    .slice(0,3)
    .reduce((tot, curr) => tot * curr, 1))

// console.table(field.map(row => row.map(n => n.value)))
writeCSV()

function getNode(coord){return field[coord.y][coord.x]}

function searchBasin(node, basinId){
    let basinCount = 1
    node.visited = true
    node.value = basinId
    if(node.right && node.right.value !== 9 && !node.right.visited){
        basinCount += searchBasin(node.right, basinId)
    }
    if(node.left && node.left.value !== 9 && !node.left.visited){
        basinCount += searchBasin(node.left, basinId)
    }
    if(node.up && node.up.value !== 9 && !node.up.visited){
        basinCount += searchBasin(node.up, basinId)
    }
    if(node.down && node.down.value !== 9 && !node.down.visited){
        basinCount += searchBasin(node.down, basinId)
    }
    return basinCount
}

function writeCSV(){
    let data = ''
    field.forEach(row => {
        const rowString = row.map(n => n.value).join(',') + '\n'
        data = data + rowString
    })
    fs.writeFile('field.csv',data, () => {})
}