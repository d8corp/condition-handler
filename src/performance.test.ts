import conditionHandler from '.'

function perf (callback: () => void, ms = 1000) {
  let count = 0
  const endTime = performance.now() + ms
  do {
    callback()
    count++
  } while (performance.now() < endTime)
  return count / ms
}

describe('condition-handler performance', () => {
  test('empty function', () => {
    expect(perf(() => {})).toBeLessThan(3286)
    expect(perf(() => {})).toBeGreaterThan(2425)
  })
  test('empty', () => {
    const condition = []
    expect(perf(() => conditionHandler(condition))).toBeLessThan(3194)
    expect(perf(() => conditionHandler(condition))).toBeGreaterThan(2984)
  })
  test('true', () => {
    const condition = [true]
    expect(perf(() => conditionHandler(condition))).toBeLessThan(3045)
    expect(perf(() => conditionHandler(condition))).toBeGreaterThan(2768)
  })
  test('false', () => {
    const condition = [false]
    expect(perf(() => conditionHandler(condition))).toBeLessThan(3084)
    expect(perf(() => conditionHandler(condition))).toBeGreaterThan(2630)
  })
  test('not', () => {
    const condition = ['!', true]
    expect(perf(() => conditionHandler(condition))).toBeLessThan(2864)
    expect(perf(() => conditionHandler(condition))).toBeGreaterThan(2657)
  })
  test('deep', () => {
    const condition = ['(', '!', true, ')', '||', '(', true, '&&', true, ')']
    expect(perf(() => conditionHandler(condition))).toBeLessThan(2681)
    expect(perf(() => conditionHandler(condition))).toBeGreaterThan(2430)
  })
  test('plugin', () => {
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
    const conditions = ['test1', '&&', 'test.field2']
    expect(perf(() => conditionHandler(conditions, plugin))).toBeLessThan(1783)
    expect(perf(() => conditionHandler(conditions, plugin))).toBeGreaterThan(1611)
  })
})
