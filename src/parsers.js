#!/usr/bin/env node
import path from 'path';
import yaml from 'js-yaml';

const parser = (fileName, fileRead) => {
  const ext = path.extname(fileName);

  switch (ext) {
    case '.json':
      return JSON.parse(fileRead);
    case '.yaml':
      return yaml.load(fileRead);
    case '.yml':
      return yaml.load(fileRead);
    default:
      throw new Error(`Unknown file type - ${fileName}!`);
  }
};
export default parser;
