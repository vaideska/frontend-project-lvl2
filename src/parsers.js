import yaml from 'js-yaml';

const parse = (type, content) => {
  switch (type) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
      return yaml.safeLoad(content);
    default:
      throw new Error(`Not found format: ${type}`);
  }
};

export default parse;
