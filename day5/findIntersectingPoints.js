module.exports = function findIntersectingPoints(l1, l2){
    l1.compedIds.push(l2.id)
    l2.compedIds.push(l1.id)
    const answer = l1.points.filter(p1 => l2.points.some(p2 => p1.x === p2.x && p1.y === p2.y))
    // console.log('****')
    // console.log(l1)
    // console.log('')
    // console.log('and')
    // console.log('')
    // console.log(l2)
    // console.log('****')
    // l1.compedIds.push(l2.id)
    // l2.compedIds.push(l1.id)
    // let answer = 0
    // if(l1.isHorizontal() && l2.isHorizontal()){
    //     // console.log(l1.print(), 'and', l2.print())
    //     // console.log(l1.getXlist());
    //     // console.log(l2.getXlist());
    //     answer = l1.start.y === l2.start.y ? l1.getXlist().filter(item1 => l2.getXlist().some(item2 => item1 === item2)).length : 0
    // } else if(l1.isVertical() && l2.isVertical()){
    //     // console.log(l1.print(), 'and', l2.print())
    //     // console.log(l1.getYlist());
    //     // console.log(l2.getYlist());
    //     answer = l1.start.x === l2.start.x ? l1.getYlist().filter(item1 => l2.getYlist().some(item2 => item1 === item2)).length : 0
    // } else {
    //     // console.log(l1.print(), 'and', l2.print())
    //     var a_dx = l1.end.x - l1.start.x;
    //     var a_dy = l1.end.y - l1.start.y;
    //     var b_dx = l2.end.x - l2.start.x;
    //     var b_dy = l2.end.y - l2.start.y;
    //     var s = (-a_dy * (l1.start.x - l2.start.x) + a_dx * (l1.start.y - l2.start.y)) / (-b_dx * a_dy + a_dx * b_dy);
    //     var t = (+b_dx * (l1.start.y - l2.start.y) - b_dy * (l1.start.x - l2.start.x)) / (-b_dx * a_dy + a_dx * b_dy);
    //     answer = (s >= 0 && s <= 1 && t >= 0 && t <= 1) ? 1 : 0;
    // }
    // // console.log('Answer:',parseInt(answer))
    // // console.log('')
    // // console.log('')
    return answer
}