import fs from 'fs';
import path from 'path';
import parse from './parsers.js';

const getNormalPath = (filepath) => path.resolve(process.cwd(), filepath);

const getObject = (filePath) => {
  const text = fs.readFileSync(getNormalPath(filePath), 'utf8');
  const format = path.extname(filePath);
  let result;
  try {
    result = parse(format, text);
  } catch (e) {
    throw new Error(`Not found format: ${format}`);
  }
  return result;
};

export default getObject;
