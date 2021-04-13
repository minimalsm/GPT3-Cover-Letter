const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withFonts = require("next-fonts");
const webpack = require("webpack");
const path = require("path");
require('dotenv').config();


module.exports = withFonts(
  withCSS(
    withImages(
      withSass({
        webpack(config, options) {
          config.module.rules.push({
            test: /\.(eot|ttf|woff|woff2)$/,
            use: {
              loader: "url-loader",
            },
          });
          config.node = {
            fs: 'empty'
          }
          config.resolve.modules.push(path.resolve("./"));
          config.plugins.push(
            new webpack.EnvironmentPlugin(process.env)
          )
          return config;
        },

      })
    )
  )
);



