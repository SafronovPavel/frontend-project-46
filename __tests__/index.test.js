import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '.', '__fixtures__', filename);

const resultStylishFlatJSON = readFileSync(getFixturePath('stylishTestFlatJSON.txt'), 'utf-8');
const resultstylishFlatYML = readFileSync(getFixturePath('stylishTestFlatYML.txt'), 'utf-8');
const resultstylishNestedJSON = readFileSync(getFixturePath('stylishTestNestedJSON.txt'), 'utf-8');
const resultstylishNestedYML = readFileSync(getFixturePath('stylishTestNestedYML.txt'), 'utf-8');

const resultplainFlatJSON = readFileSync(getFixturePath('plainTestFlatJSON.txt'), 'utf-8');
const resultplainFlatYML = readFileSync(getFixturePath('plainTestFlatYML.txt'), 'utf-8');
const resultplainNestedJSON = readFileSync(getFixturePath('plainTestNestedJSON.txt'), 'utf-8');
const resultplainNestedYML = readFileSync(getFixturePath('plainTestNestedYML.txt'), 'utf-8');

const resultJsonFlatJSON = readFileSync(getFixturePath('jsonTestFlatJSON.txt'), 'utf-8');
const resultJsonFlatYML = readFileSync(getFixturePath('jsonTestFlatYML.txt'), 'utf-8');
const resultJsonNestedJSON = readFileSync(getFixturePath('jsonTestNestedJSON.txt'), 'utf-8');
const resultJsonNestedYML = readFileSync(getFixturePath('jsonTestNestedYML.txt'), 'utf-8');

  test('gendiff', () => {
    expect(genDiff('file1.json', 'file2.json')).toEqual(resultStylishFlatJSON);
    expect(genDiff('file1.yml', 'file2.yml')).toEqual(resultstylishFlatYML);
    expect(genDiff('nested1.json', 'nested2.json')).toEqual(resultstylishNestedJSON);
    expect(genDiff('nested1.yml', 'nested2.yml')).toEqual(resultstylishNestedYML);
    
    expect(genDiff('file1.json', 'file2.json', 'plain')).toEqual(resultplainFlatJSON);
    expect(genDiff('file1.yml', 'file2.yml', 'plain')).toEqual(resultplainFlatYML);
    expect(genDiff('nested1.json', 'nested2.json', 'plain')).toEqual(resultplainNestedJSON);
    expect(genDiff('nested1.yml', 'nested2.yml', 'plain')).toEqual(resultplainNestedYML);

    expect(genDiff('file1.json', 'file2.json', 'json')).toEqual(resultJsonFlatJSON);
    expect(genDiff('file1.yml', 'file2.yml', 'json')).toEqual(resultJsonFlatYML);
    expect(genDiff('nested1.json', 'nested2.json', 'json')).toEqual(resultJsonNestedJSON);
    expect(genDiff('nested1.yml', 'nested2.yml', 'json')).toEqual(resultJsonNestedYML);
  });
  
  