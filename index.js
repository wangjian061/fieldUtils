const {
  validator,
  validators,
  asyncValidators,
  coValidators,
  validate,
  asyncValidate,
} = require('./validator.js')

const { isChineseName } = require('./rules/matchChineseName')

module.exports = {
  fieldValidator: {
    ...require('./validator.js'),
  },
  rules: {
    ...require('./rules/matchChineseName'),
  },
  formate: {
    ...require('./formate/formateChineseName'),
  },
}
