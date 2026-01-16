const fs = require("node:fs");
const https = require("node:https");
const crypto = require("node:crypto");
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

// Password Base Key Derivative Function
// Synchronous function will block the main thread - DONT USE IT
const syncCryptokey = crypto.pbkdf2Sync(
  "password", // password
  "salt", // salt
  5000000, // iterations
  50, // key length in bytes
  "sha512"
);
console.log({ syncCryptokey });

// ASYNC Function
crypto.pbkdf2(
  "password", // password
  "salt", // salt
  500000, // iterations
  50, // key length in bytes
  "sha512", // digest algorithm
  (err, derivedKey) => {
    if (err) throw err;

    console.log("Derived key:", derivedKey.toString("hex"));
  }
);

function multiply(x, y) {
  const result = a * b;
  return result;
}

var c = multiply(a, b);
console.log({ c });
