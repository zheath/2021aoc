const input = require('./input1')

let count = 0

for (i = 0; i < input.length - 3; i++){
    if(input.slice(i, i + 3).reduce((p,c) => p+c) < input.slice(i + 1, i + 4).reduce((p,c) => p+c)){
        count += 1
    }
}

console.log(count)