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
        // console.log(`Checking ${xVel} at step ${step} = ${xValue}, ${checkX(xValue)}`)
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


/*

const velXmin = minVelX(targetArea.xMin)
const velXmax = maxVelX(targetArea.xMax)
console.log(velXmin)
console.log(velXmax)
//given min X, what is min Y?
const velYmin = minVelY(velXmin, targetArea.yMin)
console.log(velYmin)


function checkY(y){
    return y >= targetArea.yMin && y <= targetArea.yMax
}

function minVelY(stepLimit, yLowerBound){
    let yVel = yLowerBound
    while(true){
        for(let step = 1; step <= stepLimit; step++){
            // console.log(`Checking vel: ${yVel}, step: ${step}`)
            const y = calcY(step, yVel)
            const x = calcX(step, stepLimit)
            if(checkX(x) && checkY(y)){return yVel}
            if(y < yLowerBound){break;}
        }
        yVel += 1
    }
}






// const velYmin = solve(targetArea.yMin, velXmin)

function solve(startYvel, startXvel){
    let velX = startXvel
    const answer = {}
    while(!point){
        let incX = false
        let velY = startYvel 
        while(!incX){
            let step = 1
            while(!incY){
                const velObjStr = JSON.toString({vy: velY, vx: velX})
                const cp = currPosition(velY, velX, step)
                if(checkY(cp.y) && checkX(cp.x)){
                    if(answer[velObjStr]){
                        answer[velObjStr].push(cp)
                    } else {
                        answer[velObjStr] = [cp]
                    }
                } else if (cp.y < targetArea.yMin || cp.x > targetArea.xMax) { // check next Y value
                    incY = true
                }
                step += 1
            }                
        }
    }
    return answer
}

function currPosition(velY, velX, step){
    console.log(`Calculating current position for velY: ${velY} and velX: ${velX} at step ${step}`)
    const y = calcY(step, velY)
    const x = calcX(step, velX)
    return {y: y, x: x}
}


function checkX(x){
    return x <= targetArea.xMax && x >= targetArea.xMin
}

// const velXmax = maxVelX(targetArea.xMax)
// console.log('minX:',velXmin, 'maxX:',velXmax)
// console.log(maxYvel())

// function solve1(minVelX, maxVelX){
//     const output = {}
//     for(let velY = targetArea.yMin; velY){
//         for(let velX = minVelX; velX <= maxVelX; vel++){
//             let step = 1
//             let x = 0
//             while(true){
//                 const offset = vel - (step-1)
//                 x = x + offset
//                 // console.log(`Calculating x for step=${step} and vel=${vel}: ${x}`)
//                 if(x <= targetArea.xMax && offset > 0){
//                     if(x >= targetArea.xMin){
//                         if(output[vel]){
//                             output[vel].push(x)
//                         } else {
//                             output[vel] = [x]
//                         }
//                     }
//                 } else {
//                     break;
//                 }
//                 step += 1
//             }        
//         }
//     }
//     return output
// }

function minVelX(lowerBound){
    for(let i = 1; i < lowerBound; i++){
        if(sumN(i) >= lowerBound){return i}
    }
}

function maxVelX(upperBound){
    return Math.round(upperBound / 2)
}

function sumN(n){
    return (n * (n + 1)) / 2
}

function calcY(step, yVel){
    let y = 0
    for(let s = 1; s <= step; s++){
        y = y + (yVel - (s - 1))
    }
    return y
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

function maxYvel(){
    let maxVel
    let vel = targetArea.yMin
    while(!maxVel){
        while(!maxVel){
            console.log(`Testing yVel: ${vel}`)
            let step = 1
            let testNextStep = true
            while(testNextStep){
                y = calcY(step, vel)
                if(y <= targetArea.yMax && y >= targetArea.yMin){testNextStep = false} // valid velocity
                if(y < targetArea.yMin){maxVel = vel - 1; testNextStep = false} // reached max yVel, return prev vel value
                step += 1               
            }
            vel += 1
        }
    }
    return maxVel
}
*/