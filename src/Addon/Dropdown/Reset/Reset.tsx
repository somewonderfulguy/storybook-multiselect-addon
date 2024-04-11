import React from 'react'
import { Icons, TooltipLinkList } from '@storybook/components'
import { useGlobals } from '@storybook/manager-api'

import { GenericValue } from '../../../types'
import { PARAM_KEY } from '../../../constants'

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
          title: 'Reset to default',
          // @ts-expect-error
          left: <Icons icon="undo" />,
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
