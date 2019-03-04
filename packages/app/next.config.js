require('dotenv').config()
const path = require('path')
const Dotenv = require('dotenv-webpack')
const withTypescript = require('@zeit/next-typescript')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = withTypescript({
  target: 'serverless',

  webpack(config, options) {
    // Do not run type checking twice:
    if (options.isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin())
    }

    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      })
    ]

    config.module.rules.forEach((rule) => {
      const ruleContainsTs = rule.test.toString().includes('ts|tsx')

      if (ruleContainsTs && rule.use && rule.use.loader === 'next-babel-loader') {
        rule.include = undefined
      }
    })

    options.defaultLoaders.babel.options.configFile = path.join(__dirname, '.babelrc')


    return config
  }
})
