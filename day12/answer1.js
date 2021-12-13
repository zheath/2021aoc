const Cave = require('./Cave');
const input = require('./input');
let tempCaves = {}
input.forEach(path => {
    const left = path.split('-')[0]
    const right = path.split('-')[1]
    if(tempCaves[left] && right !== 'start'){tempCaves[left].push(right)}
    else if (right !== 'start'){tempCaves[left] = [right]}
    if(tempCaves[right] && left !== 'start'){tempCaves[right].push(left)}
    else if(right !== 'end' && left !== 'start'){tempCaves[right] = [left]}
})
// console.log(tempCaves)
const caves = Object
                .keys(tempCaves)
                .map(caveKey => new Cave(caveKey, tempCaves[caveKey]))
caves.push(new Cave('end'))
// console.log(caves)       
caves.forEach(cave => cave.paths.forEach((p,i) => cave.paths[i] = caves.filter(c => c.id === p)[0]))
// console.log(caves)

//unit test validPath
// console.log(validPath(['b','d'],caves.filter(c => c.id === 'b')[0])) //false

const start = caves.filter(c => c.id === 'start')[0]
console.log(pathsToEnd(start, '', []))

function pathsToEnd(cave, pathString, pathsFound){
    pathString += cave.id === 'end' ? cave.id : cave.id + '-'     

    if(cave.id === 'end'){pathsFound.push(pathString); return}

    const validPaths = cave.paths.filter(c => validPath(pathString, c))
    if(validPaths.length === 0){return}
    validPaths.forEach(path => pathsToEnd(path, pathString, pathsFound))

    // console.log(pathsFound)
    return pathsFound.length
}

function validPath(pathString, next){
    const caveCount = {}
    pathString.split('-').filter(l => /[a-z]+/.test(l) && !['start','end'].includes(l)).forEach(c => caveCount[c] ? caveCount[c] += 1 : caveCount[c] = 1)
    const ignoreSmallDups = Object.values(caveCount).sort((a, b) => b-a)[0] >= 2
    
    if(next.id === 'start'){ return false }
    
    if(next.isLarge){ return true }
    
    if(ignoreSmallDups &&  pathString.split('-').indexOf(next.id) >= 0){ return false }
    
    if(pathString.split('-').filter(l => l === next.id).length < ignoreSmallDups ? 1 : 2){ return true }
    
    return false
}

// 'b-A-c-A-c-A-b-A-end', 
// 'b-A-c-A-c-A-b-end',
// //'b-A-c-A-c-A-end',     
// 'b-A-c-A-b-A-c-A-end',
// //'b-A-c-A-b-A-end',     
// //'b-A-c-A-b-end',
// //'b-A-c-A-end',         
// 'b-A-b-A-c-A-c-A-end',
// //'b-A-b-A-c-A-end',     
// //'b-A-b-A-end',
// //'b-A-b-end',           
// //'b-A-end',
// 'b-d-b-A-c-A-c-A-end', 
// //'b-d-b-A-c-A-end',
// //'b-d-b-A-end',         
// //'b-d-b-end',
// //'b-end'