const targetArea = require('./input')
const _ = require('lodash')
const velXmin = minVelX(targetArea.xMin)
const yVels = []
for(let velY = targetArea.yMin; velY <= 20000; velY ++){
    let yList = []
    for(let step = 1; step <= 1000; step++){
        const lastY = yList.length === 0 ? 0 : yList[yList.length - 1]
        const yValue = lastY + (velY - (step - 1))
        yList.push(yValue)
        if(checkY(yValue)){yVels.push({yVel: velY, step: step});}
        if(yValue < targetArea.yMin){break}
    }
}

const validSteps = new Set(yVels.map(el => el.step))

const xVels = []
for(let xVel = velXmin; xVel <= 20000; xVel ++){
    validSteps.forEach(step => {
        const xValue = calcX(step, xVel)
        if(checkX(xValue)){xVels.push({xVel: xVel, step: step})}
    })
}

const answer = []
validSteps.forEach(step => combinePoints(step))
console.log(_.uniqWith(answer,_.isEqual).length)

function combinePoints(step){
    const yArr = yVels.filter(yv => yv.step === step).map(el => el.yVel)
    const xArr = xVels.filter(xv => xv.step === step).map(el => el.xVel)
    yArr.forEach(y => xArr.forEach(x => answer.push({y: y, x: x})))
}

function checkY(y){
    return y >= targetArea.yMin && y <= targetArea.yMax
}

function checkX(x){
    return x <= targetArea.xMax && x >= targetArea.xMin
}

function minVelX(){
    for(let i = 1; i < targetArea.xMin; i++){
        if(sumN(i) >= targetArea.xMin){return i}
    }
}

function sumN(n){
    return (n * (n + 1)) / 2
}

function calcX(step, xVel){
    let x = 0
    for(let s = 1; s <= step; s++){
        const newVel = xVel - (s - 1)
        if(newVel === 0){return x}
        x = x + newVel
    }
    return x
}