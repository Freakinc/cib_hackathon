import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import rules from './webpackRules';

const config: Configuration = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    publicPath: '',
  },
  module: {
    rules,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    // new ESLintPlugin({
    //   extensions: ["js", "jsx", "ts", "tsx"],
    // }),
    new CleanWebpackPlugin(),
  ],
};

export default config;
