import type { Meta, StoryObj } from '@storybook/react'
import { SourceHealthBadge } from './SourceHealthBadge'

const meta: Meta<typeof SourceHealthBadge> = {
  title: 'Components/SourceHealthBadge',
  component: SourceHealthBadge,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof SourceHealthBadge>

export const MultipleSources: Story = {
  args: {
    sources: ['chainlink', 'redstone', 'band'],
  },
}

export const SingleSource: Story = {
  args: {
    sources: ['reflector'],
  },
}

export const AllSources: Story = {
  args: {
    sources: ['chainlink', 'redstone', 'band', 'reflector'],
  },
}

export const Empty: Story = {
  args: {
    sources: [],
  },
}

export const UnknownSource: Story = {
  args: {
    sources: ['unknown-oracle'],
  },
}
