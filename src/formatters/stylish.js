import _ from 'lodash';

const formatToStylish = (tree, space = '') => {
  const formatting = `${space}    `;
  const result = tree.reduce((acc, element) => {
    if (element.node === 'changed') {
      let newValue;
      let oldValue;
      if (_.isObjectLike(element.newValue)) {
        newValue = formatToStylish(element.newValue, formatting);
      } else newValue = element.newValue;
      if (_.isObjectLike(element.oldValue)) {
        oldValue = formatToStylish(element.oldValue, formatting);
      } else oldValue = element.oldValue;
      return `${acc}${space}  - ${element.key}: ${oldValue}\n${space}  + ${element.key}: ${newValue}\n`;
    }
    let value;
    if (_.isObjectLike(element.value)) {
      value = formatToStylish(element.value, formatting);
    } else value = element.value;

    switch (element.node) {
      case 'added':
        return `${acc}${space}  + ${element.key}: ${value}\n`;
      case 'deleted':
        return `${acc}${space}  - ${element.key}: ${value}\n`;
      default:
        return `${acc}${space}    ${element.key}: ${value}\n`;
    }
  }, '{\n');
  return `${result}${space}}`;
};

export default formatToStylish;
