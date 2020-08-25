const { isChineseName } = require('./matchChineseName')

test('isChineseName', () => {
  expect(isChineseName('宋小宝')).toBe(true)
  expect(isChineseName('宋小宝&')).toBe(false)
  expect(isChineseName('合')).toBe(true)
  expect(isChineseName('宋小宝 ')).toBe(false)
  expect(isChineseName('宋小宝·')).toBe(true)
})
