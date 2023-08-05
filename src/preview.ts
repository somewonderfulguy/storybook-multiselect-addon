import type { Renderer, ProjectAnnotations } from '@storybook/types'

import { PARAM_KEY } from './constants'

const preview: ProjectAnnotations<Renderer> = {
  globals: {
    [PARAM_KEY]: {}
  }
}

export default preview
