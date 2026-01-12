const fs = require("fs");
const https = require("https");
console.log("Hello Sambit");

var a = 123456;
var b = 9876543;

fs.readFileSync("./file.txt", "utf-8", (err, data) => {
  // blocks the main thread
  console.log(`File data : ${data}`);
});

https.get("https://dummyjson.com/products/1", (res) => {
  console.log("Fetched products in sync");
});

// https
//   .get("https://dummyjson.com/products/1", (res) => {
//     let data = "";

//     // collect chunks
//     res.on("data", (chunk) => {
//       data += chunk;
//     });

//     // when response ends
//     res.on("end", () => {
//       const jsonData = JSON.parse(data);
//       console.log("Fetched product:", jsonData);
//     });
//   })
//   .on("error", (err) => {
//     console.error("Error:", err.message);
//   });

// .then((res) => res.json())
// .then(console.log);

setTimeout(() => {
  console.log("Settimeout 5 seconds.");
}, 5000);

fs.readFile("./file.txt", "utf-8", (err, data) => {
  console.log(`File data : ${data}`);
});

function multiply(x, y) {
  const result = a * b;
  return result;
}

var c = multiply(a, b);
console.log({ c });
