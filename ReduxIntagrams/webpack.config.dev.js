import path from 'path'
import webpack from 'webpack';

export default {
  devtools: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, '/client/index.js')
  ],
  output: {
    path: '/',
    publicPath: '/'
  },
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ],
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules'
    ],
    alias: {
      greetingCs: 'client/styles/css/Greeting.css',
      greetingJs: 'client/styles/js/Greeting.js'
    },
    extensions: ['', '.js', '.jsx', '.webpack.js', '.web.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'server/shared'),

        ],
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url'
      }


    ]
  },
  node: {
    fs: 'empty'
  }
}
