import _ from 'lodash';

const formattingValue = (value) => (typeof value === 'string' ? `'${value}'` : value);

const formatToPlain = (tree, path = '') => {
  const result = tree.reduce((acc, element) => {
    let newPath;
    if (path === '') newPath = element.key;
    else newPath = `${path}.${element.key}`;

    if (element.node === 'changed') {
      let newValue;
      let oldValue;
      if (_.isObjectLike(element.newValue)) newValue = '[complex value]';
      else newValue = formattingValue(element.newValue);
      if (_.isObjectLike(element.oldValue)) oldValue = '[complex value]';
      else oldValue = formattingValue(element.oldValue);
      return `${acc}Property '${newPath}' was updated. From ${oldValue} to ${newValue}\n`;
    }
    let value;
    if (_.isObjectLike(element.value)) value = '[complex value]';
    else value = formattingValue(element.value);

    switch (element.node) {
      case 'added':
        return `${acc}Property '${newPath}' was added with value: ${value}\n`;
      case 'deleted':
        return `${acc}Property '${newPath}' was removed\n`;
      default: {
        if (_.isObjectLike(element.value)) {
          return `${acc}${formatToPlain(element.value, newPath)}`;
        }
        return acc;
      }
    }
  }, '');
  return result;
};

export default formatToPlain;
