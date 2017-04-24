var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        'script!jquery/dist/jquery.min.js',
        'script!foundation-sites/dist/js/foundation.min.js',
        './app/app.jsx'
    ],
    externals: {
        jquery: 'jQuery'
    },
    plugins: [
        // this makes sure 'jQuery' is available to any jQuery 
        //plugin you might want. 
        // to load (including Foundation files) 
        //regardless of how they are written.
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery'
        })
    ],
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    resolve: {
        root: __dirname,
        modulesDirectories: [
            'node_modules',
            './app/components',
            './app/api',
            './app/img'
        ],
        alias: {
            actions: 'app/actions/actions.jsx',
            reducers: 'app/reducers/reducers.jsx',
            configureStore: 'app/store/configureStore',
            applicationStyles: 'app/styles/app.scss'
    },
        extensions: ['', '.js', '.jsx','.webpack.js','.web.js']
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                },
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 25000,
                },
            },
            { test: /\.json$/, loader: 'json-loader' }
        ]
    },
    // node: {
    //     console: true,
    //     fs: 'empty',
    //     net: 'empty',
    //     tls: 'empty',
    //     net: 'empty',
    //     dns: 'empty',
    //     'pg-native': 'empty'
    // },

    devtool: 'cheap-module-eval-source-map'
};