import React, { useCallback, useEffect } from 'react'
import { useGlobals, useStorybookApi } from '@storybook/manager-api'
import {
  Icons,
  IconButton,
  Separator,
  WithTooltip,
  TooltipLinkList
} from '@storybook/components'

import { ADDON_ID, PARAM_KEY, TOOL_ID } from './constants'

export const Tool = () => {
  const [globals, updateGlobals] = useGlobals()
  const api = useStorybookApi()

  const isActive = [true, 'true'].includes(globals[PARAM_KEY])

  const toggleMyTool = useCallback(() => {
    updateGlobals({
      [PARAM_KEY]: !isActive
    })
  }, [isActive])

  useEffect(() => {
    api.setAddonShortcut(ADDON_ID, {
      label: 'Toggle Measure [O]',
      defaultShortcut: ['O'],
      actionName: 'outline',
      showInMenu: false,
      action: toggleMyTool
    })
  }, [toggleMyTool, api])

  return (
    <WithTooltip
      tooltip={() => (
        <>
          <div>Toggle - Select multiple</div>
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
          {/* border-bottom: 4px solid rgba(255, 255, 255, 0.1); */}
          <Separator />
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
          <Separator />
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
        </>
      )}
      trigger="click"
      closeOnOutsideClick
    >
      <IconButton
        key={TOOL_ID}
        active={isActive}
        title="Enable my addon"
        onClick={toggleMyTool}
      >
        <Icons icon="lightning" />
      </IconButton>
    </WithTooltip>
  )
}
