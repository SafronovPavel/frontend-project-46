#!/usr/bin/env node
import fs from 'fs';
import parse from './parsers.js';

// import _ from "lodash";

const genDiff = (firstFile, secondFile) => {
  const readFirstFile = fs.readFileSync(`./${firstFile}`, 'utf8');
  const readSecondFile = fs.readFileSync(`./${secondFile}`, 'utf8');
  const obj1 = parse(firstFile, readFirstFile);
  const obj2 = parse(secondFile, readSecondFile);
  const result = [];

  const keys = Object.keys({ ...obj1, ...obj2 }).sort();

  for (const key of keys) {
    if (!Object.hasOwn(obj1, key)) {
      result.push({ key: key, value: obj2[key], status: 'added' });
    } else if (!Object.hasOwn(obj2, key)) {
      result.push({ key: key, value: obj1[key], status: 'deleted' });
    } else if (obj1[key] !== obj2[key]) {
      result.push({ key: key, value: obj1[key], status: 'was' });
      result.push({ key: key, value: obj2[key], status: 'be' });
    } else if (obj1[key] === obj2[key]) {
      result.push({ key: key, value: obj1[key], status: 'unchanged' });
    }
  }

  return result.map((pair) => {
    if (pair.status === 'added') return `+ ${pair.key}: ${pair.value}`;
    if (pair.status === 'deleted') return `- ${pair.key}: ${pair.value}`;
    if (pair.status === 'was') return `- ${pair.key}: ${pair.value}`;
    if (pair.status === 'be') return `+ ${pair.key}: ${pair.value}`;
    if (pair.status === 'unchanged') return `  ${pair.key}: ${pair.value}`;
  }).join(' \n');
};
export default genDiff;
