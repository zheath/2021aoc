const input = require('./input');
const scoreLookup = { ')': 3, ']': 57, '}': 1197, '>': 25137 }
const errors = { ')': 0, ']': 0, '}': 0, '>': 0 }
const validCombo = { '(': ')', '[': ']', '{': '}', '<': '>' }

input.forEach(line => checkLine(line))

function checkLine(line){
    console.log(line)
    let test = line
    let last = ''
    const regex = /\(\)|\[\]|\{\}|\<\>/g
    while(test.match(regex) && test.match(regex).length > 0){
        test = test.replace(regex,'')
    }
    
    for(let char of test){        
        if(['}',']',')','>'].includes(char) && last !== validCombo[char]){
            console.log('Expected',validCombo[last],', found',char)
            errors[char] += 1
            break;
        }
        last = char
    }
    console.log('')
}

console.log(errors)

console.log(Object.keys(errors).reduce((answer, key) => answer + errors[key] * scoreLookup[key], 0))