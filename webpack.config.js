const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        compress: true,
        port: 9000,
        static: {
            directory: path.join(__dirname, "dist"),
        },
    },
};
