import { styled } from '@storybook/theming'
import { IconButton } from '@storybook/components'

const StyledSeparator = styled.hr(({ theme }) => ({
  border: 'none',
  borderBottom: `1px solid ${theme.appBorderColor}`,
  height: 1,
  margin: '6px 0'
}))
StyledSeparator.displayName = 'StyledSeparator'

const StyledContainer = styled.div`
  padding: 5px 0;
`
StyledContainer.displayName = 'StyledContainer'

const StyledIconButton = styled(IconButton)`
  display: flex;
  align-items: center;
  gap: 4px;

  & > span {
    margin-top: 1px;
  }
`
StyledIconButton.displayName = 'StyledIconButton'

export { StyledSeparator, StyledContainer, StyledIconButton }
