import type { Meta, StoryObj } from '@storybook/react'

import TextCard from './TextCard'

import './TextCard.stories.css'

const meta = {
  title: 'Test Components/Text Card',
  component: TextCard,
  tags: ['autodocs']
} as Meta<typeof TextCard>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs = {
  children: `Adam Smasher is a full borg solo and rival of Morgan Blackhand.
He is employed by Arasaka and by 2077, has risen to the position of head of security and the
personal bodyguard of Yorinobu Arasaka. Smasher is a towering cyborg, with little humanity
left to be seen - not that he ever had much. After being reduced to mush by an RPG blast,
Arasaka offered him a choice - either pull the plug or become a full body conversion cyborg.
With little to no options and a lack of care for his human side, he agreed and became more
machine than man.`
}

export const Default: Story = {
  name: 'Default (full width)',
  args: {
    ...defaultArgs,
    children: (
      <div className="paragraphsWrapper">
        <p>
          Adam Smasher is a full borg solo and rival of Morgan Blackhand. He is
          employed by Arasaka and by 2077, has risen to the position of head of
          security and the personal bodyguard of Yorinobu Arasaka.
        </p>
        <p>
          Smasher is a towering cyborg, with little humanity left to be seen -
          not that he ever had much. After being reduced to mush by an RPG
          blast, Arasaka offered him a choice - either pull the plug or become a
          full body conversion cyborg. With little to no options and a lack of
          care for his human side, he agreed and became more machine than man.
        </p>
        <p>
          Adam has no empathy for others - including his fellow employees - but
          Arasaka kept him alive, so he lives to repay their act by killing any
          enemies of the corporation that they put in front of him.
        </p>
      </div>
    )
  }
}

export const WithWidth: Story = {
  name: 'With smaller width (400px)',
  args: {
    ...defaultArgs,
    style: { width: 400 }
  }
}

export const CroppedSideShapes: Story = {
  name: 'Cropped side shapes (smaller height)',
  args: {
    ...WithWidth.args,
    children: `V, an alias for Valerie/Vincent, is a mercenary involved in a series of
singular events during the year 2077, which toppled the balance of power in Night City.`
  }
}

export const Empty: Story = {
  args: {
    ...WithWidth.args,
    children: undefined
  }
}

export const AbsolutelyEmpty: Story = {
  name: 'Absolutely empty (with forced height)',
  args: {
    ...defaultArgs,
    className: 'heightImportantSixHundredsPx',
    children: ''
  }
}
