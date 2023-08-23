import type { Renderer, ProjectAnnotations } from '@storybook/types'

import { PARAM_KEY } from './constants'

// FIXME: it is expected to be as preset, but it is not working

const preview: ProjectAnnotations<Renderer> = {
  globals: {
    [PARAM_KEY]: {}
  }
}

export default preview
