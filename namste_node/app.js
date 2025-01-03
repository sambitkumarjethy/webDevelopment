require("./xyz");
const { calculateSum } = require("./sum");
var namex = "sambit";
var a = 20;
var b = 30;

console.log({ namex, a, b }, a + b);
// console.log(global);
// console.log(this); // empty object
// console.log(globalThis);

console.log(globalThis === global);
calculateSum(1, 2);
