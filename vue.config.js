const path = require("path");
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  configureWebpack: {
    resolve: {
      alias: {
        innerVue: path.resolve(__dirname, "./src/components/innerComponents"),
        icons: path.resolve(__dirname, "./src/assets/images/icons")
      }
    }
  }
};
