import path from 'path';
import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import rules from './webpackRules';

const config: Configuration = {
  mode: 'development',
  output: {
    publicPath: '/',
  },
  entry: './src/index.tsx',
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
    new HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    // new ESLintPlugin({
    //   extensions: ["js", "jsx", "ts", "tsx"],
    // }),
  ],
  devtool: 'eval-source-map',
  devServer: {
    static: path.join(__dirname, 'build'),
    historyApiFallback: true,
    port: 4000,
    open: false,
    hot: true,
  },
};

export default config;
