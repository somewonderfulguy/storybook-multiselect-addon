import { styled, Theme } from '@storybook/theming'

// TODO: update config of the project so no need to use hardcoded classes
// instead, it should be used this way: &:checked + ${StyledSlider} ${StyledRound} { ... }
const STYLED_SLIDER = 'StyledSlider-storybook-plugin'
const STYLED_ROUND = 'StyledRound-storybook-plugin'

const StyledLabel = styled.label`
  padding: 7px 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`
StyledLabel.displayName = 'StyledLabel'

const StyledContainer = styled.div<{ theme?: Theme; isActive: boolean }>`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 25px;

  border-radius: 34px;

  &:after {
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    border-radius: 34px;
    background-color: ${({ theme, isActive }) =>
      isActive ? theme!.color.positive : theme!.color.mediumdark};
    opacity: 0.6;
    transition: 200ms;
  }

  &:hover:after {
    opacity: 0.9;
  }
`
StyledContainer.displayName = 'StyledContainer'

const StyledRound = styled.div<{ theme?: Theme }>`
  z-index: 1;
  position: absolute;
  content: '';
  height: 21px;
  width: 21px;
  left: 3px;
  bottom: 2px;
  transition: transform 400ms, opacity 200ms, background-color 200ms;
  border-radius: 50%;

  background-color: ${({ theme }) => theme!.color.lightest};
  background-repeat: no-repeat;
  background-position: center;
  background-size: 75%;
`
StyledRound.displayName = 'StyledRound'

const StyledCheckboxInput = styled.input<{ theme?: Theme }>`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + .${STYLED_SLIDER} .${STYLED_ROUND} {
    transform: translateX(80%);
  }

  &:focus + .${STYLED_SLIDER} .${STYLED_ROUND} {
    box-shadow: 0px 0px 4px 1px ${({ theme }) => theme.color.secondary};
  }
`
StyledCheckboxInput.displayName = 'StyledCheckboxInput'

export {
  StyledLabel,
  StyledContainer,
  STYLED_SLIDER,
  STYLED_ROUND,
  StyledRound,
  StyledCheckboxInput
}
