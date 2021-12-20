const input = require('./fulltest')
const SnailfishNum = require('./SnailfishNum')

const nextTwo = input.splice(0,2)
const nextNum = new SnailfishNum([nextTwo[0],nextTwo[1]])
nextNum.reduce()

