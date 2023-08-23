import _ from "lodash";


const getDiffTree = (obj1, obj2) => {
  const keys = Object.keys({ ...obj1, ...obj2 });
  const sortedKeys = _.sortBy(keys);

const getTree = sortedKeys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { status: 'nested', key, children: getDiffTree(obj1[key], obj2[key]) };
    }
    if (!(Object.hasOwn(obj1, key)) && Object.hasOwn(obj2, key)) {
      return { status: 'added', key, value: obj2[key] };
    }
    if (Object.hasOwn(obj1, key) && !(Object.hasOwn(obj2, key))) {
      return { status: 'deleted', key, value: obj1[key] };
    }
    if (obj1[key] === obj2[key]) {
      return { status: 'unchanged', key, value: obj1[key] };
    }
    return {
      status: 'changed', key, value1: obj1[key], value2: obj2[key],
    };
  });
  return getTree;
};
export default getDiffTree;
