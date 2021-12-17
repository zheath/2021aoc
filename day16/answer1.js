const input = require('./input')
const h2b = require('./hexToBinary')
const hex = input.input
const bin = hex.split('').map(h => h2b(h)).join('').split('')
const packetVersions = []

// while(bin.length > 0){
//     packets.push(parseBin(bin))
//     console.log(bin)
// }

console.log(parseBin(bin))
console.log(packetVersions.reduce((tot, v) => tot += v, 0))
function parseBin(binArr){
    const versionId = parseInt(binArr.splice(0,3).join(''), 2)
    packetVersions.push(versionId)
    const typeId = parseInt(binArr.splice(0,3).join(''), 2)
    const packet = {
        v: versionId,
        t: typeId
    }
    if(typeId === 4){
        //literal type packet
        const { literal, binRemaining } = parseLiteral(binArr)
        // console.log(binRemaining)
        packet.literal = literal
    } else {
        //operator packet
        packet.lengthType = parseInt(binArr.shift())
        
        if(packet.lengthType === 0){
            console.log(binArr.join(''))
            packet.subPacketLength = parseInt(binArr.splice(0, 15).join(''), 2)
            packet.subPackets = []
            const subPacketBin = binArr.splice(0, packet.subPacketLength)
            while(subPacketBin.length > 0){
                packet.subPackets.push(parseBin(subPacketBin))
            }
        } else {
            packet.subPacketCount = parseInt(binArr.splice(0, 11).join(''), 2)
            packet.subPackets = []
            for(let i = 1; i <= packet.subPacketCount; i++){
                packet.subPackets.push(parseBin(binArr))
            }
        }
    }
    return packet
}

function parseLiteral(binArray){
    let go = true
    let output = ''
    while(go){
        if(binArray[0] === '0'){ go = false }
        output += binArray.splice(0, 5).slice(1, 5).join('')        
    }
    return {literal: parseInt(output,2), binRemaining: binArray}
}