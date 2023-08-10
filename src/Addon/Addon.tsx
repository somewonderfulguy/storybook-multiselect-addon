import { useParameter } from '@storybook/manager-api'
import { ErrorBoundary } from 'react-error-boundary'
import { Icons } from '@storybook/components'

import {
  AddonConfig,
  Addon,
  AddonEntry,
  SingleSelect,
  MultiSelect
} from '../types'
import { PARAM_KEY } from '../constants'

import Dropdown from './Dropdown'
import { useCheckUniqueValues } from './hooks/useCheckUniqueValues'
import { useInitializeState } from './hooks/useInitializeState'

// TODO: configure css modules (is it an issue of tsup? change to vite/webpack/rollup?)
// TODO: configure aliases
// TODO: add linter
// TODO: add storybook for addon itself, so user can see how it works
// TODO: config more strict types
// TODO: add readme
// TODO: write tests
// TODO: fix watch mode (perhaps, tsup issue)
// TODO: metadata for addon, see: https://storybook.js.org/docs/react/addons/integration-catalog

// where is it used? colocate
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
  const multiToolbarConfig = useParameter<AddonConfig>(PARAM_KEY, {})
  if (!Object.keys(multiToolbarConfig).length) {
    return null
  }

  const configWithoutDisable = Object.keys(multiToolbarConfig).reduce<Addon>(
    (acc, curr) => {
      if (curr !== 'disable') {
        acc[curr] = (multiToolbarConfig as Addon)[curr]
      }
      return acc
    },
    {}
  )

  return (
    <ErrorBoundary
      fallbackRender={() => (
        <div title="Multi select addon crushed. See console for more information">
          <Icons
            icon="alert"
            color="red"
            // TODO: move styles outside
            style={{ margin: '13px 7px 8px 11px', cursor: 'not-allowed' }}
          />
        </div>
      )}
      onError={(error, info) => console.error(error, info)}
    >
      {multiToolbarConfig?.disable ? null : (
        <AddonImplementation addonConfig={configWithoutDisable} />
      )}
    </ErrorBoundary>
  )
}

const AddonImplementation = ({ addonConfig }: { addonConfig: Addon }) => {
  // check that all options.value, defaultValues, queryKey are unique
  useCheckUniqueValues(addonConfig)

  // state initialization - set to globals considering query params, defaultValue(s) and allowEmpty
  const allDefaults = useInitializeState(addonConfig)

  const allDropdowns = Object.keys(addonConfig)

  return (
    <>
      {allDropdowns.map((id) => (
        <Dropdown
          key={id}
          {...(addonConfig[id] as AddonEntry)}
          allDefaults={allDefaults}
        />
      ))}
    </>
  )
}

export default Addon
