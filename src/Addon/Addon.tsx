import React from 'react'
import { useParameter } from '@storybook/manager-api'
import { ErrorBoundary } from 'react-error-boundary'
import { Icons } from '@storybook/components'
import { useStorybookState } from '@storybook/manager-api'

import {
  AddonConfig,
  Addon as AddonType,
  AddonEntry,
  SingleSelect,
  MultiSelect
} from '../types'
import { PARAM_KEY } from '../constants'

import Dropdown from './Dropdown'
import { useCheckUniqueValues } from './hooks/useCheckUniqueValues'
import { useInitializeState } from './hooks/useInitializeState'

import { StyledErrorIconContainer } from './Addon.styles'

// TODO: configure aliases
// TODO: add linter
// TODO: add storybook for addon itself, so user can see how it works
// TODO: config more strict types
// TODO: add readme
// TODO: write tests
// TODO: fix watch mode (perhaps, tsup issue)
// TODO: metadata for addon, see: https://storybook.js.org/docs/react/addons/integration-catalog
// TODO: create demo

// where is it used? colocate
export const getAllMultiSelects = (addonConfig: AddonType) =>
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

  const { viewMode } = useStorybookState()

  const configFiltered = Object.keys(multiToolbarConfig).reduce<AddonType>(
    (acc, curr) => {
      /** handle: `parameters: { multiselect: { disable: true } }` */
      if (curr !== 'disable') {
        const dropdownData = multiToolbarConfig[
          curr as keyof typeof multiToolbarConfig
        ] as AddonEntry

        const { viewMode: viewModeDropdown = 'both' } = dropdownData

        /** handle: `viewMode` in config */
        if (viewModeDropdown === 'both' || viewModeDropdown === viewMode) {
          acc[curr] = (multiToolbarConfig as AddonType)[curr]
        }
      }
      return acc
    },
    {}
  )

  return (
    <ErrorBoundary
      fallbackRender={() => (
        <StyledErrorIconContainer title="Multi select addon crushed. See console for more information">
          <Icons icon="alert" color="red" />
        </StyledErrorIconContainer>
      )}
      onError={(error, info) => console.error(error, info)}
    >
      {multiToolbarConfig?.disable ? null : (
        <AddonImplementation addonConfig={configFiltered} />
      )}
    </ErrorBoundary>
  )
}

const AddonImplementation = ({ addonConfig }: { addonConfig: AddonType }) => {
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
