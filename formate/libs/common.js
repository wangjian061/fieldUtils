/**
 * 替换空格
 * @param {String,Number} value
 * @param {String,Number} newValue 替换成的值,默认空
 */
const replaceSpace = (value, newValue = '') => value.replace(/\s+/g, newValue)

/**
 * 替换标点符号
 * @param {String,Number} value
 * @param {String,Number} newValue 替换成的值,默认空
 */
const replacePunctuation = (value, newValue = '') => {
  return value
    .replace(',', newValue)
    .replace(';', newValue)
    .replace('，', newValue)
    .replace('；', newValue)
    .replace('。', newValue)
    .replace('`', newValue)
    .replace('.', newValue)
    .replace('#', newValue)
    .replace('@', newValue)
    .replace('&', newValue)
    .replace('*', newValue)
}

module.exports = {
  replaceSpace,
  replacePunctuation,
}
