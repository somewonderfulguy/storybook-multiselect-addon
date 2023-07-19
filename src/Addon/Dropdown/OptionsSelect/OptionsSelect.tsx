import { ReactNode, useState } from 'react'
import { Icons, IconsProps, TooltipLinkList } from '@storybook/components'

import Switch from './Switch'

import {
  StyledTooltipLinkListWrapper,
  StyledTitle,
  StyledIconsWrapper
} from './OptionsSelect.styles'

// TODO: export type to build
type Props = {
  title?: ReactNode
  type: 'single' | 'multiple' | 'user-defined'
  options: Array<{
    title: ReactNode
    value: string
    left?: ReactNode
    right?: ReactNode
    icon?: IconsProps['icon']
  }>
  defaultSelected?: string[]
  allowEmpty?: boolean
}

const OptionsSelect = ({
  title,
  type,
  options,
  defaultSelected,
  allowEmpty = false
}: Props) => {
  const isSingle = type === 'single'
  const isUserDefined = type === 'user-defined'

  // TODO: lift up state
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
            left: icon ? <Icons icon={icon} /> : left,
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
