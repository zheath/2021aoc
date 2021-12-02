const input = require('./input')
const coord = {x: 0, y: 0, a: 0}
input.map(el => el.split(" ")).forEach(inst => {
    const val = parseInt(inst[1]) 
    switch(inst[0]){
        case 'forward':
            coord.x += val
            coord.y += coord.a * val
            break
        case 'down':
            coord.a += val
            break
        default:
            coord.a -= val
    }
})
console.log(coord.x * coord.y)