import { Fragment, ReactNode } from 'react'
import {
  IconButton,
  Icons,
  IconsProps,
  WithTooltip
} from '@storybook/components'

import { TOOL_ID } from '../../constants'
import { AddonEntry, SingleSelect, MultiSelect } from '../../types'

import OptionsSelect from './OptionsSelect'
import Reset from './Reset'

import {
  StyledSeparator,
  StyledContainer,
  StyledIconButtonContainer
} from './Dropdown.styles'

const Dropdown = ({ elements, icon, description, name }: AddonEntry) => {
  // TODO: is active when any of the options is selected, also when dropdown is open
  // const isActive = [true, 'true'].includes(globals[PARAM_KEY])

  return (
    <WithTooltip
      tooltip={() => (
        <StyledContainer>
          {elements.map((element, idx) => {
            let returnElement: ReactNode = null
            switch (element.type) {
              case 'reset':
                returnElement = <Reset />
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
      {/* active={isActive} */}
      {/* fix key (add unique value) */}
      <IconButton key={TOOL_ID} title={description}>
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
