console.log("hello world");

var a = 1078696;
var b = 12546;

//The call back is called once the call stack is empty
setTimeout(() => {
  console.log("Call me ASAP");
}, 0); // Trust issue

setTimeout(() => {
  console.log("Call me after 3 sec");
}, 3000);

function multiply(x, y) {
  const result = a * b;
  return result;
}

var c = multiply(a, b);
console.log({ c });
