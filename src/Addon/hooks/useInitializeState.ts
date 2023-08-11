import { useState } from 'react'
import { useGlobals } from '@storybook/manager-api'

import { Addon, GenericValue } from '../../types'
import { PARAM_KEY } from '../../constants'

import { getAllMultiSelects } from '../Addon'
import { useDidMountEffect } from './useDidMountEffect'

export const useInitializeState = (addonConfig: Addon) => {
  const usingGlobals = useGlobals()

  const [allDefaults, setAllDefaults] = useState<GenericValue>({})

  useDidMountEffect(() => {
    const allSelects = getAllMultiSelects(addonConfig)

    const allDefaults: GenericValue = allSelects.reduce((acc, selectObject) => {
      const isSingle = selectObject.type === 'singleSelect'
      const allValues = selectObject.options.map(({ value }) => value)

      const defaultValue = isSingle
        ? selectObject.defaultValue &&
          allValues.includes(selectObject.defaultValue)
          ? selectObject.defaultValue
          : undefined
        : selectObject.defaultValues ?? []

      const isNoDefaults = isSingle
        ? defaultValue === undefined
        : defaultValue.length === 0

      // check that default value is in options (if not - throw error)
      if (
        isSingle &&
        isNoDefaults &&
        typeof selectObject.defaultValue === 'string'
      ) {
        throw new Error(
          `Default value "${selectObject.defaultValue}" is not in options for "${selectObject.queryKey}"`
        )
      } else if (!isSingle) {
        ;(defaultValue as string[]).forEach((val) => {
          if (!allValues.includes(val)) {
            throw new Error(
              `Default value "${val}" is not in options for "${selectObject.queryKey}" (or some of them are missing)`
            )
          }
        })
      }

      // if no defaults && empty not allowed && use first option (if no options - it won't be rendered at all)
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
    setAllDefaults(allDefaults)

    const [globals, updateGlobals] = usingGlobals

    const defaultGlobalsFromQueryParams: {
      [queryKey: string]: string | string[]
    } = globals[PARAM_KEY]

    const allQueryParams: GenericValue = allSelects.reduce(
      (acc, selectObject) => {
        const isSingle = selectObject.type === 'singleSelect'
        const allValues = selectObject.options.map(({ value }) => value)

        const queryParamValue =
          defaultGlobalsFromQueryParams[selectObject.queryKey]

        // extract query param value and filter it by available options
        const value = isSingle
          ? allValues.includes(queryParamValue as string)
            ? queryParamValue
            : undefined
          : // quite complex filtering but what it does is:
            // 1. inside (`queryParamValue.filter`) filters query param values by available options
            // 2. the outer (`allValues.filter`) is keeping values in order of options, so it always will be in the same order
            allValues.filter((val) =>
              (queryParamValue as string[])
                ?.filter((val) => allValues.includes(val))
                .includes(val)
            )

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

    const initState: { [paramKey: string]: GenericValue } = {
      [PARAM_KEY]: {
        // query params have priority over default values
        ...allDefaults,
        ...allQueryParams
      }
    }

    updateGlobals(initState)
  }, [addonConfig, usingGlobals])

  return allDefaults
}
