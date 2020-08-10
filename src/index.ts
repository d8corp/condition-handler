/**
 * ### This is the best conditions handler.
 * Provide any conditions as arguments to handle them.
 * ```typescript
 * conditionHandler(['!', '(', 13, '<', 420, ')', '&&', '!', true]) // false
 * ```
 * If you provide bed conditions you get `undefined`
 * ```typescript
 * conditionHandler([')', true]) // undefined
 * ```
 * @packageDocumentation
 * */

/**
 * You can use any of the operators inside [conditionHandler](#conditionhandler)
 * */
export type IFOperators = '!' | '&&' | '||' | '===' | '==' | '!==' |  '!=' | '>' |  '>=' |  '<' |  '<=' |  '(' |  ')'
export type IFArgument = any | IFOperators
export interface IFPlugin {
  (condition): any
}

/**
 * Get result of any conditions like `if` operator from JavaScript.
 * ```typescript
 * conditionHandler(['!', true]) // false
 * conditionHandler(['!', false]) // true
 * ```
 * */
export default function conditionHandler (conditions: IFArgument[], plugin?: IFPlugin, start = 0): any {
  let result: any
  let not = false
  let operator
  const {length} = conditions
  for (let i = start; i < length; i++) {
    let condition = conditions[i]
    if (condition === '(') {
      result = conditionHandler(conditions, plugin, i + 1)
      return not ? !result : result
    } else if (condition === ')') {
      return result
    } else  if (condition === '!') {
      not = true
    } else if (result === undefined) {
      if (plugin) {
        condition = plugin(condition)
      }
      result = not ? !condition : condition
      not = false
    } else if (operator === undefined) {
      operator = condition
    } else {
      if (not) {
        condition = !condition
        not = false
      }
      if (plugin) {
        condition = plugin(condition)
      }
      if (operator === '&&') {
        result = result && condition
      } else if (operator === '||') {
        result = result || condition
      } else if (operator === '===') {
        result = result === condition
      } else if (operator === '==') {
        result = result == condition
      } else if (operator === '!==') {
        result = result !== condition
      } else if (operator === '!=') {
        result = result != condition
      } else if (operator === '>') {
        result = result > condition
      } else if (operator === '>=') {
        result = result >= condition
      } else if (operator === '<') {
        result = result < condition
      } else if (operator === '<=') {
        result = result <= condition
      }
      operator = undefined
    }
  }
  return result
}
