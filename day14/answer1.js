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

for(let i = 1; i<=10; i++){console.log('Step',i,p.polymorph().length)}
const max = Math.max(...p.periodicTable.map(el => el.count))
const min = Math.min(...p.periodicTable.map(el => el.count))
console.log(`${max} - ${min} = ${max - min}`)
// p.periodicTable.sort((curr, next) => curr.count - next.count).forEach(el => console.log(el.id,':',el.count))
// console.log(p.currStr())
// console.log(p.rules)
// console.log(p.getRuleMatches('HHBPCPHOSFNSFCFVVHONBONPOPFNHOFBONBONPO'))

// console.log(p.polymorph()) //step 1
// console.log(p.polymorph()) //step 2
// console.log(p.polymorph()) //step 3
// console.log(p.polymorph().length) //step 4
// console.log(p.polymorph().length) //step 5
// console.log(periodicTable)