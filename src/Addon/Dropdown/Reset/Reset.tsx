import React from 'react'
import { TooltipLinkList } from '@storybook/components'
import { UndoIcon } from '@storybook/icons'
import { useGlobals } from '@storybook/manager-api'

import { GenericValue } from '../../../types'
import { PARAM_KEY } from '../../../constants'

import { StyledResetWrapper } from './Reset.styles'

type Props = { defaults: GenericValue; allKeys: string[] }

const Reset = ({ defaults, allKeys }: Props) => {
  const [globals, updateGlobals] = useGlobals()

  const resetValues = allKeys.reduce<GenericValue>((acc, curr) => {
    acc[curr] = defaults[curr]
    return acc
  }, {})

  return (
    <TooltipLinkList
      links={[
        {
          id: 'reset',
          title: <StyledResetWrapper><UndoIcon /> Reset to default</StyledResetWrapper>,
          onClick: () => {
            updateGlobals({
              [PARAM_KEY]: {
                ...globals[PARAM_KEY],
                ...resetValues
              }
            })
          }
        }
      ]}
    />
  )
}

export default Reset
