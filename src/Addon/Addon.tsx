import { useParameter } from '@storybook/manager-api'
import { ErrorBoundary } from 'react-error-boundary'
import { Icons } from '@storybook/components'

import { Addon, AddonEntry, SingleSelect, MultiSelect } from '../types'
import { PARAM_KEY } from '../constants'

import Dropdown from './Dropdown'
import { useCheckUniqueValues } from './hooks/useCheckUniqueValues'
import { useInitializeState } from './hooks/useInitializeState'

// TODO: configure css modules
// TODO: configure aliases
// TODO: add linter
// TODO: add storybook for addon itself, so user can see how it works
// TODO: config more strict types
// TODO: add readme
// TODO: write tests

export const getAllMultiSelects = (addonConfig: Addon) =>
  Object.values(addonConfig)
    .map(
      ({ elements }) =>
        elements.filter(({ type }) => type !== 'reset') as Array<
          SingleSelect | MultiSelect
        >
    )
    .reduce((acc, curr) => [...acc, ...curr], [])

const Addon = () => {
  const multiToolbarConfig = useParameter<Addon>(PARAM_KEY, {})
  if (!Object.keys(multiToolbarConfig).length) {
    return null
  }

  return (
    <ErrorBoundary
      fallbackRender={() => (
        <div title="Multi select addon crushed. See console for more information">
          <Icons
            icon="alert"
            color="red"
            style={{ margin: '13px 7px 8px 11px', cursor: 'not-allowed' }}
          />
        </div>
      )}
      onError={(error, info) => console.error(error, info)}
    >
      <AddonImplementation addonConfig={multiToolbarConfig} />
    </ErrorBoundary>
  )
}

const AddonImplementation = ({ addonConfig }: { addonConfig: Addon }) => {
  // check that all options.value, defaultValues, queryKey are unique
  useCheckUniqueValues(addonConfig)

  // state initialization - set to globals considering query params, defaultValue(s) and allowEmpty
  useInitializeState(addonConfig)

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
