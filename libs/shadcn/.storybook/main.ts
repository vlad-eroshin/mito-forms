import type { StorybookConfig } from '@storybook/react-webpack5';
import * as path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      require('@tailwindcss/postcss'),
                      require('autoprefixer')
                    ]
                  }
                }
              }
            ]
          }
        ]
      }
    },
    '@storybook/addon-themes',
    '@storybook/addon-webpack5-compiler-swc'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true)
    }
  },
  webpackFinal: async (config) => {
    config.devtool = 'eval-source-map'; // or 'inline-source-map'
    config.resolve = {
      ...config.resolve,
      modules: [
        ...(config.resolve.modules || []),
        path.resolve(__dirname, '../node_modules')
      ],
      alias: {
        ...(config.resolve.alias || {})
      }
    };
    console.log('CI mode:', process.env.CI);
    if (!process.env.CI) {
      // Use local path for local dev
      config.resolve.alias['@mito-forms/core'] = path.resolve(__dirname, '../../core/src');

    }

    return config;
  }
};

export default config;
