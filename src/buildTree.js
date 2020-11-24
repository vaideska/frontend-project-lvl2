import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const buildNode = (key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, children: buildTree(value1, value2), type: 'nested' };
    }
    if (_.has(obj1, key) && _.has(obj2, key) && !_.isEqual(value1, value2)) {
      return {
        key,
        oldValue: value1,
        newValue: value2,
        type: 'changed',
      };
    }
    if (!_.has(obj2, key)) {
      return { key, value: value1, type: 'deleted' };
    }
    if (!_.has(obj1, key)) {
      return { key, value: value2, type: 'added' };
    }
    return { key, value: value1, type: 'unchanged' };
  };

  const keysObj = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
  const result = keysObj.map(buildNode);
  return result;
};

export default buildTree;
