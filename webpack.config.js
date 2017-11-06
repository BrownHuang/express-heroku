const path = require('path'); //path 內建套件

module.exports = {
    entry: './client.jsx',  //需要打包的檔案
    output: {               //輸出路徑與檔案
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'static/build')
    },
    resolve: {              //哪些格式需要打包
      extensions: ['.js', '.jsx']
    },
    module: {
      loaders: [
        {                   //各種檔案格式的 loader
          test: /\.js|jsx$/,
          loader: 'babel-loader'
        }
      ]
    },
  };