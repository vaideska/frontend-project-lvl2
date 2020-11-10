import _ from 'lodash';
import getObject from './parsers.js';

const getStringResult = (arr, space = '') => {
  const formatting = `${space}    `;
  const result = arr.reduce((acc, a) => {
    switch (a.mod) {
      case 'unchanged':
        return `${acc}${space}    ${a.key}: ${a.value}\n`;
      case 'added':
        return `${acc}${space}  + ${a.key}: ${a.value}\n`;
      case 'deleted':
        return `${acc}${space}  - ${a.key}: ${a.value}\n`;
      default:
        return `${acc}${space}    ${a.key}: ${getStringResult(a.value, formatting)}\n`;
    }
  }, '{\n');
  return `${result}${space}}`;
};

const mergeObjects = (obj1, obj2) => {
  const obj = JSON.parse(JSON.stringify(obj2));
  _.merge(obj, obj1);
  return obj;
};

const diffFlatObject = (obj1, obj2) => {
  const reduceFunc = (acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (value1 !== null && value2 !== null) {
      if (typeof value1 === 'object' && typeof value2 === 'object') {
        acc.push({ key, value: diffFlatObject(value1, value2), mod: 'node' });
        return acc;
      }
      if (typeof value1 === 'object' && typeof value2 !== 'object') {
        acc.push({ key, value: diffFlatObject(value1, value1), mod: 'node' });
        return acc;
      }
      if (typeof value1 !== 'object' && typeof value2 === 'object') {
        acc.push({ key, value: diffFlatObject(value2, value2), mod: 'node' });
        return acc;
      }
    }
    if (_.has(obj1, key) && _.has(obj2, key) && value1 === value2) {
      acc.push({ key, value: value1, mod: 'unchanged' });
      return acc;
    }
    if (_.has(obj1, key) && _.has(obj2, key) && value1 !== value2) {
      acc.push({ key, value: value1, mod: 'deleted' });
      acc.push({ key, value: value2, mod: 'added' });
      return acc;
    }
    if (value1 === undefined) {
      acc.push({ key, value: value2, mod: 'added' });
      return acc;
    }
    acc.push({ key, value: value1, mod: 'deleted' });
    return acc;
  };

  const obj = mergeObjects(obj1, obj2);

  const keysObj = Object.keys(obj).sort();
  const result = keysObj.reduce(reduceFunc, []);
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
  const result = diffFlatObject(obj1, obj2);

  return getStringResult(result);
};

export default diffFiles;
