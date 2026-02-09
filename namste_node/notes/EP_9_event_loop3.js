const fs = require("fs");
const a = 100;
setImmediate(() => console.log("setImmediate"));
fs.readFile("./notes.txt", "utf8", () => {
  setTimeout(() => {
    console.log("2nd timmer");
  }, 0);

  process.nextTick(() => {
    console.log("2nd next tick");
  });

  setImmediate(() => console.log("2nd Immediate"));
  console.log("File Reading CB");
});

process.nextTick(() => console.log("next Tick"));
console.log("Last line of code");

// outPut
// Last line of code
// next Tick
// setImmediate
// File Reading CB
// 2nd next tick
// 2nd Immediate
// 2nd timmer
