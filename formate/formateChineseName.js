const { replaceSpace, replacePunctuation } = require('./libs/common')

const formateChineseName = (value) => {
  let cn = null
  cn = replaceSpace(value)
  cn = replacePunctuation(cn, '·')
  return cn
}

module.exports = { formateChineseName }
