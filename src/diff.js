import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getNormalPath = (filepath) => path.resolve(process.cwd(), filepath);

const diffFiles = (filepath1, filepath2) => {
  const jsonText1 = fs.readFileSync(getNormalPath(filepath1), 'utf8');
  const jsonText2 = fs.readFileSync(getNormalPath(filepath2), 'utf8');

  const jsonObj1 = JSON.parse(jsonText1);
  const jsonObj2 = JSON.parse(jsonText2);

  const getResultObj1 = (acc, key) => {
    const value = jsonObj1[key];
    let res = acc;
    if (_.has(jsonObj2, key)) {
      if (value === jsonObj2[key]) res += `    ${key}: ${value}\n`;
      else res += `  - ${key}: ${value}\n  + ${key}: ${jsonObj2[key]}\n`;
    } else res += `  - ${key}: ${value}\n`;
    return res;
  };

  const getResultObj2 = (acc, key) => {
    const value = jsonObj2[key];
    let res = acc;
    if (!(_.has(jsonObj1, key))) res += `  + ${key}: ${value}\n`;
    return res;
  };

  let result = '{\n';
  let keysObj1 = Object.keys(jsonObj1);
  let keysObj2 = Object.keys(jsonObj2);
  keysObj1 = keysObj1.sort();
  keysObj2 = keysObj2.sort();
  result = keysObj1.reduce(getResultObj1, result);
  result = keysObj2.reduce(getResultObj2, result);

  result += '}';

  return result;
};

export default diffFiles;
