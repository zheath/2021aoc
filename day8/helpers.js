module.exports = {
    lookupNum: lookupNum,
    decode: decode
}

function lookupNum(numString){
    const options = {
        'abcefg': 0,
        'cf': 1,
        'acdeg': 2,
        'acdfg': 3,
        'bcdf': 4,
        'abdfg': 5,
        'abdefg': 6,
        'acf': 7,
        'abcdefg': 8,
        'abcdfg': 9
    }
    return options[numString]
}

function decode(line){
    const { cypher, answers } = line
    const decoder = getDecoder(cypher)
    const out = answers.map(answer => lookupNum([answer.split('').map(l => decoder[l]).sort().join('')]))
    return out.join('')
}

function getDecoder(cypher){
    const codeHash = {a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0}
    const bcf = []
    cypher.forEach(code => code.split('').forEach(letter => codeHash[letter] += 1))
    for(const key in codeHash){
        const count = codeHash[key]
        if(count === 4){codeHash[key] = 'e'}
        if(count === 6){
            codeHash[key] = 'b'
            bcf.push(key)
        }
        if(count === 9){
            codeHash[key] = 'f'
            bcf.push(key)
            const cKey = cypher.filter(x => x.length === 2)[0].split('').filter(l => l !== key)[0]
            bcf.push(cKey)
            codeHash[cKey] = 'c'
        }   
    }
    const dKey = cypher.filter(x => x.length === 4)[0].split('').filter(l =>  !bcf.includes(l))[0]
    codeHash[dKey] = 'd'
    Object.keys(codeHash).forEach(l => codeHash[l] = codeHash[l] === 8 ? 'a' : codeHash[l] === 7 ? 'g' : codeHash[l])
    return codeHash
}