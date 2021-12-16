const { now } = require('lodash')
const Node = require('./Node')
const input = require('./input')
const pq = []

const expandedColumns = input.map((row, y) => {
    const newCols = [row.map(n => parseInt(n))]
    for(i = 1; i < 5; i++){ newCols.push(newCols[i-1].map(n => n+1 > 9 ? 1 : n+1)) }
    return newCols.flat()
})

const expandedRows = [...expandedColumns]

const offSet = expandedRows.length

for(let iteration = 0; iteration < 4; iteration ++){
    const startRow = iteration * offSet
    for(let r = startRow; r < startRow + offSet; r++){
        expandedRows.push(expandedRows[r].map(n => n+1 > 9 ? 1 : n+1))
    }
}

const nodes = expandedRows.map((row, y) => row.map((v, x) => new Node(y, x, v)))
// console.log(nodes[37][37])
// console.table(nodes)

nodes.forEach((row, y) => row.forEach((n, x) => {
    const sibs = []
    if(nodes[y][x-1]){sibs.push(nodes[y][x-1])} //left of current
    if(nodes[y][x+1]){sibs.push(nodes[y][x+1])} //right of current
    if(nodes[y-1]){sibs.push(nodes[y-1][x])} //above current
    if(nodes[y+1]){sibs.push(nodes[y+1][x])} //below current
    n.siblings = sibs.sort((a, b) => a.risk - b.risk)
    pq.push(n)
}))

console.log('Running N =',pq.length)
const start = Date.now();

// console.log(nodes[37][37])
// console.log(pq[0])
let nextNode = pq.shift()
const targetNode = {y: nodes.length-1, x: nodes[0].length-1}
nextNode.distToNode = 0
while(pq.length > 0){
    shortestPath(nextNode)
    pq.sort((n1, n2) => n2.distToNode - n1.distToNode)
    nextNode = pq.pop()
}
// console.table(nodes.map(row => row.map(n => n.distToNode)))
console.log(nodes[targetNode.y][targetNode.x].distToNode)

console.log(`Milliseconds elapsed = ${Math.floor((Date.now() - start))}`);

function shortestPath(node){
    node.visited = true    
    const unvisitedSiblings = node.siblings.filter(sib => !sib.visited)
    unvisitedSiblings.forEach(sib => node.distToNode + sib.risk < sib.distToNode ? sib.distToNode = node.distToNode + sib.risk : null)
}