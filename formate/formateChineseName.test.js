const { formateChineseName } = require('./formateChineseName')

test('测试一个正确的中文名字', () => {
  expect(formateChineseName('宋小宝')).toBe('宋小宝')
  expect(formateChineseName(' 宋小宝')).toBe('宋小宝')
  expect(formateChineseName('宋小宝 ')).toBe('宋小宝')
  expect(formateChineseName('宋小 宝 ')).toBe('宋小宝')
  expect(formateChineseName(' 宋 小宝 ')).toBe('宋小宝')
  expect(formateChineseName(' 宋小宝 ')).toBe('宋小宝')
  expect(formateChineseName('宋小宝*')).toBe('宋小宝·')
  expect(formateChineseName('宋小宝，')).toBe('宋小宝·')
  expect(formateChineseName('宋小宝,')).toBe('宋小宝·')
  expect(formateChineseName('宋小宝。')).toBe('宋小宝·')
  expect(formateChineseName('宋小宝.')).toBe('宋小宝·')
})
