import { ReactNode } from 'react'
import { IconsProps } from '@storybook/components'

/** The quantity of dropdowns will be as many as many keys in the object */
export type Addon = {
  [key: string]: AddonEntry
}

/** The object that will be used to render dropdowns */
export type AddonEntry = {
  /** Text that will be on the rigt of icon */
  name?: string
  /** Will be displayed as tooltip when hovering over addon button */
  description?: string
  /** Icon of the dropdown, ReactNode for custom, if no icon provided - will fallback to question mark icon */
  icon?: ReactNode | IconsProps['icon']
  /** Elements, whether single select or multiple select, or reset button */
  elements: {
    [key: string]: Reset | SingleSelect | MultiSelect
  }
}

/** `reset` will reset all values to default based on `defaultValue`/`defaultValues` in select(s) */
export type Reset = {
  /** `reset` will reset all values to default based on `defaultValue`/`defaultValues` in select(s) */
  type: 'reset'
}

/** `singleSelect` will render a list of options, only one can be selected at a time */
export type SingleSelect = {
  type: 'singleSelect'
  /** Array of options that will be in UI */
  options: Option[]
  /** Optional title that will be rendered above the list of options */
  title?: string
  /** Optional default value that will be selected on first render */
  defaultValue?: string
}

/** `multiSelect` / `userDefinedSelect` will render a list of options, multiple can be selected at a time */
export type MultiSelect = {
  /** `userDefinedSelect` adds toggle checkbox that will switch from single to multiple but the return
   * value for `multiSelect` and `userDefinedSelect` will __always__ be an array */
  type: 'multiSelect' | 'userDefinedSelect'
  /** Array of options that will be in UI */
  options: Option[]
  /** Optional title that will be rendered above the list of options */
  title?: string
  /** Optional default values that will be selected on first render */
  defaultValues?: string[]
}

/** List item of select (multi or single) */
export type Option = {
  /** Value of the option */
  value: string
  /** Text of option that will be in UI */
  title: string
  /** Property for adding custom icon on the left, might be __overwritten__ if `icon` is not `undefined` */
  left?: ReactNode
  /** Property for adding custom icon on the right */
  right?: ReactNode
  /** Icon of option that will be in UI (on the left side), __will override__ `left` property */
  icon?: string
}
