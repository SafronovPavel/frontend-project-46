#!/usr/bin/env node
import { program } from 'commander';

import genDiff from '../src/index.js';


program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<firstFile> <secondFile>')
  .action((firstFile, secondFile) => {
  console.log(genDiff(firstFile, secondFile, program.opts().format));
  });

program.parse();
