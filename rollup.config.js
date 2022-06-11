import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import fs from 'fs';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default [
  {
    input: './src/server/index.ts',
    external: Object.keys(pkg.dependencies),
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve(),
      typescript(),
      terser(),
    ],
  },
  {
    input: './src/client/index.ts',
    output: [
      {
        file: pkg.browser,
        format: 'iife',
        sourcemap: false,
      },
    ],
    plugins: [
      nodeResolve({ browser: true }),
      commonjs(),
      typescript({ tsconfig: './src/client/tsconfig.json' }),
      terser(),
    ],
  },
  ...fs.readdirSync('./src/client/commands')
    .map(basename => ({
      input: './src/client/commands/' + basename,
      output: [
        {
          file: './dist/commands/' + basename.replace('ts', 'js'),
          format: 'iife',
          sourcemap: false,
          name: 'driver'
        },
      ],
      plugins: [
        nodeResolve({ browser: true }),
        commonjs(),
        typescript({ tsconfig: './src/client/tsconfig.json' }),
        terser(),
      ],
    })),
];
