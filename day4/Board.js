module.exports = class Board {
    constructor(id, nums){
        this.id = id
        this.nums = nums
        this.markedPositions = []
    }

    markNumber(number){
        const index = this.nums.indexOf(number)
        if(index >= 0){this.markedPositions.push(index)}
        return index
    }

    boardWins(){
        //winning index combos
        //rows
        if(this.markedPositions.filter(val => [0,1,2,3,4].includes(val)).length===5){return true}
        if(this.markedPositions.filter(val => [5,6,7,8,9].includes(val)).length===5){return true}
        if(this.markedPositions.filter(val => [10,11,12,13,14].includes(val)).length===5){return true}
        if(this.markedPositions.filter(val => [15,16,17,18,19].includes(val)).length===5){return true}
        if(this.markedPositions.filter(val => [20,21,22,23,24].includes(val)).length===5){return true}
        //cols
        if(this.markedPositions.filter(val => [0,5,10,15,20].includes(val)).length===5){return true}
        if(this.markedPositions.filter(val => [1,6,11,16,21].includes(val)).length===5){return true}
        if(this.markedPositions.filter(val => [2,7,12,17,22].includes(val)).length===5){return true}
        if(this.markedPositions.filter(val => [3,8,13,18,23].includes(val)).length===5){return true}
        if(this.markedPositions.filter(val => [4,9,14,19,24].includes(val)).length===5){return true}
        return false
    }

    calcScore(){
        return this.nums.filter((n, i) => !this.markedPositions.includes(i)).reduce((acc, curr) => acc + curr)
    }
}