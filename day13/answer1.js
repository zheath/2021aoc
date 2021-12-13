const Dot = require('./Dot');
const Paper = require('./Paper');
const input = require('./input');
const paper = new Paper(input.dots.map(dot => new Dot(parseInt(dot.split(',')[1]), parseInt(dot.split(',')[0]))))
const folds = input.folds.map(fold => fold.substring(11).split('='))

// answer to part 1
// paper.fold(folds[0])
// console.log(paper.dots.length)

// answer to part 2
folds.forEach(fold => paper.fold(fold))
paper.print()
