// Modules protect theier variables and function from leaking
console.log("Console from multiply");

function calculateMultiply(a, b) {
  const multiply = a * b;
  console.log(multiply);
}

module.exports = { calculateMultiply };
