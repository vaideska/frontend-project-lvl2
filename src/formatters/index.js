import getStringResultStylish from './stylish.js';
import getStringResultPlain from './plain.js';
import getStringResultJSON from './JSON.js';

const getStringResult = (arr, format) => {
  if (format === 'plain') {
    const result = getStringResultPlain(arr);
    return result.substring(0, result.length - 1);
  }
  if (format === 'json') {
    return getStringResultJSON(arr);
  }
  return getStringResultStylish(arr);
};

export default getStringResult;
