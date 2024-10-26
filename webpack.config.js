"use strict";

const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    // Set debugging source maps to be "inline" for
    // simplicity and ease of use
    devtool: "inline-source-map",

    // The application entry point
    entry: "./src/index.tsx",

    // Where to compile the bundle
    // By default the output directory is `dist`
    output: {
        filename: "bundle.js"
    },

    // Supported file loaders
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-typescript",
                                [
                                    '@babel/preset-react',
                                    {
                                        runtime: 'automatic', // Enables the new JSX Transform
                                    },
                                ]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/, // Matches regular .scss files (non-modules)
                exclude: /\.module\.scss$/, // Exclude .module.scss files from this rule
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            // {
            //     test: /\.module\.scss$/,
            //     use: [
            //         'style-loader',
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 modules: {
            //                     namedExport: false,
            //                     localIdentName: '[name]_[local]_[hash:base64:5]'
            //                 },
            //             }
            //         },
            //         'sass-loader'
            //     ]
            // },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                namedExport: false,
                                localIdentName: '[name]_[local]_[hash:base64:5]'
                            },
                        }
                    },
                    'sass-loader',
                ]
            },
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.module.css$/, // Matches module.scss files
                use: [
                    'style-loader', // Injects CSS into the DOM
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                namedExport: false,
                                exportLocalsConvention: 'camelCase',
                                localIdentName: '[name]_[local]_[hash:base64:5]', // Configures CSS Modules
                            },
                            importLoaders: 1, // Allows other loaders to process @imported resources
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2)$/i,
                type: "asset/resource",
            },
            {
                test: /\.js$/,
                enforce: "pre", // Ensures source maps are applied before other loaders
                use: ["source-map-loader"],
                exclude: /node_modules/, // Optionally exclude third-party dependencies
            },
        ]
    },

    // File extensions to support resolving
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', "css"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 3000,
        // Enable HMR
        hot: true,
        // Automatically open the browser
        open: false,
    },
};
