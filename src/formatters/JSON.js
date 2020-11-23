import _ from 'lodash';

const formattingValue = (value) => (typeof value === 'string' ? `"${value}"` : value);

const formatToJSON = (tree) => {
  const result = tree.reduce((acc, element) => {
    if (element.node === 'changed') {
      let newValue;
      let oldValue;
      if (_.isObjectLike(element.newValue)) newValue = formatToJSON(element.newValue);
      else newValue = formattingValue(element.newValue);
      if (_.isObjectLike(element.oldValue)) oldValue = formatToJSON(element.oldValue);
      else oldValue = formattingValue(element.oldValue);
      return `${acc}{"change":"changed","key":"${element.key}","oldValue":${oldValue},"newValue":${newValue}},`;
    }
    let value;
    if (_.isObjectLike(element.value)) value = formatToJSON(element.value);
    else value = formattingValue(element.value);
    return `${acc}{"change":"${element.node}","key":"${element.key}","value":${value}},`;
  }, '[');
  return `${result.substr(0, result.length - 1)}]`;
};

export default formatToJSON;
