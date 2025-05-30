const path = require("path");

module.exports = {
  // context: path.resolve(__dirname, "./"), // context 可以省略，默认为 webpack.config.js 所在目录
  entry: './src/index.js', // 添加入口文件配置，指向你的 worker 脚本
  output: { // 添加输出配置
    filename: 'worker.js', // 或者你 wrangler.toml 中指定的入口脚本名
    path: path.resolve(__dirname, 'dist'), // 输出到 dist 目录
  },
  target: "webworker",
  mode: "production", // 部署时通常是 'production'，开发时可以是 'development'
  optimization: {
    usedExports: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i, // 新增：匹配 .html 文件
        loader: 'html-loader', // 新增：使用 html-loader 处理
        options: {
          // esModule: false, // 如果导入时遇到问题，可以尝试取消注释此行
        }
      },
      {
        // 这条规则是为了处理 node_modules 中的 .mjs 文件，保持原样
        include: /node_modules/,
        test: /\.mjs$/,
        type: "javascript/auto",
      },
      // 你可能还需要 babel-loader 来处理现代 JavaScript 语法，如果你的 src/index.js 使用了
      // 浏览器或 Workers 运行时还不完全支持的特性。
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env'] // 示例 preset
      //     }
      //   }
      // }
    ],
  },
};
