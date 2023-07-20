import { useParameter } from '@storybook/manager-api'

import { Addon } from '../types'
import { PARAM_KEY } from '../constants'

import Dropdown from './Dropdown'

const Addon = () => {
  const multiToolbarConfig = useParameter<Addon>(PARAM_KEY, {})
  const allMultiselects = Object.keys(multiToolbarConfig)

  if (!allMultiselects.length) {
    return null
  }

  return (
    <>
      {allMultiselects.map((id) => (
        <Dropdown key={id} icon={multiToolbarConfig[id].icon} />
      ))}
    </>
  )
}

export default Addon
