import _ from 'lodash';

const space = '    ';

const dataCollection = (indent, key, value, type) => {
  switch (type) {
    case 'deleted':
      return `${indent}  - ${key}: ${value}`;
    case 'added':
      return `${indent}  + ${key}: ${value}`;
    default:
      return `${indent}    ${key}: ${value}`;
  }
};

const formattingValue = (value, depth) => {
  if (!_.isObjectLike(value)) return value;

  const keys = Object.keys(value);
  const result = keys.map((key) => {
    if (!_.isObjectLike(value[key])) return dataCollection(space.repeat(depth), key, value[key]);
    return dataCollection(space.repeat(depth), key, formattingValue(value[key], depth + 1));
  });
  return `{\n${result.join('\n')}\n${space.repeat(depth)}}`;
};

const formatToStylish = (tree, depth = 0) => {
  const result = tree.map((node) => {
    switch (node.type) {
      case 'nested':
        return dataCollection(space.repeat(depth), node.key,
          formatToStylish(node.children, depth + 1));
      case 'changed':
        return [dataCollection(space.repeat(depth), node.key, formattingValue(node.oldValue, depth + 1), 'deleted'),
          dataCollection(space.repeat(depth), node.key, formattingValue(node.newValue, depth + 1), 'added')];
      default:
        return dataCollection(space.repeat(depth), node.key,
          formattingValue(node.value, depth + 1), node.type);
    }
  });
  return `{\n${result.flat().join('\n')}\n${space.repeat(depth)}}`;
};

export default formatToStylish;
