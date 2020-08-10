import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
import {terser} from 'rollup-plugin-terser'

const def = {
  input: {
    index: 'src/index.ts',
  }
}

export default [{
  ...def,
  output: {
    dir: 'lib',
    entryFileNames: pkg.main,
    format: 'cjs'
  },
  plugins: [
    typescript({
      typescript: require('typescript'),
      tsconfigOverride: {
        compilerOptions: {
          target: 'es5'
        }
      }
    })
  ]
}, {
  ...def,
  output: {
    dir: 'lib',
    entryFileNames: pkg.module,
    format: 'es'
  },
  plugins: [
    typescript({
      typescript: require('typescript')
    })
  ]
}, {
  ...def,
  output: {
    dir: 'lib',
    entryFileNames: 'conditionHandler.min.js',
    format: 'iife',
    name: 'conditionHandler',
    plugins: [terser()]
  },
  plugins: [
    typescript({
      typescript: require('typescript'),
      tsconfigOverride: {
        compilerOptions: {
          target: 'es5'
        }
      }
    })
  ]
}]
