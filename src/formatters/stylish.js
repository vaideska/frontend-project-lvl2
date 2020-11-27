import _ from 'lodash';

const symbolSpace = ' ';
const spaceCount = 4;
const space = symbolSpace.repeat(spaceCount);

const formattingValue = (value, depth) => {
  if (!_.isObjectLike(value)) {
    return value;
  }
  const keys = Object.keys(value);

  const result = keys.map((key) => {
    if (!_.isObjectLike(value[key])) {
      return `${space.repeat(depth)}    ${key}: ${value[key]}`;
    }
    return `${space.repeat(depth)}    ${key}: ${formattingValue(value[key], depth + 1)}`;
  });
  return `{\n${result.join('\n')}\n${space.repeat(depth)}}`;
};

const formatToStylish = (data) => {
  const getResult = (tree, depth) => tree.flatMap((node) => {
    const newDepth = depth + 1;
    switch (node.type) {
      case 'nested':
        return `${space.repeat(depth)}    ${node.key}: {\n${getResult(node.children, newDepth).join('\n')}\n${space.repeat(newDepth)}}`;
      case 'changed':
        return [`${space.repeat(depth)}  - ${node.key}: ${formattingValue(node.oldValue, newDepth)}`,
          `${space.repeat(depth)}  + ${node.key}: ${formattingValue(node.newValue, newDepth)}`];
      case 'deleted':
        return `${space.repeat(depth)}  - ${node.key}: ${formattingValue(node.value, newDepth)}`;
      case 'added':
        return `${space.repeat(depth)}  + ${node.key}: ${formattingValue(node.value, newDepth)}`;
      case 'unchanged':
        return `${space.repeat(depth)}    ${node.key}: ${formattingValue(node.value, newDepth)}`;
      default:
        throw new Error(`Wrong node type: ${node.type}!`);
    }
  });
  const result = getResult(data, 0);
  return `{\n${result.join('\n')}\n}`;
};

export default formatToStylish;
