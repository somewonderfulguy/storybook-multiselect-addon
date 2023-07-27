import { useStorybookApi, useGlobals } from '@storybook/manager-api'
import { addons } from '@storybook/preview-api'
import { FORCE_RE_RENDER } from '@storybook/core-events'

import { Addon, SingleSelect, MultiSelect } from '../../types'
import { PARAM_KEY } from '../../constants'

import { useDidMountEffect } from './useDidMountEffect'

export const useInitializeState = (
  addonConfig: Addon,
  allSelects: Array<SingleSelect | MultiSelect>
) => {
  const { getQueryParam } = useStorybookApi()
  const [, updateGlobals] = useGlobals()

  useDidMountEffect(() => {
    type StateEntries = { [queryKey: string]: string | string[] }

    const allDefaults: StateEntries = allSelects.reduce((acc, selectObject) => {
      const isSingle = selectObject.type === 'singleSelect'
      const allValues = selectObject.options.map(({ value }) => value)

      const defaultValue = isSingle
        ? selectObject.defaultValue &&
          allValues.includes(selectObject.defaultValue)
          ? selectObject.defaultValue
          : undefined
        : (selectObject.defaultValues ?? [])?.filter((val) =>
            allValues.includes(val)
          )

      const isNoDefaults = isSingle
        ? defaultValue === undefined
        : defaultValue.length === 0

      // check that default value is in options (if not - throw error)
      // TODO: test manually
      if (
        isSingle &&
        isNoDefaults &&
        typeof selectObject.defaultValue === 'string'
      ) {
        throw new Error(
          `Default value "${selectObject.defaultValue}" is not in options for "${selectObject.queryKey}"`
        )
      } else if (!isSingle && defaultValue.length > defaultValue.length) {
        throw new Error(
          `Default values "${selectObject.defaultValues}" are not in options for "${selectObject.queryKey} (or some of them are missing)"`
        )
      }

      // if no defaults && empty not allowed && use first option (if no options - it won't be rendered at all)
      // TODO: test manually
      let value: string | string[] = defaultValue
      if (isNoDefaults && !selectObject.allowEmpty) {
        value = isSingle ? allValues[0] : [allValues[0]]
      }

      if (value === undefined) return acc
      return {
        ...acc,
        [selectObject.queryKey]: value
      }
    }, {})

    const allQueryParams: StateEntries = allSelects.reduce(
      (acc, selectObject) => {
        const isSingle = selectObject.type === 'singleSelect'
        const allValues = selectObject.options.map(({ value }) => value)

        const queryParamValue = getQueryParam(selectObject.queryKey)

        // extract query param value and filter it by available options
        const value = isSingle
          ? allValues.includes(queryParamValue)
            ? queryParamValue
            : undefined
          : queryParamValue?.split(',').filter((val) => allValues.includes(val))

        // skip if no value
        if (value === undefined) return acc
        if (Array.isArray(value) && !value.length) return acc

        return {
          ...acc,
          [selectObject.queryKey]: value
        }
      },
      {}
    )

    const initState: { [paramKey: string]: StateEntries } = {
      [PARAM_KEY]: {
        // query params have priority over default values
        ...allDefaults,
        ...allQueryParams
      }
    }

    updateGlobals({ [PARAM_KEY]: initState })
    addons.getChannel().emit(FORCE_RE_RENDER)
  }, [addonConfig, getQueryParam, updateGlobals, allSelects])
}
