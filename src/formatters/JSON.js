const formattingValue = (value) => (typeof value === 'string' ? `"${value}"` : value);

const getStringResultJSON = (tree, space = '') => {
  const formatting = `${space}    `;
  const result = tree.reduce((acc, node) => {
    if (node.mod === 'node') {
      if (node.change === 'changed') {
        let newValue;
        let oldValue;
        if (typeof node.newValue === 'object' && node.newValue !== null) newValue = ` ${getStringResultJSON(node.newValue, formatting)}`;
        else newValue = formattingValue(node.newValue);
        if (typeof node.oldValue === 'object' && node.oldValue !== null) oldValue = ` ${getStringResultJSON(node.oldValue, formatting)}`;
        else oldValue = formattingValue(node.oldValue);
        return `${acc}${space}{\n${space}"change": "changed",\n${space}"key": "${node.key}",\n${space}"oldValue": ${oldValue},\n${space}"newValue": ${newValue}\n${space}},\n`;
      }
      const value = ` ${getStringResultJSON(node.value, formatting)}`;
      return `${acc}${space}{\n${space}"change": "${node.change}",\n${space}"key": "${node.key}",\n${space}"value": ${value}\n${space}},\n`;
    }
    if (node.change === 'changed') {
      return `${acc}${space}{\n${space}"change": "changed",\n${space}"key": "${node.key}",\n${space}"oldValue": ${formattingValue(node.oldValue)},\n${space}"newValue": ${formattingValue(node.newValue)}},\n`;
    }
    return `${acc}${space}{\n${space}"change": "${node.change}",\n${space}"key": "${node.key}",\n${space}"value": ${formattingValue(node.value)}\n${space}},\n`;
  }, '[\n');
  return `${result.substr(0, result.length - 2)}]`;
};

export default getStringResultJSON;
