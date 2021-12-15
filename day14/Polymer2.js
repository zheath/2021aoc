module.exports = class Polymer{
    constructor(origString, rules, periodicTable){
        this.origString = origString
        this.rules = rules
        this.periodicTable = periodicTable
    }
    currStr(){
        const outArr = []
        this.periodicTable.forEach(el => el.insertIndices.forEach(index => {
            // console.log(`Putting ${el.id} at position ${index}`)
            outArr[index] = el.id
        }))
        return outArr.join('')
    }
    polymorph(){
        const currStr = this.currStr()
        const matches = this.getRuleMatches(currStr)
        // check this tomorrow against hand written matches!!
        // console.log(currStr)
        // console.log(matches.sort((a, b) => a.index - b.index).map(m => ({i: m.index, e: m.el.id, k: m.key})))
        matches.sort((a, b) => a.index - b.index).forEach((match, offset) => {            
            // console.log(`Inserting ${match.el.id} at position ${parseInt(match.index) + parseInt(offset)}`)
            //get current element at index and increment that index for that element
            const el = this.periodicTable.find(el => el.id === currStr.slice(match.index, match.index + 1))
            el.insertIndices[el.insertIndices.indexOf(match.index)] += (1 + offset)
            match.el.insertIndices.push(match.index + offset)            
            match.el.count += 1
            // console.log(this.currStr())
        })
        return this.currStr()
    }
    getRuleMatches(str){
        const matches = []
        // const maxIndex = this.periodicTable.reduce((max, el) => {
        //     const maxInd = Math.max(...el.insertIndices)
        //     return maxInd > max ? maxInd : max
        // }, 0)
        let index = 0
        while(index < str.length){
            const testStr = str.slice(index, index+2)
            // console.log(testStr)
            const rule = this.rules[testStr]
            if(testStr.length === 2){ matches.push({index: index+1, key: testStr, el: this.rules[testStr]}) }
            index += 1
        }
        return matches
    }
}