const input = require('./input');
const scoreLookup = { ')': 1, ']': 2, '}': 3, '>': 4 }
const validCombo = { '(': ')', '[': ']', '{': '}', '<': '>' }
const completions = {}

input.filter(line => isValid(line)).map(line => parseLine(line)).forEach(line => completeLine(line))
const scores = Object.values(completions).sort((a, b) => a-b)
console.log(scores[Math.floor(scores.length/2)])

function parseLine(line){
    let out = line
    const regex = /\(\)|\[\]|\{\}|\<\>/g
    while(out.match(regex) && out.match(regex).length > 0){
        out = out.replace(regex,'')
    }
    return out
}

function isValid(line){
    const test = parseLine(line)
    for(let char of test){        
        if(['}',']',')','>'].includes(char) && last !== validCombo[char]){return false}
        last = char
    }
    return true
}

function completeLine(line){
    // console.log(line)
    const answer = line.split('').map(char => validCombo[char]).reverse().join('')
    completions[answer] = scoreLine(answer)
}

function scoreLine(answer){
    // console.log(answer)
    return answer.split('').reduce((score, char) => score * 5 + scoreLookup[char], 0)
}