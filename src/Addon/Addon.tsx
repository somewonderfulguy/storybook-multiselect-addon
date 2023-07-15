import {
  useGlobals,
  useParameter,
  useStorybookApi,
  useChannel
} from '@storybook/manager-api'
import { IconButton, WithTooltip } from '@storybook/components'
import { STORY_RENDERED } from '@storybook/core-events'

import { INIT_STATE, PARAM_KEY, TOOL_ID } from '../constants'

import OptionsSelect from './OptionsSelect'
import Reset from './Reset'

import { StyledSeparator, StyledContainer } from './Addon.styles'

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

const Tool = () => {
  const multiToolbarConfig = useParameter(PARAM_KEY, INIT_STATE)
  // } = useParameter<ViewportAddonParameter>(PARAM_KEY, {});
  // console.log(multiToolbarConfig)
  const [globals, updateGlobals] = useGlobals()
  const api = useStorybookApi()

  useChannel(
    {
      channelCreated: (channel) => {
        console.log('channelCreated', channel)
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
        <svg {...svgSharedProps}>
          <path d="M14.54 11.811l-1.14-3.12v-.06l-4.91-4.91v-1.24a1.66 1.66 0 0 0-.11-.58 1.48 1.48 0 0 0-.83-.8 1.42 1.42 0 0 0-.58-.1 1.47 1.47 0 0 0-1.48 1.48v3.26l-3.06 3a1.52 1.52 0 0 0 0 2.12l3.63 3.63c.14.141.307.253.49.33a1.53 1.53 0 0 0 1.14 0 1.51 1.51 0 0 0 .49-.33l4.93-4.92-.66 2.2a1.19 1.19 0 0 0 0 .46c.033.152.098.296.19.42.098.121.216.223.35.3.14.07.294.11.45.12a1 1 0 0 0 .48-.09 1.14 1.14 0 0 0 .39-.29.98.98 0 0 0 .22-.44c.032-.145.035-.294.01-.44zm-8-9.33a.46.46 0 0 1 0-.2.52.52 0 0 1 .12-.17.64.64 0 0 1 .18-.1.5.5 0 0 1 .21 0 .5.5 0 0 1 .32.15.5.5 0 0 1 .12.33v1.26l-1 1 .05-2.27zm1 11.35a.36.36 0 0 1-.16.11.47.47 0 0 1-.38 0 .361.361 0 0 1-.16-.11l-3.63-3.62a.5.5 0 0 1 0-.71l4.35-4.35v2.85a.74.74 0 0 0-.24.55.75.75 0 1 0 1.17-.55v-2.83l3.85 3.87-4.8 4.79z"></path>
        </svg>
      </IconButton>
    </WithTooltip>
  )
}

export default Tool
