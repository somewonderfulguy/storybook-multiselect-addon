import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark'
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    multiselect: {
      myAnotherTest: 'test2'
    }
  }
}

export default preview
