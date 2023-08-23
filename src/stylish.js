import _ from "lodash";

const stringfy = (value, depth = 1) => {
  const iter = (data, depthIter) => {
    const beforeSpace = '.'.repeat(4 * depthIter - 2)
    const afterSpace = ' '.repeat(4 * depthIter - 4)

    if (!_.isObject(data)) return `${data}`;

    const lines = Object.entries(data).map(([key, val]) => `${beforeSpace}  ${key}: ${iter(val, depthIter + 1)}`);
    const result = ['{', ...lines, `${afterSpace}}`].join('\n');
    return result;
  };
  return iter(value, depth);
};

const getStylishFormat = (diffTree) => {
  const iter = (diffObj, depth = 1) => {
    const beforeSpace = '.'.repeat(4 * depth - 2)
    const afterSpace = ' '.repeat(4 * depth - 4)

    const result = diffObj.flatMap((user) => {
      switch (user.status) {
        case 'nested':
          return `${beforeSpace}  ${user.key}: ${iter(user.children, depth + 1)}`;
        case 'deleted':
          return `${beforeSpace}- ${user.key}: ${stringfy(user.value, depth + 1)}`;
        case 'added':
          return `${beforeSpace}+ ${user.key}: ${stringfy(user.value, depth + 1)}`;
        case 'changed':
          return [`${beforeSpace}- ${user.key}: ${stringfy(user.value1, depth + 1)}`,
            `${beforeSpace}+ ${user.key}: ${stringfy(user.value2, depth + 1)}`];
        default:
          return `${beforeSpace}  ${user.key}: ${stringfy(user.value, depth + 1)}`;
      }
    });
    return ['{', ...result, `${afterSpace}}`].join('\n');
  };

  return iter(diffTree);
};

export default getStylishFormat;