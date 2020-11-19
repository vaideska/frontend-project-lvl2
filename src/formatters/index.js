import formatToStylish from './stylish.js';
import formatToPlain from './plain.js';
import formatToJSON from './JSON.js';

const formatResult = (arr, format = 'stylish') => {
  if (format.toLowerCase() === 'plain') {
    const result = formatToPlain(arr);
    return result.substring(0, result.length - 1);
  }
  if (format.toLowerCase() === 'json') {
    return formatToJSON(arr);
  }
  return formatToStylish(arr);
};

export default formatResult;
