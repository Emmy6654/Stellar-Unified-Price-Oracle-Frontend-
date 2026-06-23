import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { PreferencesProvider } from '../preferences/PreferencesContext'
import { Layout } from './Layout'

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout',
  component: Layout,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <PreferencesProvider>
          <Story />
        </PreferencesProvider>
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Layout>

export const Default: Story = {
  args: {
    children: (
      <div className="text-gray-400 py-12 text-center">
        <p className="text-lg mb-2">Welcome to the Dashboard</p>
        <p className="text-sm">Page content goes here</p>
      </div>
    ),
  },
}

export const WithPriceCards: Story = {
  args: {
    children: (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 animate-pulse"
          >
            <div className="h-5 w-28 bg-gray-800 rounded mb-3" />
            <div className="h-9 w-36 bg-gray-800 rounded mb-3" />
            <div className="h-3 w-20 bg-gray-800 rounded" />
          </div>
        ))}
      </div>
    ),
  },
}
