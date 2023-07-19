/**
 * A decorator is a way to wrap a story in extra “rendering” functionality. Many addons define decorators
 * in order to augment stories:
 * - with extra rendering
 * - gather details about how a story is rendered
 *
 * When writing stories, decorators are typically used to wrap stories with extra markup or context mocking.
 *
 * https://storybook.js.org/docs/react/writing-stories/decorators
 */
import type { Renderer, ProjectAnnotations } from '@storybook/types'
import { PARAM_KEY } from './constants'
import { withGlobals } from './withGlobals'
import { withRoundTrip } from './withRoundTrip'

/**
 * Note: if you want to use JSX in this file, rename it to `preview.tsx`
 * and update the entry prop in tsup.config.ts to use "src/preview.tsx",
 */

const svgSharedProps = {
  stroke: 'currentColor',
  height: '1em',
  width: '1em',
  xmlns: 'http://www.w3.org/2000/svg'
}

const preview: ProjectAnnotations<Renderer> = {
  decorators: [withGlobals, withRoundTrip],
  globals: {
    [PARAM_KEY]: {
      theme: {
        // TODO: specify it all (is it possible to specify type?)
        options: ['one', 'two', 'three'],
        icon: (
          <svg
            {...svgSharedProps}
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
          >
            <path d="M14.54 11.811l-1.14-3.12v-.06l-4.91-4.91v-1.24a1.66 1.66 0 0 0-.11-.58 1.48 1.48 0 0 0-.83-.8 1.42 1.42 0 0 0-.58-.1 1.47 1.47 0 0 0-1.48 1.48v3.26l-3.06 3a1.52 1.52 0 0 0 0 2.12l3.63 3.63c.14.141.307.253.49.33a1.53 1.53 0 0 0 1.14 0 1.51 1.51 0 0 0 .49-.33l4.93-4.92-.66 2.2a1.19 1.19 0 0 0 0 .46c.033.152.098.296.19.42.098.121.216.223.35.3.14.07.294.11.45.12a1 1 0 0 0 .48-.09 1.14 1.14 0 0 0 .39-.29.98.98 0 0 0 .22-.44c.032-.145.035-.294.01-.44zm-8-9.33a.46.46 0 0 1 0-.2.52.52 0 0 1 .12-.17.64.64 0 0 1 .18-.1.5.5 0 0 1 .21 0 .5.5 0 0 1 .32.15.5.5 0 0 1 .12.33v1.26l-1 1 .05-2.27zm1 11.35a.36.36 0 0 1-.16.11.47.47 0 0 1-.38 0 .361.361 0 0 1-.16-.11l-3.63-3.62a.5.5 0 0 1 0-.71l4.35-4.35v2.85a.74.74 0 0 0-.24.55.75.75 0 1 0 1.17-.55v-2.83l3.85 3.87-4.8 4.79z"></path>
          </svg>
        )
      },
      language: {
        options: ['one', 'two', 'three'],
        icon: (
          <svg
            {...svgSharedProps}
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 5h7"></path>
            <path d="M7 4c0 4.846 0 7 .5 8"></path>
            <path d="M10 8.5c0 2.286 -2 4.5 -3.5 4.5s-2.5 -1.135 -2.5 -2c0 -2 1 -3 3 -3s5 .57 5 2.857c0 1.524 -.667 2.571 -2 3.143"></path>
            <path d="M12 20l4 -9l4 9"></path>
            <path d="M19.1 18h-6.2"></path>
          </svg>
        )
      }
    }
  },
  parameters: {
    backgrounds: {
      default: 'cyberpunk',
      values: [
        { name: 'cyberpunk', value: '#f5ed00' },
        { name: 'cyberpunRed', value: '#f50000' }
      ]
    }
  }
}

export default preview
