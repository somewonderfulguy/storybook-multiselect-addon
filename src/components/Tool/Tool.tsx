import { useCallback, useEffect, useState } from 'react'
import { useGlobals, useStorybookApi } from '@storybook/manager-api'
import {
  Icons,
  IconButton,
  WithTooltip,
  TooltipLinkList
} from '@storybook/components'

import { ADDON_ID, PARAM_KEY, TOOL_ID } from '../../constants'

import Switch from '../Switch'

import {
  StyledSeparator,
  StyledTooltipLinkListWrapper,
  StyledContainer
} from './Tool.styles'

const Tool = () => {
  const [globals, updateGlobals] = useGlobals()
  const api = useStorybookApi()

  const isActive = [true, 'true'].includes(globals[PARAM_KEY])

  // const toggleMyTool = useCallback(() => {
  //   updateGlobals({
  //     [PARAM_KEY]: !isActive
  //   })
  // }, [isActive])

  useEffect(() => {
    api.setAddonShortcut(ADDON_ID, {
      label: 'Toggle Measure [O]',
      defaultShortcut: ['O'],
      actionName: 'outline',
      showInMenu: false,
      action: () => {}
    })
  }, [api])

  const [selectMultiple, setSelectMultiple] = useState(true)

  return (
    <WithTooltip
      tooltip={() => (
        <StyledContainer>
          <TooltipLinkList
            links={[
              {
                id: 'reset',
                title: 'Reset to default',
                onClick: () => {
                  console.log('reset')
                }
              }
            ]}
          />
          <StyledSeparator />
          <TooltipLinkList
            links={[
              {
                id: 'sideBySide',
                title: 'Side by side',
                active: true,
                right: <Icons icon="check" />,
                onClick: () => {
                  console.log('side by side')
                }
              },
              {
                id: 'oneByOne',
                title: 'One by one',
                active: false,
                onClick: () => {
                  console.log('one by one')
                }
              }
            ]}
          />
          <StyledSeparator />
          <StyledTooltipLinkListWrapper>
            <TooltipLinkList
              links={[
                {
                  id: 'switch',
                  title: (
                    <Switch
                      checked={selectMultiple}
                      onChange={setSelectMultiple}
                    >
                      <span>Select multiple</span>
                    </Switch>
                  )
                }
              ]}
            />
          </StyledTooltipLinkListWrapper>
          <TooltipLinkList
            links={[
              {
                id: 'yellow',
                title: 'Yellow',
                active: true,
                left: '🌕',
                right: <Icons icon="check" />,
                onClick: () => {
                  console.log('clicked')
                }
              },
              {
                id: 'darkRed',
                title: 'Dark red',
                active: true,
                left: '🔴',
                right: <Icons icon="check" />,
                onClick: () => {
                  console.log('do something')
                }
              },
              {
                id: 'darkGreenish',
                title: 'Dark greenish',
                active: false,
                left: '🟢',
                onClick: () => {
                  console.log('green!')
                }
              }
            ]}
          />
        </StyledContainer>
      )}
      trigger="click"
      closeOnOutsideClick
    >
      <IconButton
        key={TOOL_ID}
        active={isActive}
        title="Enable my addon"
        // onClick={toggleMyTool}
      >
        <Icons icon="lightning" />
      </IconButton>
    </WithTooltip>
  )
}

export default Tool
