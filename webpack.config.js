const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Entry point for the bundle
  output: {
    filename: "bundle.js", // Output file name
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Match any .css file
        use: [
          //   'style-loader',    // Injects styles into DOM
          MiniCssExtractPlugin.loader, // Extracts CSS into separate files
          "css-loader", // Transforms CSS into CommonJS modules
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html', // Source HTML file
      filename: 'index.html', // Output HTML file (in dist/)
      inject: 'body', // This will inject the script at the end of the body
      scriptLoading: 'defer', // This will add the defer attribute to the script
    }),
  ],

  mode: "development", // Set the mode to development
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"), // Serve files from the public directory
    },
    compress: true, // Enable gzip compression
    port: 9000, // Run the server on port 9000
    open: true, // Automatically open the browser
  },
};
