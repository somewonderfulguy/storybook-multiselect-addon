import { useCallback, useState, useMemo } from 'react'
import { Icons, IconsProps, TooltipLinkList } from '@storybook/components'
import { useStorybookApi, useGlobals } from '@storybook/manager-api'
import { FORCE_RE_RENDER } from '@storybook/core-events'
import { addons } from '@storybook/preview-api'

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
  const defaultValue = (props as SingleSelect).defaultValue
  const defaultValues = (props as MultiSelect).defaultValues

  const isSingle = type === 'singleSelect'
  const isUserDefined = type === 'userDefinedSelect'
  const allValues = useMemo(() => options.map(({ value }) => value), [options])

  const { getQueryParam, setQueryParams } = useStorybookApi()

  const [globals, updateGlobals] = useGlobals()
  const refreshAndUpdateGlobal = useCallback(
    (newState: string[]) => {
      // console.log(queryKey, newState, `globals[${PARAM_KEY}]`, {
      //   ...globals[PARAM_KEY],
      //   [queryKey]: newState
      // })
      updateGlobals({
        [PARAM_KEY]: {
          ...globals[PARAM_KEY],
          [queryKey]: newState
        }
      })
      addons.getChannel().emit(FORCE_RE_RENDER)
    },
    [updateGlobals, globals, queryKey]
  )

  // console.log('globals', globals)

  const updateState = (newState: string[]) => {
    refreshAndUpdateGlobal(newState)
    // updateGlobals
    // setQueryParams
  }

  const defaultSelected = isSingle
    ? defaultValue
      ? [defaultValue]
      : []
    : defaultValues

  // TODO: use globals
  const [selectedItems, setSelectedItems] = useState(() => {
    const queryParamValue = getQueryParam(queryKey)

    const state =
      defaultSelected?.length > 0
        ? defaultSelected
        : allowEmpty
        ? []
        : options[0]?.value
        ? [options[0]?.value]
        : []

    return state
  })

  const [selectMultiple, setSelectMultiple] = useState(true)

  if (!options.length) {
    // TODO: test manually
    return null
  }

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
                        updateState([selectedItems[0] ?? ''])
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
                  updateState([''])
                  return setSelectedItems([''])
                }
                updateState([value])
                setSelectedItems([value])
              } else {
                if (isActive) {
                  if (!allowEmpty && selectedItems.length === 1) {
                    return
                  }
                  updateState(selectedItems.filter((item) => item !== value))
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
                  updateState(
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
