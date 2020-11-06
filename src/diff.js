import _ from 'lodash';
import getObject from './parsers.js';

const diffFlatObject = (obj1, obj2) => {
  const getResultObj1 = (acc, key) => {
    const value = obj1[key];
    let res = acc;
    if (_.has(obj2, key)) {
      if (value === obj2[key]) res += `    ${key}: ${value}\n`;
      else res += `  - ${key}: ${value}\n  + ${key}: ${obj2[key]}\n`;
    } else res += `  - ${key}: ${value}\n`;
    return res;
  };

  const getResultObj2 = (acc, key) => {
    const value = obj2[key];
    let res = acc;
    if (!(_.has(obj1, key))) res += `  + ${key}: ${value}\n`;
    return res;
  };

  let result = '';
  let keysObj1 = Object.keys(obj1);
  let keysObj2 = Object.keys(obj2);
  keysObj1 = keysObj1.sort();
  keysObj2 = keysObj2.sort();
  result = keysObj1.reduce(getResultObj1, result);
  result = keysObj2.reduce(getResultObj2, result);
  return result;
};

const diffFiles = (filepath1, filepath2) => {
  let obj1;
  let obj2;
  try {
    obj1 = getObject(filepath1);
    obj2 = getObject(filepath2);
  } catch (e) {
    return e;
  }
  const result = `{\n${diffFlatObject(obj1, obj2)}}`;

  return result;
};

export default diffFiles;
