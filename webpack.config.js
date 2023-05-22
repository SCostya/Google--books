var path = require('path')

module.exports = {
    entry: path.resolve(__dirname, 'switching.js'),
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'main.js', 
        
  },
  mode: 'production',
  module: {
      rules: [
        { 
         test: /\.css$/i,
         use: ['style-loader', 'css-loader'] 
        },
      ],
   },
}
