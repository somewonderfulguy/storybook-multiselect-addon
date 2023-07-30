import { useMemo } from 'react'

import { Addon, MultiSelect } from '../../types'

import { getAllMultiSelects } from '../Addon'
import { useDidMountEffect } from './useDidMountEffect'

export const useCheckUniqueValues = (addonConfig: Addon) => {
  const allSelects = useMemo(
    () => getAllMultiSelects(addonConfig),
    [addonConfig]
  )

  useDidMountEffect(() => {
    // assert that all query keys are unique
    const allQueryKeys = allSelects.map(({ queryKey }) => queryKey)
    const allUniqueQueryKeys = [...new Set(allQueryKeys)]
    if (allQueryKeys.length !== allUniqueQueryKeys.length) {
      throw new Error(
        `Query keys must be unique, but found duplicates: ${allQueryKeys}`
      )
    }
    if (allUniqueQueryKeys.some((_) => _ === '')) {
      throw new Error(`Query keys must not be empty`)
    }

    // assert that all default values (in arrays, meaning multi selects) are unique
    const allElements = Object.values(addonConfig).reduce<MultiSelect[]>(
      (acc, { elements }) => [
        ...acc,
        ...(elements.filter(
          ({ type }) => type === 'multiSelect' || type === 'userDefinedSelect'
        ) as MultiSelect[])
      ],
      []
    )
    allElements.forEach(({ defaultValues }) => {
      if (defaultValues === undefined) return
      const uniqueDefaultValues = [...new Set(defaultValues)]
      if (defaultValues.length !== uniqueDefaultValues.length) {
        throw new Error(
          `Default values must be unique, but found duplicates: ${defaultValues}`
        )
      }
    })

    // assert that all values are unique
    allSelects.forEach(({ options }) => {
      const allValues = options.map(({ value }) => value)
      const allUniqueValues = [...new Set(allValues)]
      if (allValues.length !== allUniqueValues.length) {
        throw new Error(
          `Values must be unique, but found duplicates: ${allValues}`
        )
      }
    })
  }, [allSelects])
}
