import _ from 'lodash';

const formattingValue = (value, formatting) => {
  if (!_.isObjectLike(value)) return value;

  const keys = Object.keys(value);
  const result = keys.reduce((acc, key) => {
    if (!_.isObjectLike(value[key])) return `${acc}${formatting}    ${key}: ${value[key]}\n`;
    return `${acc}${formatting}    ${key}: ${formattingValue(value[key], `${formatting}    `)}\n`;
  }, '{\n');
  return `${result}${formatting}}`;
};

const formatToStylish = (tree, space = '') => {
  const formatting = `${space}    `;
  const result = tree.reduce((acc, node) => {
    switch (node.type) {
      case 'nested':
        return `${acc}${space}    ${node.key}: ${formatToStylish(node.children, formatting)}\n`;
      case 'changed':
        return `${acc}${space}  - ${node.key}: ${formattingValue(node.oldValue, formatting)}\n${space}  + ${node.key}: ${formattingValue(node.newValue, formatting)}\n`;
      case 'deleted':
        return `${acc}${space}  - ${node.key}: ${formattingValue(node.value, formatting)}\n`;
      case 'added':
        return `${acc}${space}  + ${node.key}: ${formattingValue(node.value, formatting)}\n`;
      default:
        return `${acc}${space}    ${node.key}: ${formattingValue(node.value, formatting)}\n`;
    }
  }, '{\n');
  return `${result}${space}}`;
};

export default formatToStylish;
