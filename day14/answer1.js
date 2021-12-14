const Polymer = require('./Polymer')
const Element = require('./Element')
const input = require('./input')
const periodicTable = []
const rules = input.rules.reduce((rulesObj, curr) => {
    const insertPair = curr.split(' -> ')[0]
    const elId = curr.split(' -> ')[1]
    let el = periodicTable.find(el => el.id === elId)
    if(!el){
        el = new Element(elId, [], 0)
        periodicTable.push(el)
    }
    rulesObj[insertPair] = el
    return rulesObj
}, {})
const p = new Polymer(input.template, rules, periodicTable)

p.origString.split('').forEach((elId, index) => {
    const element = p.periodicTable.find(el => el.id === elId)
    element.count += 1
    element.insertIndices.push(index)
})

// for(let i = 1; i<=10; i++){p.polymorph()}
// const totals = p.periodicTable.reduce((totes, el) => {
//     if(el.count > totes.most){totes.most = el.count}
//     else if(el.count < totes.least){totes.least = el.count}
//     return totes
// }, {most: 0, least: 99999999999999})
// console.log(`${totals.most} - ${totals.least} = ${totals.most - totals.least}`)
// console.log(p.rules)
// console.log(p.getRuleMatches('NBCCNBBBCBHCB'))

// p.polymorph() //step 1
// console.log('')
// console.log('')
// p.polymorph() //step 2
// console.log('')
// console.log('')
// console.log(p.polymorph().length) //step 3
// console.log(p.polymorph().length) //step 4
// console.log(p.polymorph().length) //step 5
// console.log(periodicTable)