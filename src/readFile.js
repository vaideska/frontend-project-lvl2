import fs from 'fs';
import path from 'path';
import parse from './parsers.js';

const getNormalPath = (filepath) => path.resolve(process.cwd(), filepath);

const getObject = (filePath) => {
  const text = fs.readFileSync(getNormalPath(filePath), 'utf8');
  const format = path.extname(filePath);
  return parse(format, text);
};

export default getObject;
