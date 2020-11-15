const formattingValue = (value) => (typeof value === 'string' ? `'${value}'` : value);

const getStringResultPlain = (tree, path = '') => {
  const result = tree.reduce((acc, node) => {
    if (node.mod === 'node') {
      switch (node.change) {
        case 'added':
          return `${acc}Property '${node.key}' was added with value: [complex value]\n`;
        case 'deleted':
          return `${acc}Property '${node.key}' was removed\n`;
        case 'changed': {
          let newValue;
          let oldValue;
          if (typeof node.newValue === 'object' && node.newValue !== null) newValue = '[complex value]';
          else newValue = formattingValue(node.newValue);
          if (typeof node.oldValue === 'object' && node.oldValue !== null) oldValue = '[complex value]';
          else oldValue = formattingValue(node.oldValue);
          return `${acc}Property '${path}.${node.key}' was updated. From ${oldValue} to ${newValue}\n`;
        }
        default: {
          let newPath;
          if (path === '') newPath = node.key;
          else newPath = `${path}.${node.key}`;
          return `${acc}${getStringResultPlain(node.value, newPath)}`;
        }
      }
    } else {
      switch (node.change) {
        case 'added':
          return `${acc}Property '${path}.${node.key}' was added with value: ${formattingValue(node.value)}\n`;
        case 'deleted':
          return `${acc}Property '${path}.${node.key}' was removed\n`;
        case 'changed':
          return `${acc}Property '${path}.${node.key}' was updated. From ${formattingValue(node.oldValue)} to ${formattingValue(node.newValue)}\n`;
        default:
          return acc;
      }
    }
  }, '');
  return result;
};

export default getStringResultPlain;
