import fs from 'fs';
import path from 'path';
import parse from './src/parsers.js';
import formatResult from './src/formatters/index.js';
import buildTree from './src/buildTree.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const genDiff = (filepath1, filepath2, format) => {
  const textFile1 = fs.readFileSync(getFullPath(filepath1), 'utf8');
  const textFile2 = fs.readFileSync(getFullPath(filepath2), 'utf8');
  const obj1 = parse(path.extname(filepath1).slice(1), textFile1);
  const obj2 = parse(path.extname(filepath2).slice(1), textFile2);
  const result = buildTree(obj1, obj2);
  return formatResult(result, format);
};

export default genDiff;
