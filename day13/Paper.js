const _ = require('lodash')
module.exports = class Paper{
    constructor(dots){
        this.dots = dots
    }
    fold(inst){
        const direction = inst[0]
        const position = inst[1]
        console.log(`folding paper on the ${direction === 'y' ? 'vertically' : 'horizontally'} at position ${position}`)
        // console.log(this.dots)
        const dotsToShift = this.dots.filter(dot => dot[direction] > position)
        // console.log(dotsToShift.length)
        //newY = yFoldLine - (currY - yFoldLine)
        dotsToShift.forEach(newDot => {
            _.remove(this.dots, oldDot => _.isEqual(newDot, oldDot))
            const newPosition = position - (newDot[direction] - position)
            newDot[direction] = newPosition
            if(_.findIndex(this.dots, testDot => _.isEqual(testDot, newDot)) < 0){this.dots.push(newDot)}
        })
    }
    print(){
        const bounds = this.getMax()
        const output = []
        for(let y = 0; y <= bounds.y; y++){
            const row = []
            for(let x = 0; x<= bounds.x; x++){
                row.push(_.findIndex(this.dots, dot => (dot.y === y && dot.x === x)) >= 0 ? '#' : ' ')
            }
            output.push(row)
        }
        console.table(output)
    }
    getMax(){
        const x = _.reverse(_.sortBy(this.dots, ['x']))[0].x
        const y = _.reverse(_.sortBy(this.dots, ['y']))[0].y
        return {x: x, y: y}
    }
}