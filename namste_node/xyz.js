console.log("Console from xyz.js");
// All the code of module is wraped inside a function(IIFE)
//IIFE - Imediately invoked function Expression
(function (module, require) {
  // require(path);
  // All code of module runs here
})(); // Imedialty invoked function

// #IIFE
// -> Immediately invoke the code
// -> It keeps variable and function prrivate/safe

// Q - HOW ARE VARABLES AND FUNCTION PRIVATE IN DIFFERENT MODULE ?
// ANS = IIFE AND require statement
// Q - how do you get the access to module.export
// ANS - nodejs passes module as parameter to IIFE
