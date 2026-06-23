import type { Meta, StoryObj } from '@storybook/react'
import { PriceCardSkeleton } from './PriceCardSkeleton'

const meta: Meta<typeof PriceCardSkeleton> = {
  title: 'Components/PriceCardSkeleton',
  component: PriceCardSkeleton,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PriceCardSkeleton>

export const Default: Story = {}

export const Grid: Story = {
  decorators: [
    () => (
      <div className="grid grid-cols-2 gap-4 w-[680px]">
        <PriceCardSkeleton />
        <PriceCardSkeleton />
        <PriceCardSkeleton />
        <PriceCardSkeleton />
      </div>
    ),
  ],
}
