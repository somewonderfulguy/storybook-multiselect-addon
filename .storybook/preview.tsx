import React from 'react'
import type { Preview } from '@storybook/react'
import 'augmented-ui/augmented-ui.min.css'

import ThemeDecorator from '../src/storybook/ThemeDecorator'

import { PARAM_KEY } from '../src/constants'
import { AddonConfig } from '../src/types'

import './styles/fonts.css'
import './styles/storybook.css'

const svgSharedProps = {
  stroke: 'currentColor',
  height: '1em',
  width: '1em',
  xmlns: 'http://www.w3.org/2000/svg'
}

const multiselect: AddonConfig = {
  theme: {
    name: 'Theme',
    description: 'Select theme',
    icon: (
      <svg
        {...svgSharedProps}
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 16 16"
      >
        <path d="M14.54 11.811l-1.14-3.12v-.06l-4.91-4.91v-1.24a1.66 1.66 0 0 0-.11-.58 1.48 1.48 0 0 0-.83-.8 1.42 1.42 0 0 0-.58-.1 1.47 1.47 0 0 0-1.48 1.48v3.26l-3.06 3a1.52 1.52 0 0 0 0 2.12l3.63 3.63c.14.141.307.253.49.33a1.53 1.53 0 0 0 1.14 0 1.51 1.51 0 0 0 .49-.33l4.93-4.92-.66 2.2a1.19 1.19 0 0 0 0 .46c.033.152.098.296.19.42.098.121.216.223.35.3.14.07.294.11.45.12a1 1 0 0 0 .48-.09 1.14 1.14 0 0 0 .39-.29.98.98 0 0 0 .22-.44c.032-.145.035-.294.01-.44zm-8-9.33a.46.46 0 0 1 0-.2.52.52 0 0 1 .12-.17.64.64 0 0 1 .18-.1.5.5 0 0 1 .21 0 .5.5 0 0 1 .32.15.5.5 0 0 1 .12.33v1.26l-1 1 .05-2.27zm1 11.35a.36.36 0 0 1-.16.11.47.47 0 0 1-.38 0 .361.361 0 0 1-.16-.11l-3.63-3.62a.5.5 0 0 1 0-.71l4.35-4.35v2.85a.74.74 0 0 0-.24.55.75.75 0 1 0 1.17-.55v-2.83l3.85 3.87-4.8 4.79z" />
      </svg>
    ),
    elements: [
      { type: 'reset' },
      {
        type: 'singleSelect',
        title: 'Orientation',
        defaultValue: 'horizontal',
        queryKey: 'orientation',
        localStorageKey: 'orientation',
        options: [
          {
            value: 'horizontal',
            title: 'Horizontal',
            left: (
              <svg
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                {...svgSharedProps}
              >
                <path d="M14 1H3L2 2v11l1 1h11l1-1V2l-1-1zM8 13H3V2h5v11zm6 0H9V2h5v11z" />
              </svg>
            )
          },
          {
            value: 'vertical',
            title: 'Vertical',
            left: (
              <svg
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                {...svgSharedProps}
              >
                <path d="M14 1H3L2 2v11l1 1h11l1-1V2l-1-1zm0 12H3V8h11v5zm0-6H3V2h11v5z" />
              </svg>
            )
          }
        ]
      },
      {
        type: 'userDefinedSelect',
        title: 'Theme',
        defaultValues: ['yellow', 'darkRed'],
        queryKey: 'theme',
        localStorageKey: 'theme',
        options: [
          {
            value: 'yellow',
            title: 'Yellow',
            left: '🟡'
          },
          {
            value: 'darkRed',
            title: 'Dark Red',
            left: '🔴'
          },
          {
            value: 'dark',
            title: 'Dark',
            left: '⚫️'
          }
        ]
      }
    ]
  },
  language: {
    icon: 'globe',
    viewMode: 'docs',
    elements: [
      {
        type: 'singleSelect',
        allowEmpty: true,
        queryKey: 'language',
        options: [
          {
            value: 'en',
            title: 'English',
            left: '🇬🇧'
          },
          {
            value: 'ukr',
            title: 'Ukrainian',
            left: '🇺🇦'
          },
          {
            value: 'pl',
            title: 'Polish',
            left: '🇵🇱'
          },
          {
            value: 'jp',
            title: 'Japanese',
            left: '🇯🇵'
          }
        ]
      },
      {
        title: 'Test multiselect',
        type: 'multiSelect',
        allowEmpty: true,
        queryKey: 'test',
        localStorageKey: 'test',
        onChange: (values, api) => {
          const { emit } = api

          emit('customEmit', values)

          if (values.includes('parzival')) {
            return [...values, 'art3mis']
          }
          return values
        },
        options: [
          {
            value: 'parzival',
            title: 'Parzival',
            icon: 'key',
            right: '🗝️'
          },
          {
            value: 'art3mis',
            title: 'Art3mis'
          },
          {
            value: 'aech',
            title: 'Aech',
            icon: 'wrench',
            left: '🤖'
          },
          {
            value: 'shoto',
            title: 'Shoto',
            left: '🐉',
            right: '🐲'
          },
          {
            value: 'daito',
            title: 'Daito',
            right: '👾'
          }
        ]
      },
      { type: 'reset' }
    ]
  }
}

const preview: Preview = {
  decorators: [ThemeDecorator],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'Cyberpunk Dark',
      values: [
        { name: 'Cyberpunk', value: '#f5ed00' },
        {
          name: 'Cyberpunk Dark Red',
          value:
            'linear-gradient(355deg, rgba(5,9,14,1) 0%, rgba(71,21,25,1) 100%)'
        },
        { name: 'Cyberpunk Dark', value: '#171017' }
      ]
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    [PARAM_KEY]: multiselect
  }
}

export default preview
