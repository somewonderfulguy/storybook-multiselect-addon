import { Icons, TooltipLinkList } from '@storybook/components'

const Reset = () => {
  return (
    <TooltipLinkList
      links={[
        {
          id: 'reset',
          title: 'Reset to default',
          left: <Icons icon="undo" />,
          onClick: () => {
            console.log('reset')
          }
        }
      ]}
    />
  )
}

export default Reset
