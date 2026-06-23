import type { Meta, StoryObj } from '@storybook/react'
import { NetworkStatusBanner } from './NetworkStatusBanner'

const meta: Meta<typeof NetworkStatusBanner> = {
  title: 'Components/NetworkStatusBanner',
  component: NetworkStatusBanner,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof NetworkStatusBanner>

export const Offline: Story = {
  decorators: [
    (Story) => {
      Object.defineProperty(navigator, 'onLine', {
        configurable: true,
        get: () => false,
      })
      return <Story />
    },
  ],
}
