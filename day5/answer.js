const Line = require('./Line')
const _ = require('lodash')
const findIntersectingPoints = require('./findIntersectingPoints')
const lines = require('./input')
// console.log(lines.length);
const Lines = buildLines()
// console.log(Lines);
let intersectingPoints = [];

Lines.forEach(line1 => {
    console.log('checking line',line1.id)
    const comps = Lines.filter(l => l.id !== line1.id && !line1.compedIds.includes(l.id));
    comps.forEach(line2 => {
        intersectingPoints = intersectingPoints.concat(findIntersectingPoints(line1, line2))
        //console.log(intersectingPoints)
    })
})

console.log('Answer:',_.uniqWith(intersectingPoints, _.isEqual).length);

function buildLines(){
    const output = []
    lines.forEach((line, i) => {
        const points = line.split(' -> ')
        const start = {
            x: parseInt((points[0].split(','))[0]), 
            y: parseInt((points[0].split(','))[1])
        }
        const end = {
            x: parseInt((points[1].split(','))[0]), 
            y: parseInt((points[1].split(','))[1])
        }
        output.push(new Line(i, start, end))
    })
    // console.log(output)
    return output
}