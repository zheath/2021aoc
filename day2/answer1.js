const input = require('./input')
console.log(input.length)

const parsed = input.map(el => el.split(" "))
console.log(parsed);

const coord = {x: 0, y: 0}
parsed.forEach(inst => {    
    switch(inst[0]){
        case 'forward':
            coord.x += parseInt(inst[1])
            break
        case 'down':
            coord.y += parseInt(inst[1])
            break
        default:
            coord.y -= parseInt(inst[1])
    }
    console.log(inst[0], inst[1])
    console.log(coord)
})
console.log(coord)
console.log(coord.x * coord.y)