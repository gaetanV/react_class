var webpack = require('webpack')
const prod = process.argv.indexOf('-p') !== -1;

module.exports = {
    entry: './run.js',
    output: {
        filename: './app/deploy.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ],
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            class: __dirname+"/core/class/",
            dom: __dirname+"/core/dom/",
            interface: __dirname+"/core/interface",
            pageX: __dirname+"/scene/PageX/",
            pageY: __dirname+"/scene/PageY/",
            DOM:__dirname+"/core/lib/DOM",
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': prod? `"production"`: '"development"'
        })
    ]
}



