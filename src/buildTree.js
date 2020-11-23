import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const buildNode = (key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        value: buildTree(value1, value2),
        node: 'unchanged',
      };
    }
    if (_.isPlainObject(value1) && !_.isPlainObject(value2)) {
      const treeChild = buildTree(value1, value1);
      if (_.has(obj2, key)) {
        return {
          key,
          newValue: value2,
          oldValue: treeChild,
          node: 'changed',
        };
      }
      return {
        key,
        value: treeChild,
        node: 'deleted',
      };
    }
    if (!_.isPlainObject(value1) && _.isPlainObject(value2)) {
      const treeChild = buildTree(value2, value2);
      if (_.has(obj1, key)) {
        return {
          key,
          newValue: treeChild,
          oldValue: value1,
          node: 'changed',
        };
      }
      return {
        key,
        value: treeChild,
        node: 'added',
      };
    }
    if (_.has(obj1, key) && _.has(obj2, key) && value1 === value2) {
      return {
        key,
        value: value1,
        node: 'unchanged',
      };
    }
    if (_.has(obj1, key) && _.has(obj2, key) && value1 !== value2) {
      return {
        key,
        oldValue: value1,
        newValue: value2,
        node: 'changed',
      };
    }
    if (!_.has(obj1, key)) {
      return {
        key,
        value: value2,
        node: 'added',
      };
    }
    return {
      key,
      value: value1,
      node: 'deleted',
    };
  };

  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);
  let keysObj = _.union(keysObj1, keysObj2);
  if (obj1 !== obj2) keysObj = keysObj.sort();
  const result = keysObj.map(buildNode);
  return result;
};

export default buildTree;
