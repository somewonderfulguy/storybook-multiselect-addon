import { useParameter } from '@storybook/manager-api'
import { useMemo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

// TODO: configure aliases (?)
import { Addon, AddonEntry, SingleSelect, MultiSelect } from '../types'
import { PARAM_KEY } from '../constants'

import Dropdown from './Dropdown'
import { useCheckUniqueValues } from './hooks/useCheckUniqueValues'
import { useInitializeState } from './hooks/useInitializeState'

const Addon = () => {
  const multiToolbarConfig = useParameter<Addon>(PARAM_KEY, {})
  if (!Object.keys(multiToolbarConfig).length) {
    return null
  }

  return (
    <ErrorBoundary
      // TODO: add error icon
      fallbackRender={() => <></>}
      onError={(error, info) => console.error(error, info)}
    >
      <AddonImplementation addonConfig={multiToolbarConfig} />
    </ErrorBoundary>
  )
}

const AddonImplementation = ({ addonConfig }: { addonConfig: Addon }) => {
  const allSelects = useMemo(
    () =>
      Object.values(addonConfig)
        .map(
          ({ elements }) =>
            elements.filter(({ type }) => type !== 'reset') as Array<
              SingleSelect | MultiSelect
            >
        )
        .reduce((acc, curr) => [...acc, ...curr], []),
    [addonConfig]
  )

  // check that all options.value, defaultValues, queryKey are unique
  useCheckUniqueValues(allSelects)

  // state initialization - set to globals considering query params, defaultValue(s) and allowEmpty
  useInitializeState(addonConfig, allSelects)

  const allMultiSelects = Object.keys(addonConfig)
  return (
    <>
      {allMultiSelects.map((id) => (
        <Dropdown key={id} {...(addonConfig[id] as AddonEntry)} />
      ))}
    </>
  )
}

export default Addon
