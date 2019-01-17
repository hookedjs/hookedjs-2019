module.exports = function(api) {

  api.cache(true);

  return {
    presets: [
      ["@babel/preset-env", {
        "targets": { "browsers": ["last 2 versions"] },
        "loose": true,
      }],
      "@babel/react",
      "@babel/typescript",
    ],
    plugins: [
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      "@babel/plugin-proposal-function-sent",
      "@babel/plugin-proposal-export-namespace-from",
      ["@babel/plugin-proposal-class-properties", { "loose": true }],
      "@babel/plugin-proposal-json-strings",
      "@babel/plugin-syntax-dynamic-import",
    ],
    env: {
      development: {
        presets: [
          ["@babel/preset-env", {
            "targets": { "browsers": ["last 1 Chrome version"] },
            "loose": true
          }]
        ],
        plugins: [
          "react-hot-loader/babel"
        ],
      },
      build: {
        ignore: [
          '**/*.test.tsx',
          '**/*.test.ts',
          '**/*.story.tsx',
          '__snapshots__',
          '__tests__',
          '__stories__',
        ],
      },
    },
    babelrcRoots: [
      ".",
      "src/themes/*",
    ],
  }
};
