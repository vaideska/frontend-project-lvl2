const getStringResultStylish = (arr, space = '') => {
  const formatting = `${space}    `;
  const result = arr.reduce((acc, a) => {
    if (a.mod === 'node') {
      switch (a.change) {
        case 'added':
          return `${acc}${space}  + ${a.key}: ${getStringResultStylish(a.value, formatting)}\n`;
        case 'deleted':
          return `${acc}${space}  - ${a.key}: ${getStringResultStylish(a.value, formatting)}\n`;
        case 'changed': {
          let newValue;
          let oldValue;
          if (typeof a.newValue === 'object' && a.newValue !== null) newValue = getStringResultStylish(a.newValue, formatting);
          else newValue = a.newValue;
          if (typeof a.oldValue === 'object' && a.oldValue !== null) oldValue = getStringResultStylish(a.oldValue, formatting);
          else oldValue = a.oldValue;
          return `${acc}${space}  - ${a.key}: ${oldValue}\n${space}  + ${a.key}: ${newValue}\n`;
        }
        default:
          return `${acc}${space}    ${a.key}: ${getStringResultStylish(a.value, formatting)}\n`;
      }
    } else {
      switch (a.change) {
        case 'added':
          return `${acc}${space}  + ${a.key}: ${a.value}\n`;
        case 'deleted':
          return `${acc}${space}  - ${a.key}: ${a.value}\n`;
        case 'changed':
          return `${acc}${space}  - ${a.key}: ${a.oldValue}\n${space}  + ${a.key}: ${a.newValue}\n`;
        default:
          return `${acc}${space}    ${a.key}: ${a.value}\n`;
      }
    }
  }, '{\n');
  return `${result}${space}}`;
};

export default getStringResultStylish;
