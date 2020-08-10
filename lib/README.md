# condition-handler
[![NPM](https://img.shields.io/npm/v/condition-handler.svg)](https://www.npmjs.com/package/condition-handler)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/condition-handler)](https://github.com/d8corp/condition-handler/blob/master/lib/conditionHandler.min.js)
[![downloads](https://img.shields.io/npm/dm/condition-handler.svg)](https://www.npmjs.com/package/condition-handler)
[![license](https://img.shields.io/npm/l/condition-handler)](https://github.com/d8corp/condition-handler/blob/master/LICENSE)  
The handler of conditions.
## Installation
```bash
npm i condition-handler
# or
yarn add condition-handler
```
Or you can use [minified file](https://github.com/d8corp/condition-handler/blob/master/lib/conditionHandler.min.js).
```html
<!doctype html>
<html>
  <head>
    <script src="conditionHandler.min.js"></script>
  </head>
  <body>
    <script>
      console.log(conditionHandler('!', true))
    </script>
  </body>
</html>
```
## Using
You can use any operators from the list  
`!` `&&` `||` `===` `==` `!==` `!=` `>` `>=` `<` `<=` `(` `)`  
It works the same as `if` operator from JavaScript.
```typescript
conditionHandler(1) // 1 === 1

conditionHandler(1, '&&', 2) // 1 && 2 === 2

conditionHandler(1, '&&', 0) // 1 && 0 === 0

conditionHandler(1, '||', 0) // 1 || 0 === 1

conditionHandler('!', 1, '||', 0) // !1 || 0 === 0

conditionHandler(1, '>', 2) // 1 > 2 === false

conditionHandler(2, '>=', 1) // 2 >= 1 === true
```

You can use a plugin to handle non-operator argument.
```typescript
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

conditionHandler(['test1', '&&', 'test.field2'], plugin)
// obj.test1 && obj.test.field2 === 0
```
## Issues
If you find a bug, please file an issue on [GitHub](https://github.com/d8corp/condition-handler/issues)  
[![issues](https://img.shields.io/github/issues-raw/d8corp/condition-handler)](https://github.com/d8corp/condition-handler/issues)  
 
[![stars](https://img.shields.io/github/stars/d8corp/condition-handler?style=social)](https://github.com/d8corp/condition-handler)
[![watchers](https://img.shields.io/github/watchers/d8corp/condition-handler?style=social)](https://github.com/d8corp/condition-handler)
