module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: [
          'style-loader', 'css-loader', 'stylus-loader'
        ]
      }
    ],

  }

};
