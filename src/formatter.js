const getStringResultStylish = (arr, space = '') => {
  const formatting = `${space}    `;
  const result = arr.reduce((acc, a) => {
    if (a.mod === 'node') {
      switch (a.change) {
        case 'added':
          return `${acc}${space}  + ${a.key}: ${getStringResultStylish(a.value, formatting)}\n`;
        case 'deleted':
          return `${acc}${space}  - ${a.key}: ${getStringResultStylish(a.value, formatting)}\n`;
        default:
          return `${acc}${space}    ${a.key}: ${getStringResultStylish(a.value, formatting)}\n`;
      }
    } else {
      switch (a.change) {
        case 'added':
          return `${acc}${space}  + ${a.key}: ${a.value}\n`;
        case 'deleted':
          return `${acc}${space}  - ${a.key}: ${a.value}\n`;
        default:
          return `${acc}${space}    ${a.key}: ${a.value}\n`;
      }
    }
  }, '{\n');
  return `${result}${space}}`;
};

const getStringResult = (arr, format) => {
  let result = '';
  if (format === 'stylish') {
    result = getStringResultStylish(arr);
  }
  return result;
};

export default getStringResult;
