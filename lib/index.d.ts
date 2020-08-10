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
export declare type IFOperators = '!' | '&&' | '||' | '===' | '==' | '!==' | '!=' | '>' | '>=' | '<' | '<=' | '(' | ')';
export declare type IFArgument = any | IFOperators;
export interface IFPlugin {
    (condition: any): any;
}
/**
 * Get result of any conditions like `if` operator from JavaScript.
 * ```typescript
 * conditionHandler(['!', true]) // false
 * conditionHandler(['!', false]) // true
 * ```
 * */
export default function conditionHandler(conditions: IFArgument[], plugin?: IFPlugin, start?: number): any;
