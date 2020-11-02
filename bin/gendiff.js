#!/usr/bin/env node
import program from 'commander';
import diffFiles from '../src/diff.js';

program.description('Compares two configuration files and shows a difference.');
program.helpOption('-h, --help', 'read more information');
program.version('0.0.1', '-v, --version', 'output the version number');
program.arguments('<filepath1> <filepath2>');
program.option('-f, --format [type]', 'output format');
program.action((filepath1, filepath2) => console.log(diffFiles(filepath1, filepath2)));

program.parse(process.argv);
