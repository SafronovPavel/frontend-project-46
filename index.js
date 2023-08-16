#!/usr/bin/env node

import _ from "lodash";
import fs from 'fs';


let file1 = fs.readFileSync('file1.json', 'utf8');
let file2 = fs.readFileSync('file2.json', 'utf8');


const obj1 = JSON.parse(file1)
const obj2 = JSON.parse(file2)
// const getParsedDate = (file, ext) => {
//   switch(ext) {
//     case '.json': return JSON.parse(file)
//   }
// }

const genDiff = (obj1, obj2) => {
  const result = [];

  const keys = Object.keys({...obj1, ...obj2}).sort()


  for (const key of keys) {
    if (!Object.hasOwn(obj1, key)) {
      result.push({key: key, value: obj2[key], status:'added'})
    } else if (!Object.hasOwn(obj2, key)) {
      result.push({key: key, value: obj1[key], status:'deleted'})
    } else if (obj1[key] !== obj2[key]) {
      result.push({key: key, value: obj1[key], status:'was'});
      result.push({key: key, value: obj2[key], status:'be'});
    } else if (obj1[key] === obj2[key]) {
      result.push({key: key, value: obj1[key], status:'unchanged'});
    }
  }

    return result.map((pair) => {
      if (pair.status === 'added') return `+ ${pair.key}: ${pair.value}`
      if (pair.status === 'deleted') return `- ${pair.key}: ${pair.value}`
      if (pair.status === 'was') return `- ${pair.key}: ${pair.value}`
      if (pair.status === 'be') return `+ ${pair.key}: ${pair.value}`
      if (pair.status === 'unchanged') return `  ${pair.key}: ${pair.value}`}).join(' \n')
};

export default genDiff;
