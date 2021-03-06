const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlBeautifyPlugin = require("html-beautify-webpack-plugin");

module.exports = {
  entry: {
    main: ["babel-polyfill", "./src/js/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ["pug-loader?pretty=true"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.svg/,
        use: {
          loader: "svg-url-loader",
          options: {}
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "style.css"
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.pug",
      filename: "../index.html",
      minify: false
    }),
    new HtmlBeautifyPlugin({
      config: {
        html: {
          end_with_newline: true,
          indent_size: 2,
          indent_with_tabs: false,
          indent_inner_html: true,
          preserve_newlines: true,
          inline: ["i", "b"],
          unformatted: ["i", "b"],
          wrap_line_length: 120,
          indent_inner_html: true,
          indent_scripts: "separate"
        }
      },
      replace: [' type="text/javascript"']
    })
  ]
};
