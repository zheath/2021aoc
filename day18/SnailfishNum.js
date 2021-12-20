const indexOfNth = require('../helpers/indexOfNth')
module.exports = class SnailfishNum{
    constructor(numArr){
        this.number = numArr
        this.numStr = JSON.stringify(this.number)
    }
    reduce(){
        const nextExp = this._nextExplodable()
        console.log(nextExp)
        const isSplit = this.number.toString().split(',').filter(n => parseInt(n) >= 10).length > 0
        if(nextExp){
            //explode leftmost unexploded pair!
            return this._explode(nextExp)
        } else if(isSplit){
            //split nums!
            // this._split()
            // this.reduce()
        }
        return this.numStr
    }
    _nextExplodable(){
        let searchStart = 0
        while(searchStart >= 0){
            const testIndex = this.numStr.slice(searchStart).search(/\[\d,\d\]/)
            const substr = this.numStr.slice(searchStart, testIndex + 1)
            const openCount = substr.match(/\[/g)?.length ?? 0
            const closedCount = substr.match(/\]/g)?.length ?? 0
            if(openCount - closedCount >= 4){
                const pair = this.numStr.slice(testIndex, this.numStr.indexOf(']', testIndex) + 1)
                return {start: testIndex, end: testIndex + pair.length - 1, pair: JSON.parse(pair)}
            }
            searchStart = testIndex
        }
        return null
    }
    _explode(explodable){  
        const left = explodable.pair[0]
        const right = explodable.pair[1]
        const leftStr = this.numStr.slice(0,explodable.start).split('').reverse().join('')
        console.log('searching left side:',leftStr)
        const leftIndex = leftStr.search(/\d/)
        if(leftIndex >= 0){
            //replace value with sum of left index and left pair
            const leftNum = leftStr.slice(leftIndex, leftIndex + 1)
            const newNum = parseInt(leftNum)+parseInt(left)
            console.log(`Replacing ${leftNum} with ${newNum} on the left`)
            const temp = this.numStr.split('')
            temp.splice(leftIndex, 1, newNum)
            this.numStr = temp.join('')
        }
        const rightStr = this.numStr.slice(explodable.end + 1)        
        const rightIndex = rightStr.search(/\d/)
        console.log('searching right side:',rightStr,'digit found at',rightIndex)
        if(rightIndex >= 0){
            //replace value with sum of right index and right pair
            const rightNum = rightStr.slice(rightIndex, rightIndex + 1)
            const newNum = parseInt(rightNum)+parseInt(right)
            console.log(`Replacing ${rightNum} with ${newNum} on the right`)
            const temp = this.numStr.split('')
            temp.splice(explodable.end + rightIndex + 1, 1, newNum)
            this.numStr = temp.join('')
        }
        //replace currently selected pair with 0 in primary string
        const replaceRegex = new RegExp('\\' + JSON.stringify(explodable.pair).slice(0, -1) + '\\]')
        this.numStr = this.numStr.replace(replaceRegex, '0')
        console.log(this.numStr)
        return this.reduce()
    }
    _split(){
        console.log(this.number)
    }
}