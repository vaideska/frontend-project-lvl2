import _ from 'lodash';
import getObject from './parsers.js';

const getStringResult = (arr) => {
  const result = arr.reduce((acc, a) => {
    switch (a.mod) {
      case 'unchanged':
        return `${acc}    ${a.key}: ${a.value}\n`;
      case 'added':
        return `${acc}  + ${a.key}: ${a.value}\n`;
      case 'deleted':
        return `${acc}  - ${a.key}: ${a.value}\n`;
      default:
        return null;
    }
  }, '{\n');
  return `${result}}`;
};

const diffFlatObject = (obj1, obj2) => {
  const obj = { ...obj2 };
  _.merge(obj, obj1);
  console.log(obj);

  const getResultObj = (acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
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

  let result = [];
  let keysObj = Object.keys(obj);
  keysObj = keysObj.sort();
  result = keysObj.reduce(getResultObj, []);
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
