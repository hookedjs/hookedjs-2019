/**
 * Webpack: Compiles the app
 *
 * Refs:
 * https://github.com/rokoroku/react-mobx-typescript-boilerplate
 * https://www.blazemeter.com/blog/the-correct-way-to-import-lodash-libraries-a-benchmark
 * https://stackoverflow.com/questions/49912084/webpack-run-both-less-and-scss-compilation-extract-text-plugin-not-working-on
 *
 * For native, check out
 * - https://github.com/timarney/react-app-rewired
 * - https://github.com/cdharris/react-app-rewire-hot-loader
 * - https://github.com/csstools/postcss-preset-env
 * Need to decide if we should use react-app-rewired or maybe just use webpack environment features
 */

const devMode = process.env.NODE_ENV !== 'production';

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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

const cssLoaders = [
  devMode ? {loader: 'style-loader', options: {sourceMap: true}} : MiniCssExtractPlugin.loader,
  {loader: 'css-loader', options: {sourceMap: devMode}},
  {loader: 'postcss-loader', options: {
    ident: 'postcss', sourceMap: devMode,
      plugins: () => [require('postcss-preset-env')({stage: 0, browsers: 'last 1 Chrome version'})] }
  },
];


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

      // Styles
      {
        test: /\.(sass|scss)$/,
        use: cssLoaders.concat([
          {loader: 'sass-loader', options: {sourceMap: devMode}}
        ]),
      },
      {
        test: /\.less$/,
        use: cssLoaders.concat([
          {loader: 'less-loader', options: {sourceMap: devMode}},
        ]),
      },
      { test: /\.css$/, use: cssLoaders },


      { test: /\.(mjs|js|tsx|ts)$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.(graphql|gql)$/, exclude: /node_modules/, use: 'graphql-tag/loader' },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        exclude: /node_modules/,
        use: { loader: 'url-loader', options: { limit: 5000, name: devMode ? '[path][name].[ext]' : '[path][name][hash].[ext]' } },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)/,
        use: {loader: 'file-loader', options: { name: devMode ? '[path][name].[ext]' : '[path][name][hash].[ext]' }},
      }, // fonts
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(sourcePath, 'static', 'index.html') }),
    new webpack.DefinePlugin({
      // This will replace env variables during build
      'process.env': JSON.stringify(process.env)
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      // filename: devMode ? '[name].css' : `css-${nowString}/[name].css`,
      // chunkFilename: devMode ? '[id].css' : `css-${nowString}/[name].[id].css`,
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
