module.exports = class Octopus{
    constructor(power, y, x){
        this.y = y
        this.x = x
        this.power = parseInt(power)
        this.neighbs = []
        this.flashed = false
    }
    powerUp(){
        if(this.power === 9){ //flashes
            this.flashed=true
            this.power = 0
            this.neighbs.filter(o => !o.flashed).forEach(o => o.powerUp())
        } else if(!this.flashed) {
            this.power += 1
        }
    }

}    