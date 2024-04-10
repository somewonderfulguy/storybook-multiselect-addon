import { ReactNode } from 'react'
import { IconsProps } from '@storybook/components'
import { API } from '@storybook/manager-api'

export type AddonConfig = AddonDisabled | Addon

export type AddonDisabled = {
  /** If `true` then addon will not be rendered */
  disable: boolean
}

/** The quantity of dropdowns will be as many as many keys in the object, except `disable` prop */
export type Addon = { [key: string]: AddonEntry }

/** The object that will be used to render dropdowns */
export type AddonEntry = {
  /** Text that will be on the right of icon */
  name?: string
  /** Will be displayed as tooltip when hovering over addon button */
  description?: string
  /** Icon of the dropdown, ReactNode for custom, if no icon provided - will fallback to question mark icon */
  icon?: ReactNode | IconsProps['icon']
  /** Elements, whether single select or multiple select, or reset button */
  elements: Array<Reset | SingleSelect | MultiSelect>
  /** Where to show dropdown - defaults to 'both' */
  viewMode?: 'story' | 'docs' | 'both'
}

/** `reset` will reset all values to default based on `defaultValue`/`defaultValues` in select(s) */
export type Reset = {
  /** `reset` will reset all values to default based on `defaultValue`/`defaultValues` in select(s) */
  type: 'reset'
}

export type SelectSharedProps = {
  /** Optional title that will be rendered above the list of options */
  title?: string
  /** Allow select nothing - will set value to `null`/`[]` if none selected */
  allowEmpty?: boolean
  /** Query key to be used in url, must be unique */
  queryKey: string
  /** If provided, `localStorage` will be used to save/read values.\
   * \
   * Priority order:
   * 1. url query key params
   * 1. `localStorage`
   * 1. `defaultValue(s)` */
  localStorageKey?: string
  // TODO: add & implement `closeOnSelect` prop
}

/** `singleSelect` will render a list of options, only one can be selected at a time */
export type SingleSelect = SelectSharedProps & {
  type: 'singleSelect'
  /** Array of options that will be in UI */
  options: Option[]
  /** Optional default value that will be selected on first render. Default value must match a `value` in `options` */
  defaultValue?: string
  /** Optional function that will be called when value is changed, return value will be used as new value */
  onChange?: (
    value: string | undefined,
    /** Storybook API for advanced use cases */
    storybookApi: API
  ) => string | undefined
}

/** `multiSelect` / `userDefinedSelect` will render a list of options, multiple can be selected at a time */
export type MultiSelect = SelectSharedProps & {
  /** `userDefinedSelect` adds toggle checkbox that will switch from single to multiple but the return
   * value for `multiSelect` and `userDefinedSelect` will __always__ be an array */
  type: 'multiSelect' | 'userDefinedSelect'
  /** Array of options that will be in UI, if `allowEmpty` is `false` or `undefined`, then first item will
   * be selected anyway */
  options: Option[]
  /** Optional default values that will be selected on first render */
  defaultValues?: string[]
  /** Optional function that will be called when value is changed, return value will be used as new value */
  onChange?: (
    value: string[],
    /** Storybook API for advanced use cases */
    storybookApi: API
  ) => string[]
}

/** List item of select (multi or single) */
export type Option = {
  /** Value of the option */
  value: string
  /** Text of option that will be in UI */
  title: ReactNode
  /** Property for adding custom icon on the left, might be __overwritten__ if `icon` is not `undefined` */
  left?: ReactNode
  /** Property for adding custom icon on the right */
  right?: ReactNode
  /** Icon of option that will be in UI (on the left side), __will override__ `left` property */
  icon?: IconsProps['icon']
}

/** Value inside object of multi or single select, either string or array of string, or `undefined` */
export type GenericValue = { [key: string]: string | string[] | undefined }
