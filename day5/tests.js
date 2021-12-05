const countIntersects = require("./findIntersectingPoints");
const Line = require("./Line");
const l1 = new Line(1, {x: 1, y: 9}, {x: 5, y: 9})
const l2 = new Line(2, {x: 0, y: 9}, {x: 2, y: 9})
const l3 = new Line(3, {x: 0, y: 0}, {x: 5, y: 5})
const l4 = new Line(4, {x: 0, y: 9}, {x: 2, y: 9})
const l5 = new Line(5, {x: 0, y: 0}, {x: 0, y: 5})
const l6 = new Line(6, {x: 45, y: 45}, {x: 40, y: 40})
console.log(l1);
console.log(l2);
console.log(l3);
console.log(l4);
console.log(l5);
console.log(l6);
// console.log(countIntersects(l1, l2))
// console.log(Line3);
// console.log(Line4);
// console.log(countIntersects(Line3, Line4))