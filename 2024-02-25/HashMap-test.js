const HashMap = require("./HashMap.js");

console.log("Simple keys demo:");
const data = [
    ["keyA", "valueA"],
    ["keyB", "valueB"],
    ["keyC", "valueC"],
    ["keyD", "valueD"],
    ["keyE", "valueE"],
    ["keyF", "valueF"],
    ["keyG", "valueG"],
    ["keyH", "valueH"],
]
const map = new HashMap();
for (const [key, value] of data) {
  console.log(`Calling map.set(${key}, ${value})...`);
  map.set(key, value);
}
for (const [key, _] of data) {
  console.log(`map.get(${key}) = ${map.get(key)}`);
}
console.log("All keys in insertion order:");
console.log(Array.from(map.keys()));
console.log("All values in insertion order:");
console.log(Array.from(map.values()));
console.log("All key/value pairs in insertion order:");
console.log(Array.from(map));

for (const [i, [key, _]] of data.entries()) {
  if (i%2 === 1) {
    console.log(`Calling map.remove(${key})...`);
    map.remove(key);
  }
}
for (const [key, _] of data) {
  console.log(`map.get(${key}) = ${map.get(key)}`);
}
console.log("All remaining keys in insertion order:");
console.log(Array.from(map.keys()));

console.log("\nComplex keys demo:");
const data2 = [
    [{id: 0, name: "rileyann"}, "green"],
    [{id: 1, name: "sasha"}, "gray"],
    [{id: 2, name: "sasha"}, "red"], // evil twin
]
const map2 = new HashMap(obj => obj.id.toString());
for (const [key, value] of data2) {
  console.log(`Calling map2.set(${key}, ${value})...`);
  map2.set(key, value);
}
for (const [key, _] of data2) {
  console.log(`map2.get(${key}) = ${map2.get(key)}`);
}

console.log("\nHashMap vs Map comparison:");
let counter = 0;
const myMap = new HashMap();
const jsMap = new Map();
const keys = [];
for (let i = 1; i <= 10000; i++) {
  if (i % 1000 === 0) {
    console.log(` - iteration ${i}`)
  }

  if (i % 5 <= 2 && keys.length > 0) {
    var [key] = keys.splice(Math.floor(Math.random()*keys.length), 1);
    myMap.remove(key);
    jsMap.delete(key);
  } else {
    myMap.set(counter.toString(), "data");
    jsMap.set(counter.toString(), "data");
    keys.push(counter.toString());
    counter++;
  }
}
console.log("Verifying HashMap and Map equality...");
for (const key of keys) {
  if (myMap.get(key) !== jsMap.get(key)) {
    console.log(`Failure! ${myMap.get(key)} !== ${jsMap.get(key)}`);
  }
}
console.log("Done!");

