'use strict';

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
 * Get result of any conditions like `if` operator from JavaScript.
 * ```typescript
 * conditionHandler(['!', true]) // false
 * conditionHandler(['!', false]) // true
 * ```
 * */
function conditionHandler(conditions, plugin, start) {
    if (start === void 0) { start = 0; }
    var result;
    var not = false;
    var operator;
    var length = conditions.length;
    for (var i = start; i < length; i++) {
        var condition = conditions[i];
        if (condition === '(') {
            result = conditionHandler(conditions, plugin, i + 1);
            return not ? !result : result;
        }
        else if (condition === ')') {
            return result;
        }
        else if (condition === '!') {
            not = true;
        }
        else if (result === undefined) {
            if (plugin) {
                condition = plugin(condition);
            }
            result = not ? !condition : condition;
            not = false;
        }
        else if (operator === undefined) {
            operator = condition;
        }
        else {
            if (not) {
                condition = !condition;
                not = false;
            }
            if (plugin) {
                condition = plugin(condition);
            }
            if (operator === '&&') {
                result = result && condition;
            }
            else if (operator === '||') {
                result = result || condition;
            }
            else if (operator === '===') {
                result = result === condition;
            }
            else if (operator === '==') {
                result = result == condition;
            }
            else if (operator === '!==') {
                result = result !== condition;
            }
            else if (operator === '!=') {
                result = result != condition;
            }
            else if (operator === '>') {
                result = result > condition;
            }
            else if (operator === '>=') {
                result = result >= condition;
            }
            else if (operator === '<') {
                result = result < condition;
            }
            else if (operator === '<=') {
                result = result <= condition;
            }
            operator = undefined;
        }
    }
    return result;
}

module.exports = conditionHandler;
