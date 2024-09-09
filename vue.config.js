const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'? '/FrontDeployVercel/': '/',
  devServer: {
    historyApiFallback: true  // This ensures the app serves index.html for any route
  }
});


