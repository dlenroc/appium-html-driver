/* eslint-disable */

import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json' with { type: 'json' };

export default [
  {
    input: './src/server/index.ts',
    external: Object.keys(pkg.dependencies),
    output: [
      {
        file: pkg.main,
        format: 'es',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve(),
      typescript()
    ],
  },
  {
    input: './src/client/index.ts',
    output: [
      {
        file: pkg.browser,
        format: 'es',
        sourcemap: false,
      },
    ],
    plugins: [
      nodeResolve({ browser: true }),
      commonjs(),
      typescript({ tsconfig: './src/client/tsconfig.json', sourceMap: false }),
      terser({ ie8: true }),
      getBabelOutputPlugin({
        babelrc: false,
        configFile: false,
        browserslistConfigFile: false,
        cloneInputAst: false,
        compact: true,
        comments: false,
        plugins: [
          '@babel/plugin-transform-object-assign'
        ],
        presets: [
          [
            '@babel/preset-env',
            {
              forceAllTransforms: true,
              ignoreBrowserslistConfig: true,
              modules: 'umd',
            },
          ],
        ],
      }),
    ],
  },
];
