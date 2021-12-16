const Node = require('./Node')
const PriorityQueue = require('./PriorityQueue')
const pq = new PriorityQueue((n1, n2) => n1.distToNode < n2.distToNode)

const n1 = new Node(0, 0, 0)
const n2 = new Node(0, 1, 5)
const n3 = new Node(1, 0, 3)
n1.distToNode = 0
n2.distToNode = 5
n3.distToNode = Infinity

pq.push(n3)
// console.log(pq.peek())
pq.push(n1)
// console.log(pq.peek())
pq.push(n2)
// console.log(pq.peek())

pq.getTopN(10).forEach(n => {
    console.log(`(${n.y},${n.x}): ${n.distToNode}`)
})

pq.pop()
console.log('')
console.log('')
pq.getTopN(10).forEach(n => {
    console.log(`(${n.y},${n.x}): ${n.distToNode}`)
})