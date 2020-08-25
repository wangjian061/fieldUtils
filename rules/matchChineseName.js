const isChineseName = (fieldValue) =>
  /^((?![\u3000-\u303F])[\u2E80-\uFE4F]|\·)*(?![\u3000-\u303F])[\u2E80-\uFE4F](\·)*$/.test(
    fieldValue
  )

module.exports = { isChineseName }
