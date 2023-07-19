import { ReactNode } from 'react'
import { IconsProps } from '@storybook/components'

export type Addon<TOptionValue extends any> = {
  [key: string]: AddonEntry<TOptionValue>
}

export type AddonEntry<TOptionValue> = {
  description?: string
  /** Icon of the dropdown, ReactNode for custom */
  icon?: ReactNode | IconsProps['icon']
  entries: {
    [key: string]:
      | Reset
      | SingleSelect<TOptionValue>
      | MultiSelect<TOptionValue>
  }
}

export type Reset = {
  /** `reset` will reset all values to default */
  type: 'reset'
}

export type SingleSelect<TOptionValue> = {
  /** Type of the select, `userDefinedSelect` adds toggle checkbox that will switch from single to
   * multiple but return value for `multiSelect` and `userDefinedSelect` will __always__ be an array */
  type: 'singleSelect'
  /** Array of options that will be in UI */
  options: Option<TOptionValue>[]
  /** Optional title that will be rendered above the list of options */
  title?: string
  defaultValue?: TOptionValue
}

export type MultiSelect<TOptionValue> = {
  type: 'multiSelect' | 'userDefinedSelect'
  options: Option<TOptionValue>[]
  title?: string
  defaultValues?: TOptionValue[]
}

export type Option<TOptionValue extends any> = {
  /** Value of the option */
  value: TOptionValue
  /** Text of option that will be in UI */
  title: string
  /** Property for adding custom icon on the left, might be __overwritten__ if `icon` is not `undefined` */
  left?: ReactNode
  /** Property for adding custom icon on the right */
  right?: ReactNode
  /** Icon of option that will be in UI (on the left side), __will override__ `left` property */
  icon?: string
}
