const formatToStylish = (tree, space = '') => {
  const formatting = `${space}    `;
  const result = tree.reduce((acc, node) => {
    if (node.mod === 'node') {
      switch (node.change) {
        case 'added':
          return `${acc}${space}  + ${node.key}: ${formatToStylish(node.value, formatting)}\n`;
        case 'deleted':
          return `${acc}${space}  - ${node.key}: ${formatToStylish(node.value, formatting)}\n`;
        case 'changed': {
          let newValue;
          let oldValue;
          if (typeof node.newValue === 'object' && node.newValue !== null) newValue = formatToStylish(node.newValue, formatting);
          else newValue = node.newValue;
          if (typeof node.oldValue === 'object' && node.oldValue !== null) oldValue = formatToStylish(node.oldValue, formatting);
          else oldValue = node.oldValue;
          return `${acc}${space}  - ${node.key}: ${oldValue}\n${space}  + ${node.key}: ${newValue}\n`;
        }
        default:
          return `${acc}${space}    ${node.key}: ${formatToStylish(node.value, formatting)}\n`;
      }
    } else {
      switch (node.change) {
        case 'added':
          return `${acc}${space}  + ${node.key}: ${node.value}\n`;
        case 'deleted':
          return `${acc}${space}  - ${node.key}: ${node.value}\n`;
        case 'changed':
          return `${acc}${space}  - ${node.key}: ${node.oldValue}\n${space}  + ${node.key}: ${node.newValue}\n`;
        default:
          return `${acc}${space}    ${node.key}: ${node.value}\n`;
      }
    }
  }, '{\n');
  return `${result}${space}}`;
};

export default formatToStylish;
