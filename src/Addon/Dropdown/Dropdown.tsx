import { Fragment, ReactNode } from 'react'
import {
  useGlobals,
  useParameter,
  useStorybookApi,
  useStorybookState,
  useChannel,
  useAddonState,
  useGlobalTypes
} from '@storybook/manager-api'
import {
  IconButton,
  Icons,
  IconsProps,
  WithTooltip
} from '@storybook/components'
import { STORY_RENDERED, STORY_CHANGED } from '@storybook/core-events'

import { INIT_STATE, PARAM_KEY, TOOL_ID, ADDON_ID } from '../../constants'
import { AddonEntry, SingleSelect, MultiSelect } from '../../types'

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

const Dropdown = ({ elements, icon, description, name }: AddonEntry) => {
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

  return (
    <WithTooltip
      tooltip={() => (
        <StyledContainer>
          {elements.map((element, idx) => {
            let returnElement: ReactNode = null
            switch (element.type) {
              case 'reset':
                returnElement = <Reset />
              case 'singleSelect':
              case 'multiSelect':
              case 'userDefinedSelect':
                returnElement = (
                  <OptionsSelect {...(element as SingleSelect | MultiSelect)} />
                )
              default:
                returnElement = null

                return (
                  <Fragment key={idx}>
                    {returnElement}
                    {idx < elements.length - 1 && <StyledSeparator />}
                  </Fragment>
                )
            }
          })}
        </StyledContainer>
      )}
      trigger="click"
      closeOnOutsideClick
    >
      <IconButton key={TOOL_ID} active={isActive} title="Configure themes">
        {typeof icon === 'string' ? (
          <Icons icon={icon as IconsProps['icon']} />
        ) : (
          icon ?? <Icons icon="question" />
        )}
      </IconButton>
    </WithTooltip>
  )
}

export default Dropdown
