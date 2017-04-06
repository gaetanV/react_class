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
            class: __dirname+"/class/",
            pageX: __dirname+"/scene/PageX/",
            pageY: __dirname+"/scene/PageY/",
        }
    }

}



