const Board = require('./Board')
const winning = new Board([1,2,3,4,5])
const losing = new Board([
    1,9,9,9,9,
    2,9,9,9,9,
    3,9,9,9,9,
    4,9,9,9,9,
    8,9,9,9,9,
])

const nums = [1,2,3,4,5]

nums.forEach(num => {
    winning.markNumber(num);
    losing.markNumber(num);
})

console.log(winning);
console.log(losing);
console.log(winning.boardWins())
console.log(losing.boardWins())
