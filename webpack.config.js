const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const colors = require("colors");

const env = process.env.NODE_ENV;

const buildVersion = function() {
  return require("./package.json").version;
};

const config = {
  entry: {
    ["1-app"]: "./src/app.js"
  },
  output: {
    path: `${__dirname}dist/`,
    filename: "bundle.min.js"
  },
  mode: "development",
  devtool: "eval-source-map",
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "development",
      template: "index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: __dirname,
    compress: true,
    overlay: true,
    host: "0.0.0.0",
    port: 2005
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: ["node_modules"],
    alias: {
      src: path.resolve(__dirname, "src/")
    }
  }
};

switch (config.mode) {
  case "development":
    console.log("⚙️⚙️⚙️ Run webpack development ⚙️⚙️⚙️".green, buildVersion());
    module.exports = config;
    break;
  case "production":
    console.log("⚡⚡⚡ Run webpack production ⚡⚡⚡".yellow, buildVersion());
    module.exports = config;
    break;
  default:
    console.log(
      "❌❌❌ Default state is hit: Env variable is not defined somehow ❌❌❌."
        .red
    );
}
