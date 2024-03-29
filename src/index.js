#!/usr/bin/env node
import fs from 'fs';
import parser from './parsers.js';
import getDiffTree from './getDiff.js';
import getFormat from '../formatters/index.js';


// import _ from "lodash";

const genDiff = (firstFile, secondFile, format = 'stylish') => {
  const readFirstFile = fs.readFileSync(`./__tests__/__fixtures__/${firstFile}`, 'utf8');
  const readSecondFile = fs.readFileSync(`./__tests__/__fixtures__/${secondFile}`, 'utf8');
  const obj1 = parser(firstFile, readFirstFile);
  const obj2 = parser(secondFile, readSecondFile);
  
  const statusTree = getDiffTree(obj1, obj2)
  return getFormat(statusTree, format);
};
export default genDiff;

