import { useState } from 'react'
import { Icons, IconsProps, TooltipLinkList } from '@storybook/components'

import { SingleSelect, MultiSelect } from '../../../types'

import Switch from './Switch'

import {
  StyledTooltipLinkListWrapper,
  StyledTitle,
  StyledIconsWrapper
} from './OptionsSelect.styles'

type Props = SingleSelect | MultiSelect

const OptionsSelect = ({
  title,
  type,
  options,
  allowEmpty = false,
  ...rest
}: Props) => {
  const isSingle = type === 'singleSelect'
  const isUserDefined = type === 'userDefinedSelect'

  // TODO: handle default values
  const defaultSelected = isSingle
    ? [(rest as SingleSelect).defaultValue]
    : (rest as MultiSelect).defaultValues

  // TODO: handle state
  const [selectedItems, setSelectedItems] = useState(
    defaultSelected ?? ([options[0]?.title] as string[]) ?? ['']
  )
  const [selectMultiple, setSelectMultiple] = useState(true)

  const allValues = options.map(({ value }) => value)

  return (
    <>
      {title && <StyledTitle>{title}</StyledTitle>}
      {isUserDefined && (
        <StyledTooltipLinkListWrapper>
          <TooltipLinkList
            links={[
              {
                id: 'switch',
                title: (
                  <Switch
                    checked={selectMultiple}
                    onChange={(checked) => {
                      setSelectMultiple(checked)
                      if (!checked) {
                        // TODO: select first item (first in list not array)
                        setSelectedItems([selectedItems[0] ?? ''])
                      }
                    }}
                  >
                    <span>Select multiple</span>
                  </Switch>
                )
              }
            ]}
          />
        </StyledTooltipLinkListWrapper>
      )}
      <TooltipLinkList
        links={options.map(({ value, title, left, right, icon }) => {
          const isActive = selectedItems.includes(value)
          return {
            id: value,
            title: title,
            left: icon ? <Icons icon={icon as IconsProps['icon']} /> : left,
            right: (
              <StyledIconsWrapper>
                {right} {isActive && <Icons icon="check" />}
              </StyledIconsWrapper>
            ),
            active: isActive,
            onClick: () => {
              if (isSingle || (isUserDefined && !selectMultiple)) {
                if (isActive && allowEmpty) {
                  return setSelectedItems([''])
                }
                setSelectedItems([value])
              } else {
                if (isActive) {
                  if (!allowEmpty && selectedItems.length === 1) {
                    return
                  }
                  setSelectedItems(
                    selectedItems.filter((item) => item !== value)
                  )
                } else {
                  const newSelectedItems = [...selectedItems, value]
                  // filtering all values to keep the order of selected items the same as options
                  // this needed when user disables `select multiple` and only the most top item should
                  // remain selected
                  setSelectedItems(
                    allValues.filter((item) => newSelectedItems.includes(item))
                  )
                }
              }
            }
          }
        })}
      />
    </>
  )
}

export default OptionsSelect
