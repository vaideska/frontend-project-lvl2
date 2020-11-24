import _ from 'lodash';

const formattingValue = (value) => {
  if (_.isObjectLike(value)) return '[complex value]';
  return typeof value === 'string' ? `'${value}'` : value;
};

const formatToPlain = (tree, path = '') => {
  const result = tree.reduce((acc, node) => {
    let newPath;
    if (path === '') newPath = node.key;
    else newPath = `${path}.${node.key}`;

    switch (node.type) {
      case 'nested':
        return `${acc}${formatToPlain(node.children, newPath)}`;
      case 'added':
        return `${acc}Property '${newPath}' was added with value: ${formattingValue(node.value)}\n`;
      case 'deleted':
        return `${acc}Property '${newPath}' was removed\n`;
      case 'changed':
        return `${acc}Property '${newPath}' was updated. From ${formattingValue(node.oldValue)} to ${formattingValue(node.newValue)}\n`;
      default:
        return acc;
    }
  }, '');
  return result;
};

export default formatToPlain;
