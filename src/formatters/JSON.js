const formattingValue = (value) => (typeof value === 'string' ? `"${value}"` : value);

const getStringResultJSON = (arr, space = '') => {
  const formatting = `${space}    `;
  const result = arr.reduce((acc, a) => {
    if (a.mod === 'node') {
      if (a.change === 'changed') {
        let newValue;
        let oldValue;
        if (typeof a.newValue === 'object' && a.newValue !== null) newValue = ` ${getStringResultJSON(a.newValue, formatting)}`;
        else newValue = formattingValue(a.newValue);
        if (typeof a.oldValue === 'object' && a.oldValue !== null) oldValue = ` ${getStringResultJSON(a.oldValue, formatting)}`;
        else oldValue = formattingValue(a.oldValue);
        return `${acc}${space}{\n${space}"change": "changed",\n${space}"key": "${a.key}",\n${space}"oldValue": ${oldValue},\n${space}"newValue": ${newValue}\n${space}},\n`;
      }
      const value = ` ${getStringResultJSON(a.value, formatting)}`;
      return `${acc}${space}{\n${space}"change": "${a.change}",\n${space}"key": "${a.key}",\n${space}"value": ${value}\n${space}},\n`;
    }
    if (a.change === 'changed') {
      return `${acc}${space}{\n${space}"change": "changed",\n${space}"key": "${a.key}",\n${space}"oldValue": ${formattingValue(a.oldValue)},\n${space}"newValue": ${formattingValue(a.newValue)}},\n`;
    }
    return `${acc}${space}{\n${space}"change": "${a.change}",\n${space}"key": "${a.key}",\n${space}"value": ${formattingValue(a.value)}\n${space}},\n`;
  }, '[\n');
  return `${result.substr(0, result.length - 2)}]`;
};

export default getStringResultJSON;
