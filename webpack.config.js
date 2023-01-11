const path = require("path");

module.exports = {
    entry: "./src/index.jsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".jsx", ".js"],
    },
    devServer: {
        compress: true,
        port: 9000,
        static: {
            directory: path.join(__dirname, "dist"),
        },
    },
    module: {
        rules: [
            {
                test: /\.m?jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
        ],
    },
};
