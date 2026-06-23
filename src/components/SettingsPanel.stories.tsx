import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { PreferencesProvider } from '../preferences/PreferencesContext'
import { SettingsPanel } from './SettingsPanel'

const meta: Meta<typeof SettingsPanel> = {
  title: 'Components/SettingsPanel',
  component: SettingsPanel,
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
type Story = StoryObj<typeof SettingsPanel>

export const Default: Story = {
  args: {
    onClose: () => alert('Close clicked'),
  },
}
