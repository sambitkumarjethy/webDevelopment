// Modules protect theier variables and function from leaking
console.log("Console from sum");

export let x = 50;
export function calculateSum(a, b) {
  const sum = a + b + x;
  console.log(sum);
}

// module.exports = { calculateSum, x };
