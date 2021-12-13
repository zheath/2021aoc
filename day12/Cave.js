module.exports = class Cave{
    constructor(id, paths){
        this.id = id
        this.paths = paths || []
        this.isLarge = /[A-Z]+/.test(id)
        this.visited = false
    }
}    