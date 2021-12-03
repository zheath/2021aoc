const input = require('./sample')
// const input = require('./input')
const splitlist = input.map(num => num.split(''))

console.log(parseInt(calcO2(splitlist, 0),2)*parseInt(calcCO2(splitlist, 0), 2))

function calcO2(list, posn){
    if(list.length === 1){ return list[0].join('') }
    const nextLists = parseList(list, posn);
    return calcO2(nextLists.most, posn + 1)    
}

function calcCO2(list, posn){
    if(list.length === 1){ return list[0].join('') }
    const nextLists = parseList(list, posn);
    return calcCO2(nextLists.least, posn + 1)    
}

function parseList(list, posn){
    const ones = []
    const zeros = []
    list.forEach(num => {
        if(num[posn] === '0') {
            zeros.push(num)
        } else {
            ones.push(num)
        }
    })
    return {
        least: ones.length >= zeros.length ? zeros : ones,
        most: ones.length >= zeros.length ? ones : zeros
    }
}