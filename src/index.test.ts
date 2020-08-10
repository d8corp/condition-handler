import conditionHandler from '.'

describe('condition-handler', () => {
  test('default', () => {
    expect(conditionHandler([])).toBe(undefined)
    expect(conditionHandler([true])).toBe(true)
    expect(conditionHandler([1])).toBe(1)
    expect(conditionHandler([false])).toBe(false)
  })
  describe('not', () => {
    test('simple', () => {
      expect(conditionHandler(['!'])).toBe(undefined)
      expect(conditionHandler(['!', true])).toBe(false)
      expect(conditionHandler(['!', false])).toBe(true)
      expect(conditionHandler([true, '!'])).toBe(true)
      expect(conditionHandler([false, '!'])).toBe(false)
    })
    test('and', () => {
      expect(conditionHandler(['!', true, '&&', true])).toBe(false)
      expect(conditionHandler(['!', true, '&&', false])).toBe(false)
      expect(conditionHandler(['!', false, '&&', true])).toBe(true)
      expect(conditionHandler(['!', false, '&&', false])).toBe(false)

      expect(conditionHandler(['!', true, '&&', '!', true])).toBe(false)
      expect(conditionHandler(['!', true, '&&', '!', false])).toBe(false)
      expect(conditionHandler(['!', false, '&&', '!', true])).toBe(false)
      expect(conditionHandler(['!', false, '&&', '!', false])).toBe(true)
    })
    test('or', () => {
      expect(conditionHandler(['!', true, '||', true])).toBe(true)
      expect(conditionHandler(['!', true, '||', false])).toBe(false)
      expect(conditionHandler(['!', false, '||', true])).toBe(true)
      expect(conditionHandler(['!', false, '||', false])).toBe(true)

      expect(conditionHandler(['!', true, '||', '!', true])).toBe(false)
      expect(conditionHandler(['!', true, '||', '!', false])).toBe(true)
      expect(conditionHandler(['!', false, '||', '!', true])).toBe(true)
      expect(conditionHandler(['!', false, '||', '!', false])).toBe(true)
    })
  })
  test('and', () => {
    expect(conditionHandler([true, '&&', true])).toBe(true)
    expect(conditionHandler([true, '&&', false])).toBe(false)
    expect(conditionHandler([false, '&&', true])).toBe(false)
    expect(conditionHandler([false, '&&', false])).toBe(false)
  })
  test('or', () => {
    expect(conditionHandler([true, '||', true])).toBe(true)
    expect(conditionHandler([true, '||', false])).toBe(true)
    expect(conditionHandler([false, '||', true])).toBe(true)
    expect(conditionHandler([false, '||', false])).toBe(false)
  })
  test('equal', () => {
    expect(conditionHandler([true, '===', true])).toBe(true)
    expect(conditionHandler([true, '===', false])).toBe(false)
    expect(conditionHandler([false, '===', true])).toBe(false)
    expect(conditionHandler([false, '===', false])).toBe(true)
    expect(conditionHandler([1, '===', true])).toBe(false)
  })
  test('not equal', () => {
    expect(conditionHandler([true, '!==', true])).toBe(false)
    expect(conditionHandler([true, '!==', false])).toBe(true)
    expect(conditionHandler([false, '!==', true])).toBe(true)
    expect(conditionHandler([false, '!==', false])).toBe(false)
    expect(conditionHandler([1, '!==', '1'])).toBe(true)
  })
  test('equals', () => {
    expect(conditionHandler([true, '==', true])).toBe(true)
    expect(conditionHandler([true, '==', false])).toBe(false)
    expect(conditionHandler([false, '==', true])).toBe(false)
    expect(conditionHandler([false, '==', false])).toBe(true)
    expect(conditionHandler([1, '==', '1'])).toBe(true)
  })
  test('not equals', () => {
    expect(conditionHandler([true, '!=', true])).toBe(false)
    expect(conditionHandler([true, '!=', false])).toBe(true)
    expect(conditionHandler([false, '!=', true])).toBe(true)
    expect(conditionHandler([false, '!=', false])).toBe(false)
    expect(conditionHandler([1, '!=', '1'])).toBe(false)
  })
  test('more', () => {
    expect(conditionHandler([1, '>', 2])).toBe(false)
    expect(conditionHandler([1, '>', 1])).toBe(false)
    expect(conditionHandler([1, '>', 0])).toBe(true)
  })
  test('more equal', () => {
    expect(conditionHandler([1, '>=', 2])).toBe(false)
    expect(conditionHandler([1, '>=', 1])).toBe(true)
    expect(conditionHandler([1, '>=', 0])).toBe(true)
  })
  test('less', () => {
    expect(conditionHandler([1, '<', 2])).toBe(true)
    expect(conditionHandler([1, '<', 1])).toBe(false)
    expect(conditionHandler([1, '<', 0])).toBe(false)
  })
  test('less equal', () => {
    expect(conditionHandler([1, '<=', 2])).toBe(true)
    expect(conditionHandler([1, '<=', 1])).toBe(true)
    expect(conditionHandler([1, '<=', 0])).toBe(false)
  })
  describe('couple conditions', () => {
    test('and', () => {
      expect(conditionHandler([true, '&&', true, '&&', true ])).toBe(true)
      expect(conditionHandler([true, '&&', true, '&&', false ])).toBe(false)
      expect(conditionHandler([true, '&&', false, '&&', true ])).toBe(false)
      expect(conditionHandler([false, '&&', true, '&&', true ])).toBe(false)
      expect(conditionHandler([true, '&&', true, '&&', true, '&&', true ])).toBe(true)
      expect(conditionHandler([false, '&&', true, '&&', true, '&&', true ])).toBe(false)
    })
    test('or', () => {
      expect(conditionHandler([true, '||', false, '||', false ])).toBe(true)
      expect(conditionHandler([false, '||', true, '||', false ])).toBe(true)
      expect(conditionHandler([false, '||', false, '||', true ])).toBe(true)
      expect(conditionHandler([false, '||', false, '||', false ])).toBe(false)
    })
    test('equal', () => {
      expect(conditionHandler([1, '===', 1, '===', true ])).toBe(true)
      expect(conditionHandler([1, '===', 2, '===', false ])).toBe(true)
      expect(conditionHandler([1, '===', 1, '===', 1 ])).toBe(false)
    })
    test('different', () => {
      expect(conditionHandler([1, '>', 0, '&&', 2, '<', 3 ])).toBe(true)
      expect(conditionHandler([1, '>', 0, '||', 3, '<', 3 ])).toBe(true)
    })
  })
  describe('hooks', () => {
    test('simple', () => {
      expect(conditionHandler(['('])).toBe(undefined)
      expect(conditionHandler([')'])).toBe(undefined)
      expect(conditionHandler([')', true])).toBe(undefined)
      expect(conditionHandler(['(', true, ')' ])).toBe(true)
      expect(conditionHandler(['(', false, ')' ])).toBe(false)
    })
    test('deep', () => {
      expect(conditionHandler([false, '||', '(', '!', false, ')'])).toBe(true)
      expect(conditionHandler([false, '||', '!', '(', 1, '>', 2, ')'])).toBe(true)
    })
  })
  describe('plugin', () => {
    test('from object', () => {
      const obj = {
        test1: true,
        test2: false,
        test: {
          field1: 1,
          field2: 0
        }
      }
      function plugin (condition) {
        if (typeof condition === 'string') {
          const fields = condition.split('.')
          condition = obj
          for (let i = 0; i < fields.length; i++) {
            condition = condition[fields[i]]
          }
        }
        return condition
      }
      expect(conditionHandler(['test1', '&&', 'test.field2'], plugin)).toBe(0)
    })
  })
})
