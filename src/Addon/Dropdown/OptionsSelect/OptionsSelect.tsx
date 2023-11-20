import { useState, useMemo } from 'react'
import { Icons, IconsProps, TooltipLinkList } from '@storybook/components'
import { useGlobals, useStorybookApi } from '@storybook/manager-api'

import { SingleSelect, MultiSelect } from '../../../types'
import { PARAM_KEY } from '../../../constants'

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
  queryKey,
  onChange,
  localStorageKey
}: Props) => {
  const isSingle = type === 'singleSelect'
  const isUserDefined = type === 'userDefinedSelect'
  const allValues = useMemo(() => options.map(({ value }) => value), [options])

  const [globals, updateGlobals] = useGlobals()
  const storybookApi = useStorybookApi()
  const value: string | string[] = globals[PARAM_KEY][queryKey]
  const selectedItems = (typeof value === 'string' ? [value] : value) ?? []
  const setSelectedItems = (newState?: string[]) => {
    let newValue: string | string[] | undefined =
      isSingle && newState?.length ? newState[0] : newState

    if (onChange) {
      if (isSingle) {
        const onChange_ = onChange as SingleSelect['onChange']
        newValue = onChange_(newValue as string, storybookApi) ?? newValue
      } else {
        const onChange_ = onChange as MultiSelect['onChange']
        newValue = onChange_(newValue as string[], storybookApi) ?? newValue
      }
    }

    if (localStorageKey) {
      if (newValue === undefined || (!isSingle && !newValue.length)) {
        localStorage.removeItem(localStorageKey)
      } else if (isSingle) {
        localStorage.setItem(localStorageKey, newValue as string)
      } else {
        localStorage.setItem(localStorageKey, (newValue as string[]).join(','))
      }
    }

    updateGlobals({
      [PARAM_KEY]: {
        ...globals[PARAM_KEY],
        [queryKey]: newValue
      }
    })
  }

  // TODO: persist on open/close/open
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
        links={options.map(({ value, title, left, right, icon }) => {
          const isActive = selectedItems.includes(value)

          // filtering all values to keep the order of selected items the same as options
          // this needed when user disables `select multiple` and only the most top item should
          // remain selected
          const setSortedValue = (newSelectedItems: string[]) => {
            setSelectedItems(
              allValues.filter((item) => newSelectedItems.includes(item))
            )
          }

          return {
            id: value,
            title: title,
            left: icon ? <Icons icon={icon as IconsProps['icon']} /> : left,
            right: (
              <StyledIconsWrapper>
                {right} {isActive && <Icons icon="check" />}
              </StyledIconsWrapper>
            ),
            className: isActive ? 'menu-item-selected' : 'menu-item',
            active: isActive,
            onClick: () => {
              if (isSingle || (isUserDefined && !selectMultiple)) {
                if (isActive && allowEmpty) return setSelectedItems(undefined)
                setSelectedItems([value])
              } else {
                if (isActive) {
                  if (!allowEmpty && selectedItems.length === 1) return
                  setSortedValue(selectedItems.filter((item) => item !== value))
                } else {
                  setSortedValue([...selectedItems, value])
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
