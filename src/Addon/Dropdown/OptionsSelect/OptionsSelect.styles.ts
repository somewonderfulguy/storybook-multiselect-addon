import { styled, Theme } from '@storybook/theming'

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

const StyledIconsWrapper = styled.div<{ theme?: Theme }>`
  display: flex;
  gap: 5px;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;

  & > svg {
    fill: ${({ theme }) => theme!.color.secondary};
  }
`
StyledIconsWrapper.displayName = 'StyledIconsWrapper'

export { StyledTooltipLinkListWrapper, StyledTitle, StyledIconsWrapper }
