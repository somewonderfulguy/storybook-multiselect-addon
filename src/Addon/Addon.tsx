import { useGlobals } from '@storybook/manager-api'

import { Addon } from '../types'
import { PARAM_KEY } from '../constants'

import Dropdown from './Dropdown'

const Addon = () => {
  const [globals] = useGlobals()
  const addonConfig = globals[PARAM_KEY] as Addon<any>
  const allMultiselects = Object.keys(globals[PARAM_KEY] ?? {})

  if (!allMultiselects.length) {
    return null
  }

  return (
    <>
      {allMultiselects.map((id) => (
        <Dropdown key={id} icon={addonConfig[id].icon} />
      ))}
    </>
  )
}

export default Addon
