/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const path = require('path');

const fontawesomeDir = path.dirname(require.resolve('@fortawesome/fontawesome-free/package.json'));

const config = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-styling-webpack',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          {
            test: /\.css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    auto: true,
                    localIdentName: '[name]__[local]--[hash:base64:5]'
                  }
                }
              }
            ]
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              'style-loader',
              'css-loader',
              {
                loader: 'sass-loader',
                options: { implementation: require('sass') }
              }
            ]
          }
        ]
      }
    }
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  webpackFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      modules: [
        ...(config.resolve.modules || []),
        path.resolve(__dirname, '../node_modules')
      ],
      alias: {
        ...(config.resolve.alias || {}),
        '@fortawesome/fontawesome-free': fontawesomeDir,
        '@fortawesome/fontawesome-free/webfonts': path.join(fontawesomeDir, 'webfonts')
      }
    };
    console.log('CI mode:', process.env.CI);
    if (!process.env.CI) {
      // Use local path for local dev
      config.resolve.alias['@mito-forms/core'] = path.resolve(__dirname, '../../../dist/core');
    }
    // Add rule for font files
    config.module.rules.push({
      test: /\.(woff2?|ttf|eot|svg)$/,
      type: 'asset/resource',
      generator: {
        filename: 'fonts/[name][ext]'
      }
    });

    return config;
  }
};

export default config;
