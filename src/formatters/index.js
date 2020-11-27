import formatToStylish from './stylish.js';
import formatToPlain from './plain.js';
import formatToJSON from './JSON.js';

const formatResult = (data, format) => {
  switch (format.toLowerCase()) {
    case 'plain':
      return formatToPlain(data);
    case 'json':
      return formatToJSON(data);
    case 'stylish':
      return formatToStylish(data);
    default:
      throw new Error(`Not found format: ${format}`);
  }
};

export default formatResult;
