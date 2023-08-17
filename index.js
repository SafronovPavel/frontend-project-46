#!/usr/bin/env node

import _ from "lodash";
import fs from 'fs';





// const getParsedDate = (file, ext) => {
//   switch(ext) {
//     case '.json': return JSON.parse(file)
//   }
// }

const genDiff = (obj1, obj2) => {
  obj1 = fs.readFileSync(obj1, 'utf8');
  obj2 = fs.readFileSync(obj2, 'utf8');
  
  obj1 = JSON.parse(obj1)
  obj2 = JSON.parse(obj2)
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
