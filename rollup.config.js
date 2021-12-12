import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default [
  {
    input: 'src/client/index.ts',
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
  {
    input: 'src/server/index.ts',
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
];
