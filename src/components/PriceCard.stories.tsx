import type { Meta, StoryObj } from '@storybook/react'
import { PriceCard } from './PriceCard'

const meta: Meta<typeof PriceCard> = {
  title: 'Components/PriceCard',
  component: PriceCard,
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
type Story = StoryObj<typeof PriceCard>

export const Default: Story = {
  args: {
    price: {
      assetPair: 'BTC/USD',
      price: 50000.1234,
      timestamp: Date.now() - 30000,
      confidence: 0.9876,
      sources: ['chainlink', 'redstone'],
    },
    isLive: false,
    onClick: () => alert('Clicked'),
  },
}

export const Live: Story = {
  args: {
    ...Default.args,
    isLive: true,
  },
}

export const HighPrice: Story = {
  args: {
    price: {
      assetPair: 'ETH/USD',
      price: 123456.78,
      timestamp: Date.now() - 60000,
      confidence: 0.9999,
      sources: ['chainlink', 'band', 'reflector'],
    },
    isLive: true,
  },
}

export const LowPrice: Story = {
  args: {
    price: {
      assetPair: 'SHIB/USD',
      price: 0.00001234,
      timestamp: Date.now() - 120000,
      confidence: 0.75,
      sources: ['redstone'],
    },
    isLive: false,
  },
}

export const SingleSource: Story = {
  args: {
    price: {
      assetPair: 'XRP/USD',
      price: 0.5234,
      timestamp: Date.now() - 5000,
      confidence: 0.92,
      sources: ['chainlink'],
    },
    isLive: true,
  },
}

export const AllSources: Story = {
  args: {
    price: {
      assetPair: 'SOL/USD',
      price: 142.5678,
      timestamp: Date.now() - 10000,
      confidence: 0.99,
      sources: ['chainlink', 'redstone', 'band', 'reflector'],
    },
    isLive: true,
  },
}
