module.exports = function getPoints(point1, point2){
    const output = []
    if(point1.x === point2.x){
        for(let i = Math.min(point1.y, point2.y); i <= Math.max(point1.y, point2.y); i++){
            output.push({x: point1.x, y: i})
        }
    } else if (point1.y === point2.y){
        for(let i = Math.min(point1.x, point2.x); i <= Math.max(point1.x, point2.x); i++){
            output.push({x: i, y: point1.y})
        }        
    } else {
        // const slope = (point1.y-point2.y) / (point1.x - point2.x)
        // console.log(slope);
        const yInc = point1.y < point2.y ? 1 : -1
        const xInc = point1.x < point2.x ? 1 : -1
        const dist = Math.abs(point1.x - point2.x);
        let step = 1
        output.push(point1)
        while(step < dist){
            let xVal = point1.x + (xInc * step)
            let yVal = point1.y + (yInc * step)
            output.push({
                x: xVal,
                y: yVal 
            })
            step += 1
        }
        output.push(point2)
    }
    // console.log(output);
    return output;
}