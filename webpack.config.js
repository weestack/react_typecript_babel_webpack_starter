const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path")
module.exports = {

    // webpack will take the files from ./src/index
    entry: './src/index',

    // and output it into /dist as bundle.js
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },

    // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    module: {
        rules: [

            // we use babel-loader to load our jsx and tsx files
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.(woff2?|ttf|eot)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "fonts/",
                            publicPath: "/fonts/",
                        },
                    },
                ],
            },
            {
                test: /\.(gif|jpg|png|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "images/",
                            publicPath: "/images/",
                        },
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 85,
                            },
                            pngquant: {
                                quality: "65-90",
                                speed: 4,
                            },
                            gifsicle: {
                                enabled: false,
                            },
                        },
                    },
                ],
            },
            // css-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
            {

                test: /\.(scss|css)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {sourceMap: true}
                    },
                    {loader: "sass-loader"}
                ]

            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};