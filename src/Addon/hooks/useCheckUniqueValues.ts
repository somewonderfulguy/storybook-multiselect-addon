import { SingleSelect, MultiSelect } from '../../types'

import { useDidMountEffect } from './useDidMountEffect'

export const useCheckUniqueValues = (
  allSelects: Array<SingleSelect | MultiSelect>
) => {
  useDidMountEffect(() => {
    // assert that all query keys are unique
    // TODO: test manually
    const allQueryKeys = allSelects.map(({ queryKey }) => queryKey)
    const allUniqueQueryKeys = [...new Set(allQueryKeys)]
    if (allQueryKeys.length !== allUniqueQueryKeys.length) {
      throw new Error(
        `Query keys must be unique, but found duplicates: ${allQueryKeys}`
      )
    }

    // assert that all default values (in arrays, meaning multi selects) are unique
    // TODO: test manually
    allSelects.forEach(({ options, type }) => {
      if (type === 'singleSelect') return
      const allDefaultValues = options.map(({ value }) => value)
      const allUniqueDefaultValues = [...new Set(allDefaultValues)]
      if (allDefaultValues.length !== allUniqueDefaultValues.length) {
        throw new Error(
          `Default values must be unique, but found duplicates: ${allDefaultValues}`
        )
      }
    })

    // assert that all values are unique
    // TODO: test manually
    allSelects.forEach(({ options }) => {
      const allValues = options.map(({ value }) => value)
      const allUniqueValues = [...new Set(allValues)]
      if (allValues.length !== allUniqueValues.length) {
        throw new Error(
          `Values must be unique, but found duplicates: ${allValues}`
        )
      }
    })

    // TODO: check that default values are unique and values are unique
  }, [allSelects])
}
