import formatToStylish from './stylish.js';
import formatToPlain from './plain.js';
import formatToJSON from './JSON.js';

const formatResult = (data, format) => {
  switch (format.toLowerCase()) {
    case 'plain':
      return formatToPlain(data);
    case 'json':
      return formatToJSON(data);
    default:
      return formatToStylish(data);
  }
};

export default formatResult;
