// const input = require('./sample')
const input = require('./input')
console.log(input.length)
const counts = {}
for(var i = 0; i < input[0].length; i++){
    counts[i] = {
        zeroCount: 0,
        oneCount: 0
    }
}
// console.log(counts)

input.forEach(el => {
    el.split('').forEach((x, i) => {
        counts[i].zeroCount += x === '0' ? 1 : 0
        counts[i].oneCount += x === '1' ? 1 : 0
    })
})

console.log(counts)

const gammaRate = []
const epsilonRate = []
Object.keys(counts).forEach(key => {
    const count = counts[key]
    if(count.zeroCount === count.oneCount){
        console.log('terrible!!!');
        console.log(count);
    } else if (count.zeroCount < count.oneCount){
        gammaRate.push(1)
        epsilonRate.push(0)
    } else {
        gammaRate.push(0)
        epsilonRate.push(1)
    }
})

console.log(parseInt(gammaRate.join(''),2) * parseInt(epsilonRate.join(''),2))
