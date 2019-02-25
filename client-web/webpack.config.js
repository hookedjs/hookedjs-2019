/**
 * Webpack: Compiles the app
 *
 * Refs:
 * https://github.com/rokoroku/react-mobx-typescript-boilerplate
 * https://www.blazemeter.com/blog/the-correct-way-to-import-lodash-libraries-a-benchmark
 * 
 * For native, check out
 * - https://github.com/timarney/react-app-rewired
 * - https://github.com/cdharris/react-app-rewire-hot-loader
 * - https://github.com/csstools/postcss-preset-env
 * Need to decide if we should use react-app-rewired or maybe just use webpack environment features
 */

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

// variables
const sourcePath = path.join(__dirname, './src');
const themesPath = path.join(__dirname, './src/themes');
const themes = fs.readdirSync(themesPath);
const outPath = path.join(__dirname, './build');

function getDateString() {
  const date = new Date();
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day =`${date.getDate()}`.padStart(2, '0');
  const hour =`${date.getHours()}`.padStart(2, '0');
  const minute = `${date.getMinutes()}`.padStart(2, '0');
  return `${year}.${month}.${day}-${hour}.${minute}`;
}
const now = (new Date).getTime();
const nowString = getDateString();

// TODO: After removing bootstrap dependency, check if lodash is still being depended on :-(.

module.exports = {
  context: sourcePath,
  entry: {
    main: './core/Main.tsx',
  },
  output: {
    path: outPath,
    filename: `js-${nowString}/main.js`,
    chunkFilename: `js-${nowString}/main.[id].js`,
    publicPath: '/',
  },
  target: 'web',
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: [
      sourcePath,
      path.join(__dirname, './node_modules'),
      ...themes.map((t) => path.resolve(themesPath, `./${t}/node_modules`)),
    ],
    alias: {
      "~": sourcePath,
      ...themes.reduce((a,t) => {a[`@${t}`] = path.join(themesPath, `./${t}/src`); return a;}, {}),
    }
  },
  module: {
    rules: [
      // Take all sass files, compile them, and bundle them in with our js bundle
      {
        test: /\.(scss|css|sass)$/,
        use: [
          {loader: 'style-loader', options: {sourceMap: true}},
          // MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader', options: {
              importLoaders: 1,
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader', options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: () => [
                require('postcss-preset-env')({stage: 0, browsers: 'last 1 Chrome version'}),
                // require('postcss-svgo')(),
                // require('cssnano')(),
              ]
            }
          },
          {loader: 'sass-loader', options: {sourceMap: true,}},
        ]
      },
      {
        test: /\.(mjs|js|tsx|ts)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      { test: /\.(graphql|gql)$/, exclude: /node_modules/, use: 'graphql-tag/loader' },
      { test: /\.(png|jpg|jpeg|gif|svg)$/, exclude: /node_modules/, use: 'url-loader?limit=5000' },
      { test: /\.(woff|woff2|eot|ttf|otf)/, use: 'file-loader' }, // fonts
    ],
  },
  // Example of configuring code splitting. I recommend just leaving defaults.
  // optimization: {
  //   splitChunks: {
  //     name: true,
  //     cacheGroups: {
  //       commons: {
  //         chunks: 'initial',
  //         minChunks: 2
  //       },
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         chunks: 'all',
  //         priority: -10
  //       }
  //     }
  //   },
  //   // runtimeChunk: true
  // },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(sourcePath, 'static', 'index.html') }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        PLATFORM_ENV: JSON.stringify('web'),
      },
    }),
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.NamedModulesPlugin(),
    // new LodashModuleReplacementPlugin({
    //   // This plugin stripts bulky features.
    //   // Set the feature to true to include it.
    //   // shorthands: true,
    //   // cloning: true,
    //   // currying: true,
    //   // caching: true,
    //   // collections: true,
    //   // exotics: true,
    //   // guards: true,
    //   // metadata: true,
    //   // deburring: true,
    //   // unicode: true,
    //   // chaining: true,
    //   // memoizing: true,
    //   // coercions: true,
    //   flattening: true, // required for bootstrap typeahead module
    //   // paths: true,
    //   // placeholders: true,
    // }),
  ],
  devServer: {
    contentBase: outPath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true
    },
    stats: 'minimal',
    headers: { "Access-Control-Allow-Origin": "*" },
  },
  devtool: 'cheap-module-eval-source-map',
};
