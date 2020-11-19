import _ from 'lodash';

const mergeObjects = (obj1, obj2) => {
  const obj = JSON.parse(JSON.stringify(obj2));
  _.merge(obj, obj1);
  return obj;
};

const buildTree = (obj1, obj2) => {
  const buildNode = (acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (value1 !== null && value2 !== null) {
      if (typeof value1 === 'object' && typeof value2 === 'object') {
        acc.push({
          key,
          value: buildTree(value1, value2),
          change: 'unchanged',
          mod: 'node',
        });
        return acc;
      }
      if (typeof value1 === 'object' && typeof value2 !== 'object') {
        const treeChild = buildTree(value1, value1);
        if (_.has(obj2, key)) {
          acc.push({
            key,
            newValue: value2,
            oldValue: treeChild,
            change: 'changed',
            mod: 'node',
          });
          return acc;
        }
        acc.push({
          key,
          value: treeChild,
          change: 'deleted',
          mod: 'node',
        });
        return acc;
      }
      if (typeof value1 !== 'object' && typeof value2 === 'object') {
        const treeChild = buildTree(value2, value2);
        if (_.has(obj1, key)) {
          acc.push({
            key,
            newValue: treeChild,
            oldValue: value1,
            change: 'changed',
            mod: 'node',
          });
          return acc;
        }
        acc.push({
          key,
          value: treeChild,
          change: 'added',
          mod: 'node',
        });
        return acc;
      }
    }
    if (_.has(obj1, key) && _.has(obj2, key) && value1 === value2) {
      acc.push({
        key,
        value: value1,
        change: 'unchanged',
        mod: 'leaf',
      });
      return acc;
    }
    if (_.has(obj1, key) && _.has(obj2, key) && value1 !== value2) {
      acc.push({
        key,
        oldValue: value1,
        newValue: value2,
        change: 'changed',
        mod: 'leaf',
      });
      return acc;
    }
    if (!_.has(obj1, key)) {
      acc.push({
        key,
        value: value2,
        change: 'added',
        mod: 'leaf',
      });
      return acc;
    }
    acc.push({
      key,
      value: value1,
      change: 'deleted',
      mod: 'leaf',
    });
    return acc;
  };

  let keysObj;
  if (obj1 === obj2) {
    keysObj = Object.keys(obj1);
  } else {
    const obj = mergeObjects(obj1, obj2);
    keysObj = Object.keys(obj).sort();
  }
  const result = keysObj.reduce(buildNode, []);
  return result;
};

export default buildTree;
