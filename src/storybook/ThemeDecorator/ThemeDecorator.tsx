import { CSSProperties } from 'react'
import type { Decorator } from '@storybook/react'

import './ThemeDecorator.css'

const ThemeDecorator: Decorator = (Story, context) => {
  const { globals, parameters } = context
  const multiselect: { [key: string]: string | string[] } = globals.multiselect
  const gridElementCss = parameters.gridElementCss as CSSProperties | undefined

  const theme = multiselect.theme as Array<'yellow' | 'darkRed' | 'dark'>

  return (
    <div className="gridTheme">
      {theme.map((_theme) => (
        <div
          className={
            _theme === 'yellow'
              ? 'gridElementYellow'
              : _theme === 'darkRed'
              ? 'gridElementDarkRed'
              : 'gridElementDark'
          }
          key={_theme}
          style={gridElementCss}
        >
          <Story />
        </div>
      ))}
    </div>
  )
}

export default ThemeDecorator
