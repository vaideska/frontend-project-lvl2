import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;

const formattingValue = (value, depth) => {
  if (!_.isObjectLike(value)) {
    return value;
  }
  const indentSize = depth * spacesCount;
  const currentIndent = replacer.repeat(indentSize);
  const keys = Object.keys(value);

  const result = keys.map((key) => {
    if (!_.isObjectLike(value[key])) {
      return `${currentIndent}    ${key}: ${value[key]}`;
    }
    return `${currentIndent}    ${key}: ${formattingValue(value[key], depth + 1)}`;
  });
  return ['{', ...result, `${currentIndent}}`].join('\n');
};

const formatToStylish = (data) => {
  const getResult = (tree, depth) => tree.flatMap((node) => {
    const newDepth = depth + 1;
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize + spacesCount);
    switch (node.type) {
      case 'nested':
        return `${currentIndent}    ${node.key}: ${['{', ...getResult(node.children, newDepth), `${bracketIndent}}`].join('\n')}`;
      case 'changed':
        return [`${currentIndent}  - ${node.key}: ${formattingValue(node.oldValue, newDepth)}`,
          `${currentIndent}  + ${node.key}: ${formattingValue(node.newValue, newDepth)}`];
      case 'deleted':
        return `${currentIndent}  - ${node.key}: ${formattingValue(node.value, newDepth)}`;
      case 'added':
        return `${currentIndent}  + ${node.key}: ${formattingValue(node.value, newDepth)}`;
      case 'unchanged':
        return `${currentIndent}    ${node.key}: ${formattingValue(node.value, newDepth)}`;
      default:
        throw new Error(`Wrong node type: ${node.type}!`);
    }
  });
  const result = getResult(data, 0);
  return ['{', ...result, '}'].join('\n');
};

export default formatToStylish;
