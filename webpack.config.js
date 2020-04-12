const path = require("path");


module.exports = {
    // 生产发布模式
    mode: 'production',
    entry: path.resolve(__dirname, "./src/index.js"),
    output:{
        path: path.resolve(__dirname,"dist"),
        filename: "yoda.js"
    }
}