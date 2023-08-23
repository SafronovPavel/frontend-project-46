#!/usr/bin/env node
import fs from 'fs';
import parser from './parsers.js';
import getDiffTree from './getDiff.js';
import getStylishFormat from './stylish.js';


// import _ from "lodash";

const genDiff = (firstFile, secondFile) => {
  const readFirstFile = fs.readFileSync(`./__tests__/__fixtures__/${firstFile}`, 'utf8');
  const readSecondFile = fs.readFileSync(`./__tests__/__fixtures__/${secondFile}`, 'utf8');
  const obj1 = parser(firstFile, readFirstFile);
  const obj2 = parser(secondFile, readSecondFile);
  
  const statusTree = getDiffTree(obj1, obj2)
  return getStylishFormat(statusTree)
    
};
export default genDiff;
