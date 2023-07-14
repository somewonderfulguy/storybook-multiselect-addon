import { ReactNode } from 'react'

import {
  StyledLabel,
  StyledContainer,
  STYLED_SLIDER,
  STYLED_ROUND,
  StyledRound,
  StyledCheckboxInput
} from './Switch.styles'

type Props = {
  checked: boolean
  onChange: (checked: boolean) => void
  children?: ReactNode
}

const Switch = ({ checked, onChange, children }: Props) => (
  <StyledLabel aria-label="select multiple">
    <StyledContainer isActive={checked}>
      <StyledCheckboxInput
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className={STYLED_SLIDER}>
        <StyledRound className={STYLED_ROUND} />
      </div>
    </StyledContainer>
    {children}
  </StyledLabel>
)

export default Switch
