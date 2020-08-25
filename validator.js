/**
 * 校验器
 *
 * @param {any => boolean | any => Promise<boolean>} rule 规则，是一个函数，接收数据，返回数据是否合法
 * @param {string | () => string} msg 错误消息，可以是字符串或者待求值字符串
 * @return {function}
 */
const validator = (rule, msg) => {
  assert(isFunction(rule), 'validator rule must be function')
  assert(
    isString(msg) || isFunction(msg),
    'validator msg must be string or function'
  )

  /**
   * @param {any} value 接收的数据
   * @return {null | string | Promise<string | null>}
   */
  return (value) => {
    const result = rule(value)
    if (isPromise(result)) {
      return result.then((isValid) => (isValid ? null : getMsg(msg, value)))
    } else {
      return result ? null : getMsg(msg, value)
    }
  }
}

/**
 * 组合校验器
 *
 * @param {array<validator>} instances 多个校验器
 * @return {function}
 */
const validators = (...instances) => {
  /**
   * @param {any} value 接收的数据
   * @return {null | string}
   */

  console.log('instances: ', instances)
  return (value) => {
    for (let instance of instances) {
      assert(isFunction(instance), 'each params must be validator')

      const result = instance(value)
      if (result != null) return result
    }

    return null
  }
}

/**
 * 异步组合验证器
 *
 * @param {Array<validator>} instances 一些验证器
 * @return {function}
 */
const asyncValidators = (...instances) => {
  /**
   * @param {any} value 接收的数据
   * @return {Promise<string | null>}
   */
  return (value) => go(instances, value)

  function go(rest, value) {
    if (!rest.length) return Promise.resolve(null)

    const instance = rest.shift()
    assert(isFunction(instance), 'each params must be validator')

    const result = instance(value)
    if (isPromise(result)) {
      return result.then((msg) => (!msg ? go(rest, value) : msg))
    } else {
      return !result ? go(rest, value) : Promise.resolve(result)
    }
  }
}

/**
 * 并行验证器
 *
 * @param {array<validator>} instances 一些验证器
 * @return {function}
 */
const coValidators = (...instances) => {
  /**
   * @param {any} value 接收的数据
   * @return {null | Array<string> | Promise<Array<string> | null>}
   */
  return (value) => go(instances, value, [])

  function go(rest, value, msgs) {
    if (!rest.length) return !msgs.length ? null : msgs

    const instance = rest.shift()
    assert(isFunction(instance), 'each params must be validator')

    const result = instance(value)
    if (isPromise(result)) {
      return result.then((msg) => {
        if (msg != null) msgs.push(msg)
        return go(rest, value, msgs)
      })
    } else {
      if (result != null) msgs.push(result)
      return go(rest, value, msgs)
    }
  }
}

/**
 * 验证对象
 *
 * @param {object} validatorMap 一些验证器
 * @return {function}
 */
const validate = (validatorMap) => {
  assert(isPlainObject(validatorMap), 'validatorMap must be plain object')

  /**
   * @param {object} data 数据对象
   * @return {object}
   */
  return (data) => {
    const resultMap = {}

    for (let key in data) {
      if (!data.hasOwnProperty(key)) continue

      const keyValidator = validatorMap[key]
      assert(
        isFunction(keyValidator),
        `validate validatorMap ${key} isn't validator`
      )

      resultMap[key] = keyValidator(data[key])
    }

    return resultMap
  }
}

/**
 * 异步验证对象
 *
 * @param {object} validatorMap 一些验证器
 * @return {function}
 */
const asyncValidate = (validatorMap) => {
  assert(isPlainObject(validatorMap), 'validatorMap must be plain object')

  /**
   * @param {object} data 数据对象
   * @return {Promise<object>}
   */
  return (data) => go(Object.keys(data), data, {})

  function go(keys, data, resultMap) {
    if (!keys.length) return resultMap

    const key = keys.pop()
    const keyValidator = validatorMap[key]
    assert(
      isFunction(keyValidator),
      `validate validatorMap ${key} isn't validator`
    )

    const result = keyValidator(data[key])
    if (isPromise(result)) {
      return result.then((msg) => {
        resultMap[key] = msg
        return go(keys, data, resultMap)
      })
    } else {
      resultMap[key] = result
      return go(keys, data, resultMap)
    }
  }
}

// utils
const getMsg = (msg, value) => {
  return isFunction(msg) ? msg(value) : msg
}

const isPlainObject = (value) => {
  return Object.prototype.toString.call(value) == '[object Object]'
}

const isPromise = (value) => {
  return value === null || value === undefined ? false : isFunction(value.then)
}

const isString = (value) => {
  return typeof value == 'string'
}

const isFunction = (value) => {
  return typeof value == 'function'
}

const assert = (value, msg) => {
  if (!value) throw new Error(msg)
}

module.exports = {
  validator,
  validators,
  asyncValidators,
  coValidators,
  validate,
  asyncValidate,
}
