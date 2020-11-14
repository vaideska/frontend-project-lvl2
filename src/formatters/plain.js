const formattingValue = (value) => (typeof value === 'string' ? `'${value}'` : value);

const getStringResultPlain = (arr, path = '') => {
  const result = arr.reduce((acc, a) => {
    if (a.mod === 'node') {
      switch (a.change) {
        case 'added':
          return `${acc}Property '${a.key}' was added with value: [complex value]\n`;
        case 'deleted':
          return `${acc}Property '${a.key}' was removed\n`;
        case 'changed': {
          let newValue;
          let oldValue;
          if (typeof a.newValue === 'object' && a.newValue !== null) newValue = '[complex value]';
          else newValue = formattingValue(a.newValue);
          if (typeof a.oldValue === 'object' && a.oldValue !== null) oldValue = '[complex value]';
          else oldValue = formattingValue(a.oldValue);
          return `${acc}Property '${path}.${a.key}' was updated. From ${oldValue} to ${newValue}\n`;
        }
        default: {
          let newPath;
          if (path === '') newPath = a.key;
          else newPath = `${path}.${a.key}`;
          return `${acc}${getStringResultPlain(a.value, newPath)}`;
        }
      }
    } else {
      switch (a.change) {
        case 'added':
          return `${acc}Property '${path}.${a.key}' was added with value: ${formattingValue(a.value)}\n`;
        case 'deleted':
          return `${acc}Property '${path}.${a.key}' was removed\n`;
        case 'changed':
          return `${acc}Property '${path}.${a.key}' was updated. From ${formattingValue(a.oldValue)} to ${formattingValue(a.newValue)}\n`;
        default:
          return acc;
      }
    }
  }, '');
  return result;
};

export default getStringResultPlain;
