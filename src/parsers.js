import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const getNormalPath = (filepath) => path.resolve(process.cwd(), filepath);

const getJSONObject = (text) => JSON.parse(text);

const getYAMLObject = (text) => yaml.safeLoad(text);

const getObject = (filePath) => {
  const format = path.extname(filePath);
  const text = fs.readFileSync(getNormalPath(filePath), 'utf8');

  switch (format) {
    case '.json':
      return getJSONObject(text);
    case '.yml':
      return getYAMLObject(text);
    default:
      throw new Error('Not fount format');
  }
};

export default getObject;
