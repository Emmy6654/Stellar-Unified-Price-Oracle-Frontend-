import type { Meta, StoryObj } from '@storybook/react'
import { PriceChart } from './PriceChart'

const mockHistory = Array.from({ length: 50 }, (_, i) => ({
  price: 50000 + Math.sin(i / 5) * 2000 + (Math.random() - 0.5) * 500,
  timestamp: Date.now() - (50 - i) * 60000,
  confidence: 0.95 + Math.random() * 0.04,
  sources: ['chainlink'],
}))

const meta: Meta<typeof PriceChart> = {
  title: 'Components/PriceChart',
  component: PriceChart,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-[700px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PriceChart>

export const WithData: Story = {
  args: {
    data: mockHistory,
    pair: 'BTC/USD',
    loading: false,
  },
}

export const Loading: Story = {
  args: {
    data: [],
    pair: 'ETH/USD',
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    data: [],
    pair: 'XRP/USD',
    loading: false,
  },
}

export const VolatilePair: Story = {
  args: {
    data: Array.from({ length: 100 }, (_, i) => ({
      price: 0.5 + Math.sin(i / 2) * 0.3 + (Math.random() - 0.5) * 0.1,
      timestamp: Date.now() - (100 - i) * 30000,
      confidence: 0.8 + Math.random() * 0.15,
      sources: ['band'],
    })),
    pair: 'SHIB/USD',
    loading: false,
  },
}
