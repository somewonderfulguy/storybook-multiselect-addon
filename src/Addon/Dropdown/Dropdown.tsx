import { ReactNode } from 'react'
import {
  useGlobals,
  useParameter,
  useStorybookApi,
  useStorybookState,
  useChannel,
  useAddonState,
  useGlobalTypes
} from '@storybook/manager-api'
import { IconButton, IconsProps, WithTooltip } from '@storybook/components'
import { STORY_RENDERED, STORY_CHANGED } from '@storybook/core-events'

import { INIT_STATE, PARAM_KEY, TOOL_ID, ADDON_ID } from '../../constants'

import OptionsSelect from './OptionsSelect'
import Reset from './Reset'

import { StyledSeparator, StyledContainer } from './Dropdown.styles'

const svgSharedProps = {
  stroke: 'currentColor',
  fill: 'currentColor',
  strokeWidth: '0',
  viewBox: '0 0 16 16',
  height: '1em',
  width: '1em',
  xmlns: 'http://www.w3.org/2000/svg'
}

// TODO: add linter
// TODO: add tests
// TODO: add readme
// TODO: add storybook for addon itself, so user can see how it works

// TODOs with no eta & no priority (just ideas):
// - add slider
// - add color picker
// - add input field

const Dropdown = ({ icon }: { icon?: ReactNode | IconsProps['icon'] }) => {
  const multiToolbarConfig = useParameter(PARAM_KEY, INIT_STATE)
  console.log('multiToolbarConfig', multiToolbarConfig)
  const [globals, updateGlobals] = useGlobals()
  console.log('globals', globals)
  const globalTypes = useGlobalTypes()
  console.log('globalTypes', globalTypes)

  const api = useStorybookApi()

  const state = useStorybookState()
  console.log('state', state)

  const [addonState, setAddonState] = useAddonState(ADDON_ID)
  console.log('addonState', addonState)

  useChannel(
    {
      [STORY_CHANGED]: (args) => {
        console.log('STORY_CHANGED', args)
      },
      [STORY_RENDERED]: (args) => {
        console.log('STORY_RENDERED', args)
      }
    },
    []
  )

  const isActive = [true, 'true'].includes(globals[PARAM_KEY])

  // TODO: no data msg
  return (
    <WithTooltip
      tooltip={() => (
        <StyledContainer>
          <Reset />
          <StyledSeparator />
          <OptionsSelect
            title="Orientation"
            type="single"
            defaultSelected={['horizontal']}
            options={[
              {
                title: 'Horizontal',
                value: 'horizontal',
                left: (
                  <svg {...svgSharedProps}>
                    <path d="M14 1H3L2 2v11l1 1h11l1-1V2l-1-1zM8 13H3V2h5v11zm6 0H9V2h5v11z" />
                  </svg>
                ),
                right: (
                  <svg {...svgSharedProps}>
                    <path d="M14 1H3L2 2v11l1 1h11l1-1V2l-1-1zM8 13H3V2h5v11zm6 0H9V2h5v11z" />
                  </svg>
                )
              },
              {
                title: 'Vertical',
                value: 'vertical',
                left: (
                  <svg {...svgSharedProps}>
                    <path d="M14 1H3L2 2v11l1 1h11l1-1V2l-1-1zm0 12H3V8h11v5zm0-6H3V2h11v5z" />
                  </svg>
                )
              }
            ]}
          />
          <StyledSeparator />
          <OptionsSelect
            title="Themes"
            type="user-defined"
            options={[
              {
                title: 'Yellow',
                value: 'yellow',
                left: '🌕'
              },
              {
                title: 'Dark red',
                value: 'darkRed',
                left: '🔴'
              },
              {
                title: 'Dark greenish',
                value: 'darkGreenish',
                left: '🟢'
              }
            ]}
            defaultSelected={['yellow', 'darkRed']}
          />
        </StyledContainer>
      )}
      trigger="click"
      closeOnOutsideClick
    >
      <IconButton key={TOOL_ID} active={isActive} title="Configure themes">
        {icon}
      </IconButton>
    </WithTooltip>
  )
}

export default Dropdown
