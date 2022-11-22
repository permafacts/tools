import type { StorybookConfig } from '@storybook/core-common';

export const rootMain: StorybookConfig = {
  stories: [],
  addons: [
    '@storybook/addon-essentials',
    '@nrwl/react/plugins/storybook',
    '@storybook/addon-links',
  ],
  webpackFinal: async (config, { configType }) => {
    // Make whatever fine-grained changes you need that should apply to all storybook configs

    // Return the altered config
    return {
      ...config,
      resolve: {
        ...config.resolve,
        fallback: {
          // QUARK: I have to do this to get warp to work
          crypto: false,
          constants: false,
        },
      },
    };
  },
};
