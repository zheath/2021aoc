const Node = require('./Node')
const PriorityQueue = require('./PriorityQueue')
const input = require('./input')
//const pq = new PriorityQueue((n1, n2) => n1.distToNode < n2.distToNode)
const pq = []

const nodes = input.map((row, y) => row.map((v, x) => new Node(y, x, v)))

nodes.forEach((row, y) => row.forEach((n, x) => {
    const sibs = []
    if(nodes[y][x-1]){sibs.push(nodes[y][x-1])} //left of current
    if(nodes[y][x+1]){sibs.push(nodes[y][x+1])} //right of current
    if(nodes[y-1]){sibs.push(nodes[y-1][x])} //above current
    if(nodes[y+1]){sibs.push(nodes[y+1][x])} //below current
    n.siblings = sibs.sort((a, b) => a.risk - b.risk)
    pq.push(n)
}))

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

function shortestPath(node){
    node.visited = true    
    const unvisitedSiblings = node.siblings.filter(sib => !sib.visited)
    unvisitedSiblings.forEach(sib => node.distToNode + sib.risk < sib.distToNode ? sib.distToNode = node.distToNode + sib.risk : null)
}