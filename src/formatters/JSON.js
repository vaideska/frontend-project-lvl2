const formattingValue = (value) => (typeof value === 'string' ? `"${value}"` : value);

const formatToJSON = (tree) => {
  const result = tree.reduce((acc, node) => {
    if (node.mod === 'node') {
      if (node.change === 'changed') {
        let newValue;
        let oldValue;
        if (typeof node.newValue === 'object' && node.newValue !== null) newValue = formatToJSON(node.newValue);
        else newValue = formattingValue(node.newValue);
        if (typeof node.oldValue === 'object' && node.oldValue !== null) oldValue = formatToJSON(node.oldValue);
        else oldValue = formattingValue(node.oldValue);
        return `${acc}{"change":"changed","key":"${node.key}","oldValue":${oldValue},"newValue":${newValue}},`;
      }
      const value = formatToJSON(node.value);
      return `${acc}{"change":"${node.change}","key":"${node.key}","value":${value}},`;
    }
    if (node.change === 'changed') {
      return `${acc}{"change":"changed","key":"${node.key}","oldValue":${formattingValue(node.oldValue)},"newValue":${formattingValue(node.newValue)}},`;
    }
    return `${acc}{"change":"${node.change}","key":"${node.key}","value":${formattingValue(node.value)}},`;
  }, '[');
  return `${result.substr(0, result.length - 1)}]`;
};

export default formatToJSON;
