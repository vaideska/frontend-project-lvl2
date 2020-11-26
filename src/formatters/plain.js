import _ from 'lodash';

const formattingValue = (value) => {
  if (_.isObjectLike(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const formatToPlain = (tree, path = []) => {
  const result = tree.map((node) => {
    const newPath = [...path, node.key];

    switch (node.type) {
      case 'nested':
        return formatToPlain(node.children, newPath);
      case 'added':
        return `Property '${newPath.join('.')}' was added with value: ${formattingValue(node.value)}`;
      case 'deleted':
        return `Property '${newPath.join('.')}' was removed`;
      case 'changed':
        return `Property '${newPath.join('.')}' was updated. From ${formattingValue(node.oldValue)} to ${formattingValue(node.newValue)}`;
      default:
        return '';
    }
  });
  return result.filter((elem) => elem !== '').join('\n');
};

export default formatToPlain;
