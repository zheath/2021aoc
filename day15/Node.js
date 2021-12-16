module.exports = class Node{
    constructor(y, x, risk){
        this.y = y
        this.x = x
        this.risk = parseInt(risk)
        this.distToNode = Infinity
    }
}