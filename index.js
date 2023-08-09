import fs from 'fs';

let fileContent1 = fs.readFileSync('__fixtures__/file1.json', 'utf8');

const obj1 = JSON.parse(fileContent1)

// console.log(fileContent1, fileContent2);
console.log(obj1);
