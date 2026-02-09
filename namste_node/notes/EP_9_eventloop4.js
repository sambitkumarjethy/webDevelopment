const fs = require("fs");
setImmediate(() => console.log("setImmediate"));
setTimeout(() => {
  console.log("Timmer expired");
}, 0);
Promise.resolve(() => {
  console.log("Promise");
});
fs.readFile("./notes.txt", "utf8", () => {
  console.log("File Reading CB.");
});

process.nextTick(() => {
  process.nextTick(() => {
    console.log("Inner nextTicker");
  });

  console.log("nextTick");
});
console.log("Last line of code");

// Output
// Last line of code
// nextTick
// Inner nextTicker
// Timmer expired
// setImmediate
// File Reading CB.
