import yaml from 'js-yaml';

const parse = (format, text) => {
  switch (format) {
    case '.json':
      return JSON.parse(text);
    case '.yml':
      return yaml.safeLoad(text);
    default:
      throw new Error('Not found format');
  }
};

export default parse;
