/**
 * Webpack: Compiles the app
 *
 * Refs:
 * https://github.com/rokoroku/react-mobx-typescript-boilerplate
 * https://www.blazemeter.com/blog/the-correct-way-to-import-lodash-libraries-a-benchmark
 * https://stackoverflow.com/questions/49912084/webpack-run-both-less-and-scss-compilation-extract-text-plugin-not-working-on
 * https://medium.com/@michalozogan/how-to-split-moment-js-locales-to-chunks-with-webpack-de9e25caccea
 *
 * For native, check out
 * - https://github.com/timarney/react-app-rewired
 * - https://github.com/cdharris/react-app-rewire-hot-loader
 * - https://github.com/csstools/postcss-preset-env
 * Need to decide if we should use react-app-rewired or maybe just use webpack environment features
 */

const devMode = !['production','staging'].includes(process.env.NODE_ENV);

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const shell = require('shelljs');

// variables
const sourcePath = path.resolve(__dirname);
const projectPath = path.resolve(__dirname, '../../../');
const pagesPath = path.join(projectPath, './client-web/pages');
const pages = fs.readdirSync(pagesPath).map(p => p.split(".tsx")[0]);
const outPath = path.join(projectPath, './client-web/build');

shell.exec(`rm -rf build && cp -rf static build`, {silent:true, cwd: path.join(projectPath, "./client-web")});

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


module.exports = {
  context: sourcePath,
  entry: {
    main: './Main.tsx',
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
      path.resolve(sourcePath, '../node_modules'),
      path.resolve(projectPath, `./node_modules`)
    ],
    alias: {
      "~": sourcePath,
      "@project": projectPath,
    }
  },
  module: {
    rules: [

      // Styles
      {
        test: /\.(sass|scss)$/,
        use: [].concat(
          [{loader: 'sass-loader', options: {sourceMap: devMode}}],
          cssLoaders
        ),
      },
      {
        test: /\.less$/,
        use: [].concat(
          [{loader: 'less-loader', options: {sourceMap: devMode}}],
          cssLoaders),
      },
      {
        test: /\.css$/,
        use: [].concat(
          // [{loader: require('styled-jsx/webpack').loader}],
          cssLoaders)
      },


      { test: /\.(mjs|js|tsx|ts)$/, loader: 'babel-loader' },
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
    new HtmlWebpackPlugin({ template: path.resolve(projectPath, "client-web/static/index.html") }),
    new webpack.DefinePlugin({
      // This will replace env variables during build
      'process.env': JSON.stringify(process.env),
      'PAGES': JSON.stringify(pages),
      'PROJECT_PATH': projectPath,
    }),
    process.env.ANALYZE ? new BundleAnalyzerPlugin() : () => null,
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      // filename: devMode ? '[name].css' : `css-${nowString}/[name].css`,
      // chunkFilename: devMode ? '[id].css' : `css-${nowString}/[name].[id].css`,
    }),
    !devMode ? new CompressionPlugin() : () => null,
    !devMode ? new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false
    }) : () => null,

    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    // new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.NamedModulesPlugin(),
    // new LodashModuleReplacementPlugin({
    //   // This plugin stripts bulky features.
    //   // Set the feature to true to include it.
    //   shorthands: true,
    //   // cloning: true,
    //   currying: true,
    //   // caching: true,
    //   collections: true,
    //   // exotics: true,
    //   // guards: true,
    //   // metadata: true,
    //   // deburring: true,
    //   // unicode: true,
    //   // chaining: true,
    //   // memoizing: true,
    //   // coercions: true,
    //   // flattening: true, // required for bootstrap typeahead module
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
