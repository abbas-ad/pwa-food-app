// craco.config.js
const CracoLessPlugin = require('craco-less')
const { loaderByName } = require("@craco/craco");

const cssRegex = /\.css$/;
const cssModuleRegex = /\.m\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.m\.(scss|sass)$/;

const lessModifyVars = {}
module.exports = {
    style: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
          //require('react-id-swiper')
        ],
      },
    },
    plugins: [
      // {
      //   plugin: CracoLessPlugin,
      //   options: {
      //     modifyLessRule(lessRule, context) {
      //       lessRule.test = cssRegex
      //       lessRule.exclude = cssModuleRegex;
      //       return lessRule;
      //     },
      //     modifyLessModuleRule(lessModuleRule, context) {
      //       lessModuleRule.test = cssModuleRegex
      //       const cssLoader = lessModuleRule.use.find(loaderByName("css-loader"));
      //       cssLoader.options.modules = {
      //         localIdentName: "[local]_[hash:base64:5]",
      //       };
  
      //       return lessModuleRule;
      //     },
      //   },
      // },
    ]
}
