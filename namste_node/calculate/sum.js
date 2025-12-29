// Modules protect theier variables and function from leaking
console.log("Console from sum");
z = "hello world";

let x = 50;
function calculateSum(a, b) {
  const sum = a + b + x;
  console.log(sum);
}

module.exports = { calculateSum, x };
