import { styled } from '@storybook/theming'

const StyledTooltipLinkListWrapper = styled.div`
  & a {
    padding: 0;
  }
`
StyledTooltipLinkListWrapper.displayName = 'StyledTooltipLinkListWrapper'

const StyledTitle = styled.h3`
  font-weight: 600;
  padding: 3px 10px;
`
StyledTitle.displayName = 'StyledTitle'

const StyledIconsWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;
`
StyledIconsWrapper.displayName = 'StyledIconsWrapper'

export { StyledTooltipLinkListWrapper, StyledTitle, StyledIconsWrapper }
