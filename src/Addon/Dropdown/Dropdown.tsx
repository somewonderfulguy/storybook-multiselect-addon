import { Fragment, ReactNode, useState } from 'react'
import {
  IconButton,
  Icons,
  IconsProps,
  WithTooltip
} from '@storybook/components'
import { useGlobals, useStorybookApi } from '@storybook/manager-api'
import isEqual from 'lodash/isEqual'
import { GLOBALS_UPDATED } from '@storybook/core-events'

import {
  AddonEntry,
  SingleSelect,
  MultiSelect,
  GenericValue
} from '../../types'
import { PARAM_KEY } from '../../constants'

import OptionsSelect from './OptionsSelect'
import Reset from './Reset'

import {
  StyledSeparator,
  StyledContainer,
  StyledIconButtonContainer
} from './Dropdown.styles'

type Props = AddonEntry & {
  allDefaults: GenericValue
}

const Dropdown = ({
  elements,
  icon,
  description,
  name,
  allDefaults
}: Props) => {
  // `initialized` is for avoiding incorrect `isActive` when component initializes
  // what leads to blinking effect (inactive -> active -> inactive)
  const [initialized, setInitialized] = useState(false)
  useStorybookApi()
    .getChannel()
    .on(GLOBALS_UPDATED, () => setInitialized(true))

  const queryKeys = (
    elements.filter((_) => _.type !== 'reset') as SingleSelect[] | MultiSelect[]
  ).map(({ queryKey }) => queryKey)

  const defaults = Object.entries(allDefaults).reduce<GenericValue>(
    (acc, [key, value]) => {
      if (queryKeys.includes(key)) {
        acc[key] = Array.isArray(value) ? value.sort() : value
      }
      return acc
    },
    {}
  )

  const [globals] = useGlobals()
  const currentValues = Object.entries(globals[PARAM_KEY]).reduce<GenericValue>(
    (acc, [key, _]) => {
      const value = _ as string | string[] | undefined
      if (queryKeys.includes(key) && value !== undefined) {
        acc[key] = Array.isArray(value) ? value.sort() : value
      }
      return acc
    },
    {}
  )

  const isActive = initialized && !isEqual(defaults, currentValues)

  return (
    <WithTooltip
      tooltip={() => (
        <StyledContainer>
          {elements.map((element, idx) => {
            let returnElement: ReactNode = null
            switch (element.type) {
              case 'reset':
                returnElement = (
                  <Reset
                    defaults={defaults}
                    allKeys={(elements as SingleSelect[])
                      .map(({ queryKey }) => queryKey)
                      .filter((_) => _)}
                  />
                )
                break
              case 'singleSelect':
              case 'multiSelect':
              case 'userDefinedSelect':
                returnElement = (
                  <OptionsSelect {...(element as SingleSelect | MultiSelect)} />
                )
                break
              default:
                returnElement = null
            }
            return (
              <Fragment key={idx}>
                {returnElement}
                {idx < elements.length - 1 && <StyledSeparator />}
              </Fragment>
            )
          })}
        </StyledContainer>
      )}
      trigger="click"
      closeOnOutsideClick
    >
      <IconButton title={description} active={isActive}>
        <StyledIconButtonContainer>
          {typeof icon === 'string' ? (
            <Icons icon={icon as IconsProps['icon']} />
          ) : (
            icon ?? <Icons icon="question" />
          )}
          {name && <span>{name}</span>}
        </StyledIconButtonContainer>
      </IconButton>
    </WithTooltip>
  )
}

export default Dropdown
