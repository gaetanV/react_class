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
        alias: {
            class: __dirname+"/core/class/",
            dom: __dirname+"/core/dom/",
            interface: __dirname+"/core/interface",
            pageX: __dirname+"/scene/PageX/",
            pageY: __dirname+"/scene/PageY/",
            DOM:__dirname+"/core/lib/DOM",
        }
    }

}



