import { styled } from '@storybook/theming'

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

export { StyledSeparator, StyledContainer }
