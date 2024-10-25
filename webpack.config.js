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
                            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
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
        extensions: [".ts", ".tsx", ".js"]
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
        open: true,
    },
};
