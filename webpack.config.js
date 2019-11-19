var path = require('path');
var SRC_DIR = path.join(__dirname, 'client/src');
var DEST_DIR = path.join(__dirname, 'client/dist');

module.exports = {
  entry: `${SRC_DIR}/app.js`,
  output: {
    filename: 'bundle.js',
    path: DEST_DIR
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react','@babel/preset-env']
          }
        }
      }
    ]
  }
};