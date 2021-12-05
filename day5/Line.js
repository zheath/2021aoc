const getPoints = require('./getPoints')

module.exports = class Line {
    constructor(id, startPoint, endPoint){
        this.id = id
        this.start = startPoint
        this.end = endPoint
        this.points = getPoints(startPoint, endPoint)
        this.compedIds = []
    }

    isVertical(){
        return this.start.x === this.end.x
    }

    isHorizontal(){
        return this.start.y === this.end.y
    }
    
    getXlist(){
        const o = []
        for(let s = Math.min(this.start.x, this.end.x); s<=Math.max(this.start.x, this.end.x); s++){
            o.push(s)
        }
        return o
    }
    
    getYlist(){
        const o = []
        for(let s = Math.min(this.start.y, this.end.y); s<=Math.max(this.start.y, this.end.y); s++){
            o.push(s)
        }
        return o
    }

    print(){
        return `(${this.start.x},${this.start.y}) => (${this.end.x},${this.end.y})`
    }

    // getPoints(start, end){
    //     const points = [this.start];        
    //     const xList = []
    //     const yList = []
    //     if(this.end.x > this.start.x){
    //         for(let x = this.start.x+1; x < this.end.x; x++){
    //             xList.push(x)
    //             if(this.isHorizontal()){yList.push(this.start.y)}
    //         }
    //     } else {
    //         for(let x = this.start.x-1; x > this.end.x; x--){
    //             xList.push(x)
    //             if(this.isHorizontal()){yList.push(this.start.y)}
    //         }
    //     }
    //     if(this.end.y > this.start.y){
    //         for(let y = this.start.y+1; y < this.end.y; y++){
    //             yList.push(y)
    //             if(this.isVertical()){xList.push(this.start.x)}
    //         }
    //     } else {
    //         for(let y = this.start.y-1; y > this.end.y; y--){
    //             yList.push(y)
    //             if(this.isVertical()){xList.push(this.start.x)}
    //         }
    //     }
    //     xList.forEach((x, i) => points.push({x: x, y: yList[i]}))
    //     points.push(this.end);
    //     return points
    // }
}