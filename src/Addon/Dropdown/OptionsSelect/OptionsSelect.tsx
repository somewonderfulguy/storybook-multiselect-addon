import { useState, useMemo } from 'react'
import { Icons, IconsProps, TooltipLinkList } from '@storybook/components'
import { useGlobals } from '@storybook/manager-api'

import { SingleSelect, MultiSelect } from '../../../types'
import { PARAM_KEY } from '../../../constants'

import Switch from './Switch'

import {
  StyledTooltipLinkListWrapper,
  StyledTitle,
  StyledIconsWrapper
} from './OptionsSelect.styles'

type Props = SingleSelect | MultiSelect

const OptionsSelect = (props: Props) => {
  const { title, type, options, allowEmpty = false, queryKey } = props

  const isSingle = type === 'singleSelect'
  const isUserDefined = type === 'userDefinedSelect'
  const allValues = useMemo(() => options.map(({ value }) => value), [options])

  const [globals, updateGlobals] = useGlobals()
  const value: string | string[] = globals[PARAM_KEY][queryKey]
  const selectedItems = (typeof value === 'string' ? [value] : value) ?? []
  const setSelectedItems = (newState?: string[]) => {
    updateGlobals({
      [PARAM_KEY]: {
        ...globals[PARAM_KEY],
        [queryKey]: isSingle && newState?.[0] ? newState[0] : newState
      }
    })
  }

  const [selectMultiple, setSelectMultiple] = useState(true)

  if (!options.length) return null

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
        key={queryKey}
        links={options.map(({ value, title, left, right, icon }, idx) => {
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
                  return setSelectedItems(undefined)
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
