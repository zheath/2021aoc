const Board = require('./Board')
// const { nums, boards } = require('./sample')
const { nums, boards } = require('./input')
const parsedBoards = parseBoards();
/* part 2 */
let winners = [];
for(i = 0; i < nums.length; i++){
    const num = nums[i] 
    parsedBoards.forEach(b => {
        const hasWon = winners.filter(w => w.board.id === b.id).length > 0
        if(!hasWon){
            const found = b.markNumber(num)
            console.log(`Index on board ${b.id} for ${num} is ${found}.`)
            if(b.boardWins()){
                winners.push({
                    board: b,
                    number: num
                })
            }
        }
    })
    if(parsedBoards.length === winners.length){
        break;
    }
}

/* part 1 winner
let winner = null
for(i = 0; i < nums.length; i++){
    const num = nums[i] 
    for(bInd = 0; bInd < parsedBoards.length; bInd++){
        const b = parsedBoards[bInd]
        b.markNumber(num);
        if(b.boardWins()){
            winner = {
                board: b,
                number: num
            }
            break;
        }
    }
    if(winner){
        break;
    }
}
*/
winners.forEach(w => console.log(w));
const winner = winners.pop();
console.log(winner)
console.log(winner.board.calcScore())
console.log(winner.board.calcScore() * winner.number)

function parseBoards(){
    const parsedBoards = [];
    let boardNum = 1;
    while((boardNum * 25) <= boards.length){
        parsedBoards.push(new Board(boardNum, boards.slice((boardNum-1) * 25, boardNum * 25)))
        boardNum += 1
    }   
    return parsedBoards 
}