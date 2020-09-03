const omitDeep = require('omit-deep');

export const cleanApiInput = (input) => {
  console.log('OMIT', input, omitDeep(input, ['__typename']));
  return omitDeep(input, ['__typename'])
}
