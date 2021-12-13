const Cave = require('./Cave');
const input = require('./test2');
let tempCaves = {}
input.forEach(path => {
    const left = path.split('-')[0]
    const right = path.split('-')[1]
    if(tempCaves[left]){tempCaves[left].push(right)}
    else{tempCaves[left] = [right]}
    if(tempCaves[right]){tempCaves[right].push(left)}
    else if(right !== 'end' && left !== 'start'){tempCaves[right] = [left]}
})
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
console.log(start.paths.reduce((pathCnt, path) => pathCnt += pathsToEnd(path, '', [], path.id), 0))

function pathsToEnd(cave, pathString, pathsFound, rootId){
    pathString += cave.id === 'end' ? cave.id : cave.id + '-'
    if(!cave.isLarge && cave.id !== 'end'){cave.visited = true}
    if(cave.id === 'end'){pathsFound.push(pathString); return}    
    const validPaths = cave.paths.filter(c => !c.visited)
    if(validPaths.length === 0){return}
    validPaths.forEach(path => {
        if(cave.isLarge && cave.id===rootId){caves.filter(c => !c.isLarge).forEach(c => c.visited = false)}
        pathsToEnd(path, pathString, pathsFound)
    })
    return pathsFound.length
}