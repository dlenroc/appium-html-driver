import babel from '@babel/core';

export async function compile(code: string): Promise<string> {
  const result = await babel.transformAsync(code, {
    cwd: import.meta.dirname,
    babelrc: false,
    configFile: false,
    browserslistConfigFile: false,
    cloneInputAst: false,
    compact: true,
    comments: false,
    parserOpts: { allowReturnOutsideFunction: true },
    assumptions: { arrayLikeIsIterable: true },
    presets: [
      [
        '@babel/preset-env',
        {
          forceAllTransforms: true,
          ignoreBrowserslistConfig: true,
        },
      ],
    ],
  });

  return result?.code ?? '';
}
