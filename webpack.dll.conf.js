const path = require("path");
module.exports = {
  mode: "production",
  entry: {
    vendors: ["lodash"]
  },
  output: {
    filename: "[name].dll.js",
    path: path.resolve(__dirname, "../dll")
  }
};
