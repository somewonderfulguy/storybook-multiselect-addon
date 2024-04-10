import type { StorybookConfig } from '@storybook/react-vite'
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    './local-preset.js',
    '@storybook/addon-mdx-gfm'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        // @ts-expect-error
        useSWC: true
      }
    }
  },
  features: {
    storyStoreV7: false
  },
  docs: {
    autodocs: 'tag'
  }
}
export default config
